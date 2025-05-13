import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import VueDirectivesDemo from './lesson2-2.vue';

describe('Lesson 2-2: Vue 3 指令系統', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(VueDirectivesDemo);
    
    // 模擬 setTimeout
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('v-bind 指令', () => {
    it('應該動態綁定 class 屬性', async () => {
      // 初始狀態，沒有錯誤和提交
      expect(wrapper.find('h2').classes()).not.toContain('title-error');
      expect(wrapper.find('h2').classes()).not.toContain('title-success');
      
      // 觸發錯誤狀態
      await wrapper.find('form').trigger('submit');
      expect(wrapper.find('h2').classes()).toContain('title-error');
      
      // 填寫表單並提交
      Object.assign(wrapper.vm.formData, {
        name: '張三',
        email: 'zhangsan@example.com',
        password: '12345678',
        gender: 'male',
        interests: ['sports'],
        country: 'tw',
        subscribe: false
      });
      await wrapper.vm.$nextTick(); 
      
      await wrapper.find('form').trigger('submit');
      vi.runAllTimers(); // 運行所有定時器
      await wrapper.vm.$nextTick();

      expect(wrapper.find('h2').classes()).toContain('title-success');
    });

    it('應該動態綁定 style 屬性', async () => {
      // 初始狀態，邊框顏色正常
      expect(wrapper.find('#user-name').attributes('style')).toContain('border-color: rgb(221, 221, 221)');
      
      // 提交空表單，觸發錯誤
      await wrapper.find('form').trigger('submit');
      
      // 邊框顏色變紅
      expect(wrapper.find('#user-name').attributes('style')).toContain('border-color: red');
    });
  });

  describe('v-model 指令', () => {
    it('應該實現輸入框的雙向綁定', async () => {
      const nameInput = wrapper.find('#user-name');
      await nameInput.setValue('張三');
      expect(wrapper.vm.formData.name).toBe('張三');
      
      const emailInput = wrapper.find('#user-email');
      await emailInput.setValue('zhangsan@example.com');
      expect(wrapper.vm.formData.email).toBe('zhangsan@example.com');
    });

    it('應該實現密碼輸入框的雙向綁定', async () => {
      const passwordInput = wrapper.find('#user-password');
      await passwordInput.setValue('12345678');
      expect(wrapper.vm.formData.password).toBe('12345678');
    });

    it('應該實現單選框的雙向綁定', async () => {
      const maleRadio = wrapper.find('input[value="male"]');
      await maleRadio.setChecked();
      expect(wrapper.vm.formData.gender).toBe('male');
    });

    it('應該實現複選框的雙向綁定', async () => {
      const sportsCheckbox = wrapper.find('input[value="sports"]');
      await sportsCheckbox.setChecked(true);
      expect(wrapper.vm.formData.interests).toContain('sports');
      
      const musicCheckbox = wrapper.find('input[value="music"]');
      await musicCheckbox.setChecked(true);
      expect(wrapper.vm.formData.interests).toContain('music');
    });

    it('應該實現下拉選單的雙向綁定', async () => {
      const countrySelect = wrapper.find('#user-country');
      await countrySelect.setValue('tw');
      expect(wrapper.vm.formData.country).toBe('tw');
    });
  });

  describe('v-on 指令', () => {
    it('應該處理表單提交事件', async () => {
      // 填寫有效表單
      Object.assign(wrapper.vm.formData, {
        name: '張三',
        email: 'zhangsan@example.com',
        password: '12345678',
        gender: 'male',
        interests: ['sports'],
        country: 'tw',
        subscribe: false
      });
      await wrapper.vm.$nextTick();
      
      // 提交表單
      await wrapper.find('form').trigger('submit');
      expect(wrapper.vm.isSubmitting).toBe(true);
      
      // 等待提交完成
      vi.runAllTimers();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isSubmitting).toBe(false);
      expect(wrapper.vm.isSubmitted).toBe(true);
    });

    it('應該處理重置按鈕點擊事件', async () => {
      // 先填寫一些數據
      await wrapper.find('#user-name').setValue('張三');
      await wrapper.find('#user-email').setValue('zhangsan@example.com');
      
      // 點擊重置按鈕
      await wrapper.find('.reset-button').trigger('click');
      
      // 驗證表單已重置
      expect(wrapper.vm.formData.name).toBe('');
      expect(wrapper.vm.formData.email).toBe('');
    });

    it('應該處理密碼顯示/隱藏切換事件', async () => {
      // 初始狀態，密碼是隱藏的
      expect(wrapper.find('#user-password').attributes('type')).toBe('password');
      
      // 點擊顯示密碼按鈕
      await wrapper.find('.toggle-password').trigger('click');
      expect(wrapper.find('#user-password').attributes('type')).toBe('text');
      
      // 再次點擊隱藏密碼
      await wrapper.find('.toggle-password').trigger('click');
      expect(wrapper.find('#user-password').attributes('type')).toBe('password');
    });

    it('應該處理焦點事件', async () => {
      // 初始狀態，密碼提示不顯示
      expect(wrapper.find('.password-hint').isVisible()).toBe(false);
    
      // 聚焦密碼輸入框
      await wrapper.find('#user-password').trigger('focus');

      expect(wrapper.vm.passwordFocused).toBe(true);
      expect(wrapper.find('.password-hint').attributes('style')).not.toContain('display: none');
      
      // 失去焦點
      await wrapper.find('#user-password').trigger('blur');

      expect(wrapper.vm.passwordFocused).toBe(false);
      expect(wrapper.find('.password-hint').attributes('style')).toContain('display: none');
    });
  });

  describe('v-if/v-else/v-else-if 指令', () => {
    it('應該根據條件渲染錯誤消息', async () => {
      // 初始狀態，沒有錯誤消息
      expect(wrapper.find('.error-message').exists()).toBe(false);
      
      // 提交空表單，觸發錯誤
      await wrapper.find('form').trigger('submit');
      
      // 應該顯示錯誤消息
      expect(wrapper.findAll('.error-message').length).toBeGreaterThan(0);
    });

    it('應該根據提交狀態顯示成功消息', async () => {
      // 初始狀態，沒有成功消息
      expect(wrapper.find('.success-message').exists()).toBe(false);
      
      // 填寫有效表單
      Object.assign(wrapper.vm.formData, {
        name: '張三',
        email: 'zhangsan@example.com',
        password: '12345678',
        gender: 'male',
        interests: ['sports'],
        country: 'tw',
        subscribe: false
      });
      await wrapper.vm.$nextTick();
      
      // 提交表單
      await wrapper.find('form').trigger('submit');
      vi.runAllTimers();
      await wrapper.vm.$nextTick();
      
      // 應該顯示成功消息
      expect(wrapper.find('.success-message').exists()).toBe(true);
      expect(wrapper.find('.success-message').text()).toContain('張三');
    });

    it('應該根據錯誤狀態顯示錯誤摘要', async () => {
      // 初始狀態，沒有錯誤摘要
      expect(wrapper.find('.error-summary').exists()).toBe(false);
      
      // 提交空表單，觸發錯誤
      await wrapper.find('form').trigger('submit');
      
      // 應該顯示錯誤摘要
      expect(wrapper.find('.error-summary').exists()).toBe(true);
    });
  });

  describe('v-show 指令', () => {
    it('應該根據焦點狀態顯示或隱藏密碼提示', async () => {
      // 初始狀態，密碼提示不顯示
      expect(wrapper.vm.passwordFocused).toBe(false);
      expect(wrapper.find('.password-hint').attributes('style')).toContain('display: none');
      
      // 聚焦密碼輸入框
      await wrapper.find('#user-password').trigger('focus');

      expect(wrapper.vm.passwordFocused).toBe(true);
      expect(wrapper.find('.password-hint').attributes('style')).not.toContain('display: none');
      
      // 失去焦點
      await wrapper.find('#user-password').trigger('blur');

      expect(wrapper.vm.passwordFocused).toBe(false);
      expect(wrapper.find('.password-hint').attributes('style')).toContain('display: none');
    });
  });

  describe('v-for 指令', () => {
    it('應該渲染性別選項列表', () => {
      const radioButtons = wrapper.findAll('input[type="radio"]');
      expect(radioButtons.length).toBe(3); // 男、女、其他
    });

    it('應該渲染興趣選項列表', () => {
      const checkboxes = wrapper.findAll('input[type="checkbox"]').filter(input => 
        input.attributes('value') !== undefined && input.attributes('value') !== 'true'
      );
      expect(checkboxes.length).toBe(5); // 運動、音樂、閱讀、旅遊、編程
    });

    it('應該渲染國家選項列表', () => {
      const options = wrapper.findAll('#user-country option');
      expect(options.length).toBe(5); // 請選擇國家 + 4個國家選項
    });
  });

  describe('表單驗證和提交', () => {
    it('應該驗證必填字段', async () => {
      // 提交空表單
      await wrapper.find('form').trigger('submit');
      
      // 檢查錯誤消息
      expect(wrapper.vm.formErrors.name).toBe('姓名不能為空');
      expect(wrapper.vm.formErrors.email).toBe('郵箱不能為空');
      expect(wrapper.vm.formErrors.password).toBe('密碼不能為空');
      expect(wrapper.vm.formErrors.gender).toBe('請選擇性別');
      expect(wrapper.vm.formErrors.interests).toBe('請至少選擇一個興趣');
      expect(wrapper.vm.formErrors.country).toBe('請選擇國家');
    });

    it('應該驗證郵箱格式', async () => {
      // 填寫無效郵箱
      await wrapper.find('#user-email').setValue('invalid-email');
      await wrapper.find('form').trigger('submit');
      
      expect(wrapper.vm.formErrors.email).toBe('郵箱格式不正確');
      
      // 填寫有效郵箱
      await wrapper.find('#user-email').setValue('valid@example.com');
      await wrapper.find('form').trigger('submit');
      
      expect(wrapper.vm.formErrors.email).toBe('');
    });

    it('應該驗證密碼長度', async () => {
      // 填寫短密碼
      await wrapper.find('#user-password').setValue('123');
      await wrapper.find('form').trigger('submit');
      
      expect(wrapper.vm.formErrors.password).toBe('密碼至少需要8個字符');
      
      // 填寫有效密碼
      await wrapper.find('#user-password').setValue('12345678');
      await wrapper.find('form').trigger('submit');
      
      expect(wrapper.vm.formErrors.password).toBe('');
    });

    it('應該成功提交有效表單', async () => {
      // 填寫有效表單
      await wrapper.find('#user-name').setValue('張三');
      await wrapper.find('#user-email').setValue('zhangsan@example.com');
      await wrapper.find('#user-password').setValue('12345678');
      await wrapper.find('input[value="male"]').setChecked();
      await wrapper.find('input[value="sports"]').setChecked(true);
      await wrapper.find('#user-country').setValue('tw');
      
      // 提交表單
      await wrapper.find('form').trigger('submit');
      vi.runAllTimers();
      await wrapper.vm.$nextTick();
      
      // 驗證表單已提交
      expect(wrapper.vm.isSubmitted).toBe(true);
      expect(wrapper.find('.success-message').exists()).toBe(true);
    });
  });
});