/**
 * Lesson 2-2: Vue 3 指令系統
 * 
 * 這個檔案包含了 Vue 3 指令系統的基礎練習，包括：
 * - v-bind: 用於動態綁定屬性
 * - v-model: 用於雙向綁定
 * - v-on: 用於事件處理
 * - v-if/v-else/v-else-if: 用於條件渲染
 * - v-show: 用於條件顯示
 * - v-for: 用於列表渲染
 */
<template>
  <div class="vue-directives-demo">
    <h1>Vue 3 指令系統練習</h1>
    
    <form class="demo-form">
      <!-- v-bind 示例：動態綁定 class、style、屬性 -->
      <h2>
        用戶註冊表單
      </h2>
      
      <div class="form-group">
        <label>姓名:</label>
        <!-- v-model 示例：雙向綁定 -->
        <input 
          type="text"
        />
        <!-- v-if 示例：條件渲染 -->
        <div class="error-message">{{ formErrors.name }}</div>
      </div>
      
      <div class="form-group">
        <label>郵箱:</label>
        <input 
          type="email"
        />
        <div class="error-message">{{ formErrors.email }}</div>
      </div>
      
      <div class="form-group">
        <label>密碼:</label>
        <div class="password-field">
          <!-- v-on 示例：事件處理 -->
          <input type="text" />
          <button 
            type="button" 
            class="toggle-password"
          >
            隱藏
          </button>
        </div>
        <div class="error-message">{{ formErrors.password }}</div>
        <!-- v-show 示例：條件顯示 -->
        <div class="password-hint">
          密碼必須至少包含 8 個字符
        </div>
      </div>
      
      <div class="form-group">
        <label>性別:</label>
        <div class="radio-group">
          <!-- v-for 示例：列表渲染 -->
          <label>
            <input 
              type="radio"
            />
            其他
          </label>
        </div>
        <div class="error-message">{{ formErrors.gender }}</div>
      </div>
      
      <div class="form-group">
        <label>興趣:</label>
        <div class="checkbox-group">
          <label >
            <input 
              type="checkbox"
            />
            運動
          </label>
        </div>
        <div class="error-message">{{ formErrors.interests }}</div>
      </div>
      
      <div class="form-group">
        <label>國家:</label>
        <select 
        >
          <option value="">請選擇國家</option>
          <option >
            台灣
          </option>
        </select>
        <div class="error-message">{{ formErrors.country }}</div>
      </div>
      
      <div class="form-group">
        <label>
          <input type="checkbox" />
          訂閱最新消息
        </label>
      </div>
      
      <div class="form-actions">
        <button type="submit">
          提交
        </button>
        <button type="button" 
            class="reset-button" >重置</button>
      </div>
      
      <!-- v-if/v-else 示例：條件渲染 -->
      <div class="success-message">
        註冊成功！歡迎您，{{ formData.name }}！
      </div>
      <div class="error-summary">
        表單包含錯誤，請修正後重新提交。
      </div>
    </form>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';

