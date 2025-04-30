import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  createCounter,
  createUserData,
  createShoppingCart,
  createFormValidator,
  createAutoSaver,
  createTodoApp,
  createSimpleStore
} from './lesson2-1';
import { nextTick } from 'vue';

// 模擬 localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    clear: () => { store = {}; }
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('Lesson 2-1: Vue 3 基礎', () => {

  describe('createCounter - ref 基本使用', () => {

    it('應該創建一個初始值為 0 的計數器', () => {
      const counter = createCounter();
      expect(counter.count.value).toBe(0);
    });

    it('應該能夠增加計數器的值', () => {
      const counter = createCounter();
      counter.increment();
      expect(counter.count.value).toBe(1);
      counter.increment();
      expect(counter.count.value).toBe(2);
    });

    it('應該能夠減少計數器的值', () => {
      const counter = createCounter();
      counter.increment();
      counter.increment();
      counter.decrement();
      expect(counter.count.value).toBe(1);
    });

    it('應該能夠重置計數器的值', () => {
      const counter = createCounter();
      counter.increment();
      counter.increment();
      counter.reset();
      expect(counter.count.value).toBe(0);
    });
  });

  describe('createUserData - reactive 基本使用', () => {

    it('應該創建一個空的用戶數據對象', () => {
      const userData = createUserData();
      expect(userData.name).toBe('');
      expect(userData.email).toBe('');
      expect(userData.age).toBe(0);
      expect(userData.preferences).toEqual({});
    });

    it('應該使用提供的初始數據', () => {
      const initialData = {
        name: '張三',
        email: 'zhangsan@example.com',
        age: 30,
        preferences: { theme: 'dark' }
      };
      const userData = createUserData(initialData);
      expect(userData.name).toBe('張三');
      expect(userData.email).toBe('zhangsan@example.com');
      expect(userData.age).toBe(30);
      expect(userData.preferences.theme).toBe('dark');
    });

    it('應該能夠修改用戶數據', () => {
      const userData = createUserData();
      userData.name = '李四';
      userData.email = 'lisi@example.com';
      userData.age = 25;
      userData.preferences = { language: 'zh-TW' };

      expect(userData.name).toBe('李四');
      expect(userData.email).toBe('lisi@example.com');
      expect(userData.age).toBe(25);
      expect(userData.preferences.language).toBe('zh-TW');
    });
  });

  describe('createShoppingCart - computed 基本使用', () => {
    let cart;

    beforeEach(() => {
      cart = createShoppingCart();
    });

    it('應該創建一個空購物車', () => {
      expect(cart.items.value).toEqual([]);
      expect(cart.total.value).toBe(0);
      expect(cart.itemCount.value).toBe(0);
    });

    it('應該能夠添加商品到購物車', () => {
      cart.addItem({ id: 1, name: '商品 1', price: 100 });
      expect(cart.items.value.length).toBe(1);
      expect(cart.items.value[0].name).toBe('商品 1');
      expect(cart.items.value[0].price).toBe(100);
      expect(cart.items.value[0].quantity).toBe(1);
    });

    it('應該能夠添加多個商品到購物車', () => {
      cart.addItem({ id: 1, name: '商品 1', price: 100 });
      cart.addItem({ id: 2, name: '商品 2', price: 200, quantity: 2 });
      expect(cart.items.value.length).toBe(2);
      expect(cart.items.value[1].quantity).toBe(2);
    });

    it('應該能夠更新已有商品的數量', () => {
      cart.addItem({ id: 1, name: '商品 1', price: 100 });
      cart.addItem({ id: 1, name: '商品 1', price: 100 });
      expect(cart.items.value.length).toBe(1);
      expect(cart.items.value[0].quantity).toBe(2);
    });

    it('應該能夠移除商品', () => {
      cart.addItem({ id: 1, name: '商品 1', price: 100 });
      cart.addItem({ id: 2, name: '商品 2', price: 200 });
      cart.removeItem(1);
      expect(cart.items.value.length).toBe(1);
      expect(cart.items.value[0].id).toBe(2);
    });

    it('應該能夠更新商品數量', () => {
      cart.addItem({ id: 1, name: '商品 1', price: 100 });
      cart.updateQuantity(1, 5);
      expect(cart.items.value[0].quantity).toBe(5);
    });

    it('應該能夠清空購物車', () => {
      cart.addItem({ id: 1, name: '商品 1', price: 100 });
      cart.addItem({ id: 2, name: '商品 2', price: 200 });
      cart.clearCart();
      expect(cart.items.value.length).toBe(0);
    });

    it('應該正確計算總價', () => {
      cart.addItem({ id: 1, name: '商品 1', price: 100 });
      cart.addItem({ id: 2, name: '商品 2', price: 200, quantity: 2 });
      expect(cart.total.value).toBe(100 + 200 * 2);
    });

    it('應該正確計算商品總數', () => {
      cart.addItem({ id: 1, name: '商品 1', price: 100 });
      cart.addItem({ id: 2, name: '商品 2', price: 200, quantity: 2 });
      expect(cart.itemCount.value).toBe(3);
    });
  });

  describe('createFormValidator - watch 基本使用', () => {
    let validator;

    beforeEach(() => {
      validator = createFormValidator();
    });

    it('應該創建一個初始表單驗證器', () => {
      expect(validator.form.username).toBe('');
      expect(validator.form.email).toBe('');
      expect(validator.form.password).toBe('');
      expect(validator.isValid.value).toBe(false);
    });

    it('應該驗證用戶名不能為空', async () => {
      validator.form.username = 'mark';
      await nextTick();
      validator.form.username = '';
      await nextTick();
      expect(validator.errors.username).toBe('用戶名不能為空');
    });

    it('應該驗證用戶名長度至少為3', async () => {
      validator.form.username = 'ab';
      await nextTick();
      expect(validator.errors.username).toBe('用戶名至少需要3個字符');
    });

    it('應該驗證有效的用戶名', async () => {
      validator.form.username = 'admin';
      await nextTick();
      expect(validator.errors.username).toBe('');
    });

    it('應該驗證郵箱格式', async () => {
      validator.form.email = 'invalid-email';
      await nextTick();
      expect(validator.errors.email).toBe('請輸入有效的郵箱地址');

      validator.form.email = 'valid@example.com';
      await nextTick();
      expect(validator.errors.email).toBe('');
    });

    it('應該驗證密碼長度', async () => {
      validator.form.password = '12345';
      await nextTick();
      expect(validator.errors.password).toBe('密碼至少需要6個字符');

      validator.form.password = '123456';
      await nextTick();
      expect(validator.errors.password).toBe('');
    });

    it('應該只在所有字段有效時將表單標記為有效', async () => {
      validator.form.username = 'admin';
      validator.form.email = 'admin@example.com';
      validator.form.password = '123456';

      await nextTick();
      expect(validator.isValid.value).toBe(true);
    });
  });

  describe('createAutoSaver - watchEffect 基本使用', () => {
    let autoSaver;

    beforeEach(() => {
      vi.useFakeTimers();
      autoSaver = createAutoSaver();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('應該創建一個自動保存器', () => {
      expect(autoSaver.data.content).toBe('');
      expect(autoSaver.data.lastSaved).toBeNull();
      expect(autoSaver.data.saveCount).toBe(0);
    });

    it('應該在內容變化時自動保存', async () => {
      autoSaver.updateContent('新內容');
      await nextTick();
      expect(autoSaver.data.isSaving).toBe(true);

      vi.advanceTimersByTime(300);

      expect(autoSaver.data.saveCount).toBe(1);
      expect(autoSaver.data.lastSaved).not.toBeNull();
      expect(autoSaver.data.isSaving).toBe(false);
    });

    it('應該能夠停止自動保存', () => {
      autoSaver.stopWatching();
      autoSaver.updateContent('新內容');

      vi.advanceTimersByTime(300);

      expect(autoSaver.data.saveCount).toBe(0);
      expect(autoSaver.data.lastSaved).toBeNull();
    });
  });
});

describe('Lesson 2-1: Vue 3 基礎：進階', () => {

  describe('createTodoApp - 綜合練習', () => {
    let todoApp;

    beforeEach(() => {
      localStorage.clear();
      todoApp = createTodoApp();
    });

    it('應該創建一個空的待辦事項應用', () => {
      expect(todoApp.todos.value).toEqual([]);
      expect(todoApp.newTodo.value).toBe('');
      expect(todoApp.filter.value).toBe('all');
    });

    it('應該能夠添加待辦事項', () => {
      todoApp.newTodo.value = '買牛奶';
      todoApp.addTodo();

      expect(todoApp.todos.value.length).toBe(1);
      expect(todoApp.todos.value[0].text).toBe('買牛奶');
      expect(todoApp.todos.value[0].completed).toBe(false);
      expect(todoApp.newTodo.value).toBe('');
    });

    it('不應該添加空的待辦事項', () => {
      todoApp.newTodo.value = '   ';
      todoApp.addTodo();

      expect(todoApp.todos.value.length).toBe(0);
    });

    it('應該能夠切換待辦事項的完成狀態', () => {
      todoApp.newTodo.value = '買牛奶';
      todoApp.addTodo();

      const id = todoApp.todos.value[0].id;
      todoApp.toggleTodo(id);

      expect(todoApp.todos.value[0].completed).toBe(true);

      todoApp.toggleTodo(id);
      expect(todoApp.todos.value[0].completed).toBe(false);
    });

    it('應該能夠刪除待辦事項', () => {
      todoApp.newTodo.value = '買牛奶';
      todoApp.addTodo();

      const id = todoApp.todos.value[0].id;
      todoApp.removeTodo(id);

      expect(todoApp.todos.value.length).toBe(0);
    });

    it('應該能夠過濾待辦事項', () => {
      todoApp.newTodo.value = '買牛奶';
      todoApp.addTodo();

      todoApp.newTodo.value = '寫代碼';
      todoApp.addTodo();

      const id = todoApp.todos.value[0].id;
      todoApp.toggleTodo(id);

      todoApp.setFilter('active');
      expect(todoApp.filteredTodos.value.length).toBe(1);
      expect(todoApp.filteredTodos.value[0].text).toBe('寫代碼');

      todoApp.setFilter('completed');
      expect(todoApp.filteredTodos.value.length).toBe(1);
      expect(todoApp.filteredTodos.value[0].text).toBe('買牛奶');

      todoApp.setFilter('all');
      expect(todoApp.filteredTodos.value.length).toBe(2);
    });

    it('應該能夠清除已完成的待辦事項', () => {
      todoApp.newTodo.value = '買牛奶';
      todoApp.addTodo();

      todoApp.newTodo.value = '寫代碼';
      todoApp.addTodo();

      const id = todoApp.todos.value[0].id;
      todoApp.toggleTodo(id);

      todoApp.clearCompleted();
      expect(todoApp.todos.value.length).toBe(1);
      expect(todoApp.todos.value[0].text).toBe('寫代碼');
    });

    it('應該正確計算剩餘和已完成的待辦事項數量', () => {
      todoApp.newTodo.value = '買牛奶';
      todoApp.addTodo();

      todoApp.newTodo.value = '寫代碼';
      todoApp.addTodo();

      expect(todoApp.remainingCount.value).toBe(2);
      expect(todoApp.completedCount.value).toBe(0);

      const id = todoApp.todos.value[0].id;
      todoApp.toggleTodo(id);

      expect(todoApp.remainingCount.value).toBe(1);
      expect(todoApp.completedCount.value).toBe(1);
    });

    it('應該能夠將待辦事項保存到本地存儲', async () => {
      todoApp.newTodo.value = '買牛奶';
      todoApp.addTodo();

      await nextTick();

      // 模擬 watch 觸發
      const savedData = localStorage.getItem('todos');
      const parsedData = JSON.parse(savedData);

      expect(parsedData?.length).toBe(1);
      expect(parsedData[0].text).toBe('買牛奶');
    });

    it('應該能夠從本地存儲加載待辦事項', () => {
      // 模擬已保存的數據
      localStorage.setItem('todos', JSON.stringify([
        { id: 1, text: '買牛奶', completed: false, createdAt: new Date().toISOString() }
      ]));

      todoApp.loadFromStorage();

      expect(todoApp.todos.value.length).toBe(1);
      expect(todoApp.todos.value[0].text).toBe('買牛奶');
    });
  });

  describe('createSimpleStore - 進階狀態管理', () => {
    let store;

    beforeEach(() => {
      vi.useFakeTimers();
      store = createSimpleStore();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('應該創建一個初始狀態的存儲', () => {
      expect(store.state.user.isLoggedIn).toBe(false);
      expect(store.state.products).toEqual([]);
      expect(store.state.cart).toEqual([]);
      expect(store.state.loading).toBe(false);
      expect(store.state.error).toBeNull();
    });

    it('應該能夠登錄用戶', () => {
      store.login('admin', 'password');
      expect(store.state.loading).toBe(true);

      vi.advanceTimersByTime(500);

      expect(store.state.loading).toBe(false);
      expect(store.state.user.isLoggedIn).toBe(true);
      expect(store.state.user.name).toBe('admin');
    });

    it('應該處理登錄失敗', () => {
      store.login('admin', 'wrong-password');

      vi.advanceTimersByTime(500);

      expect(store.state.loading).toBe(false);
      expect(store.state.user.isLoggedIn).toBe(false);
      expect(store.state.error).toBe('用戶名或密碼錯誤');
    });

    it('應該能夠登出用戶', () => {
      store.login('admin', 'password');
      vi.advanceTimersByTime(500);

      store.logout();

      expect(store.state.user.isLoggedIn).toBe(false);
      expect(store.state.cart).toEqual([]);
    });

    it('應該能夠獲取產品列表', () => {
      store.fetchProducts();
      expect(store.state.loading).toBe(true);

      vi.advanceTimersByTime(500);

      expect(store.state.loading).toBe(false);
      expect(store.state.products.length).toBe(3);
    });

    it('應該能夠將產品添加到購物車', () => {
      store.fetchProducts();
      vi.advanceTimersByTime(500);

      store.addToCart(1);
      expect(store.state.cart.length).toBe(1);
      expect(store.state.cart[0].productId).toBe(1);
      expect(store.state.cart[0].quantity).toBe(1);

      store.addToCart(1, 2);
      expect(store.state.cart.length).toBe(1);
      expect(store.state.cart[0].quantity).toBe(3);
    });

    it('應該能夠從購物車中移除產品', () => {
      store.fetchProducts();
      vi.advanceTimersByTime(500);

      store.addToCart(1);
      store.addToCart(2);

      store.removeFromCart(1);
      expect(store.state.cart.length).toBe(1);
      expect(store.state.cart[0].productId).toBe(2);
    });

    it('應該能夠清空購物車', () => {
      store.fetchProducts();
      vi.advanceTimersByTime(500);

      store.addToCart(1);
      store.addToCart(2);

      store.clearCart();
      expect(store.state.cart.length).toBe(0);
    });

    it('應該正確計算購物車總價', () => {
      store.fetchProducts();
      vi.advanceTimersByTime(500);

      store.addToCart(1); // 產品 1, 價格 100
      store.addToCart(2, 2); // 產品 2, 價格 200, 數量 2

      expect(store.cartTotal.value).toBe(100 + 200 * 2);
    });

    it('應該正確計算購物車商品數量', () => {
      store.fetchProducts();
      vi.advanceTimersByTime(500);

      store.addToCart(1);
      store.addToCart(2, 2);

      expect(store.cartItemCount.value).toBe(3);
    });
  });
})