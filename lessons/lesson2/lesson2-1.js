/**
 * Lesson 2-1: Vue 3 基礎 - 響應式系統
 *
 * 這個檔案包含了 Vue 3 響應式系統的基礎練習，包括：
 * - ref: 用於基本類型的響應式引用
 * - reactive: 用於物件的響應式代理
 * - computed: 用於建立依賴於其他響應式資料的計算屬性
 * - watch/watchEffect: 用於監聽響應式資料變化並執行副作用
 */

/**
 * 創建一個簡單的計數器，使用 ref 管理狀態
 * @return {Object} - 包含計數器狀態和方法的對象
 */
import { ref, reactive, computed } from "vue";
function createCounter() {
  const count = ref(0);
  function increment() {
    count.value++;
  }
  function decrement() {
    count.value--;
  }
  function reset() {
    count.value = 0;
  }
  return {
    count,
    increment,
    decrement,
    reset,
  };
}

/**
 * 使用 reactive 創建一個用戶資料對象
 * @param {Object} initialData - 初始用戶資料
 * @return {Object} - 用戶資料的響應式對象
 */
function createUserData(initialData = {}) {
  const defaultDate = {
    name: "",
    email: "",
    age: 0,
    preferences: {},
  };
  const mergedData = {
    ...defaultDate,
    ...initialData,
  };
  return reactive(mergedData);
}

/**
 * 使用 computed 創建一個購物車，計算總價
 * @return {Object} - 包含購物車狀態和計算屬性的對象
 */
function createShoppingCart() {
}

/**
 * 使用 watch 監聽數據變化，實現表單驗證
 * @return {Object} - 包含表單狀態和驗證結果的對象
 */
function createFormValidator() {
  // 請在此實現函數
}

/**
 * 使用 watchEffect 自動追蹤依賴並執行副作用
 * @return {Object} - 包含狀態和方法的對象
 */
function createAutoSaver() {
  // 請在此實現函數
}

// =============== 進階 Vue 3 ref/reactive/computed/watch/watchEffect ===============

/**
 * 進階：組合多個響應式功能，創建一個待辦事項應用
 * @return {Object} - 包含待辦事項應用狀態和方法的對象
 */
function createTodoApp() {
  // 請在此實現函數
}

/**
 * 進階：使用 Vue 3 的 composition API 模擬一個簡單的狀態管理
 * @return {Object} - 包含狀態和方法的對象
 */
function createSimpleStore() {
  // 請在此實現函數
}

export {
  createCounter,
  createUserData,
  createShoppingCart,
  createFormValidator,
  createAutoSaver,
  // 進階 Vue 實例
  createTodoApp,
  createSimpleStore,
};