export default {
  name: 'VueDirectivesDemo',
  setup() {
    // 表單字段定義
    const formFields = {
      name: {
        id: 'user-name',
        placeholder: '請輸入姓名'
      },
      email: {
        id: 'user-email',
        placeholder: '請輸入郵箱'
      },
      password: {
        id: 'user-password',
        placeholder: '請輸入密碼'
      },
      country: {
        id: 'user-country'
      }
    };

    // 表單數據
    const formData = reactive({
      name: '',
      email: '',
      password: '',
      gender: '',
      interests: [],
      country: '',
      subscribe: false
    });

    // 表單錯誤
    const formErrors = reactive({
      name: '',
      email: '',
      password: '',
      gender: '',
      interests: '',
      country: ''
    });

    // 表單狀態
    const isSubmitting = ref(false);
    const isSubmitted = ref(false);
    const showPassword = ref(false);

    // 選項數據
    const genderOptions = [
      { value: 'male', text: '男' },
      { value: 'female', text: '女' },
      { value: 'other', text: '其他' }
    ];

    const interestOptions = [
      { value: 'sports', text: '運動' },
      { value: 'music', text: '音樂' },
      { value: 'travel', text: '旅遊' },
      { value: 'coding', text: '編程' }
    ];

    const countryOptions = [
      { value: 'tw', text: '台灣' },
      { value: 'cn', text: '中國' },
      { value: 'jp', text: '日本' },
      { value: 'us', text: '美國' }
    ];

    // 計算屬性
    const hasErrors = computed(() => {
      return Object.values(formErrors).some(error => error !== '');
    });

    // 方法
    function validateForm() {
      let isValid = true;
      
      // 驗證姓名
      if (!formData.name) {
        formErrors.name = '姓名不能為空';
        isValid = false;
      } else if (formData.name.length < 2) {
        formErrors.name = '姓名至少需要2個字符';
        isValid = false;
      } else {
        formErrors.name = '';
      }
      
      // 驗證郵箱
      if (!formData.email) {
        formErrors.email = '郵箱不能為空';
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        formErrors.email = '郵箱格式不正確';
        isValid = false;
      } else {
        formErrors.email = '';
      }
      
      // 驗證密碼
      if (!formData.password) {
        formErrors.password = '密碼不能為空';
        isValid = false;
      } else if (formData.password.length < 8) {
        formErrors.password = '密碼至少需要8個字符';
        isValid = false;
      } else {
        formErrors.password = '';
      }
      
      // 驗證興趣
      if (formData.interests.length === 0) {
        formErrors.interests = '請至少選擇一個興趣';
      } else {
        formErrors.interests = '';
      }
      
      // 驗證國家
      if (!formData.country) {
        formErrors.country = '請選擇國家';
        isValid = false;
      } else {
        formErrors.country = '';
      }
      
      return isValid;
    }

    function submitForm() {
      if (validateForm()) {
        isSubmitting.value = true;
        
        // 模擬提交過程
        setTimeout(() => {
          isSubmitting.value = false;
          isSubmitted.value = true;
        }, 1000);
      }
    }

    function resetForm() {
      // 重置表單數據
      Object.keys(formData).forEach(key => {
        if (key === 'interests') {
          formData[key] = [];
        } else if (key === 'subscribe') {
          formData[key] = false;
        } else {
          formData[key] = '';
        }
      });
      
      // 重置錯誤信息
      Object.keys(formErrors).forEach(key => {
        formErrors[key] = '';
      });
      
      // 重置表單狀態
      isSubmitted.value = false;
    }

    function togglePassword() {
      showPassword.value = !showPassword.value;
    }

    return {
      formFields,
      formData,
      formErrors,
      isSubmitting,
      isSubmitted,
      showPassword,
      genderOptions,
      interestOptions,
      countryOptions,
      hasErrors,
      validateForm,
      submitForm,
      resetForm,
      togglePassword
    };
  }
};
</script>

<style>
.vue-directives-demo {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.demo-form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: #333;
}

h2 {
  margin-top: 0;
  color: #333;
}

.title-error {
  color: #d9534f;
}

.title-success {
  color: #5cb85c;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="email"],
input[type="password"],
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.password-field {
  display: flex;
}

.password-field input {
  flex: 1;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.toggle-password {
  padding: 8px 12px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-left: none;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
}

.radio-group,
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.radio-group label,
.checkbox-group label {
  display: flex;
  align-items: center;
  font-weight: normal;
}

.radio-group input,
.checkbox-group input {
  margin-right: 5px;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
}

button[type="submit"]:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button[type="button"] {
  background-color: #f0f0f0;
  color: #333;
}

.error-message {
  color: #d9534f;
  font-size: 0.85em;
  margin-top: 5px;
}

.password-hint {
  color: #666;
  font-size: 0.85em;
  margin-top: 5px;
}

.success-message {
  margin-top: 20px;
  padding: 10px;
  background-color: #dff0d8;
  border: 1px solid #d6e9c6;
  color: #3c763d;
  border-radius: 4px;
}

.error-summary {
  margin-top: 20px;
  padding: 10px;
  background-color: #f2dede;
  border: 1px solid #ebccd1;
  color: #a94442;
  border-radius: 4px;
}
</style>