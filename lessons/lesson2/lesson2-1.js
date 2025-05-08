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
import { ref, reactive, computed, watch, watchEffect } from "vue";
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
  const items = ref([]);

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const itemCount = computed(() =>
    items.value.reduce((count, item) => count + item.quantity, 0)
  );

  const addItem = (newItem) => {
    const existingItem = items.value.find((item) => item.id === newItem.id);

    if (existingItem) {
      existingItem.quantity += newItem.quantity || 1;
    } else {
      items.value.push({
        ...newItem,
        quantity: newItem.quantity || 1,
      });
    }
  };

  const removeItem = (id) => {
    items.value = items.value.filter((item) => item.id !== id);
  };

  const updateQuantity = (id, quantity) => {
    const item = items.value.find((item) => item.id === id);
    if (item) item.quantity = quantity;
  };

  const clearCart = () => {
    items.value = [];
  };

  return {
    items,
    total,
    itemCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}

/**
 * 使用 watch 監聽數據變化，實現表單驗證
 * @return {Object} - 包含表單狀態和驗證結果的對象
 */
function createFormValidator() {
  const form = reactive({
    username: "",
    email: "",
    password: "",
  });
  const errors = reactive({
    username: "",
    email: "",
    password: "",
  });
  const isValid = ref(false);
  watch(
    () => form.username,
    (newValue) => {
      if (!newValue) {
        errors.username = "用戶名不能為空";
      } else if (newValue.length < 3) {
        errors.username = "用戶名至少需要3個字符";
      } else {
        errors.username = "";
      }
      validateForm();
    },
    { immediate: true }
  );
  watch(
    () => form.email,
    (newValue) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (newValue && !emailRegex.test(newValue)) {
        errors.email = "請輸入有效的郵箱地址";
      } else {
        errors.email = "";
      }
      validateForm();
    }
  );
  watch(
    () => form.password,
    (newValue) => {
      if (newValue && newValue.length < 6) {
        errors.password = "密碼至少需要6個字符";
      } else {
        errors.password = "";
      }
      validateForm();
    }
  );
  function validateForm() {
    isValid.value =
      form.username !== "" &&
      form.email !== "" &&
      form.password !== "" &&
      errors.username === "" &&
      errors.email === "" &&
      errors.password === "";
  }
  return {
    form,
    errors,
    isValid,
  };
}

/**
 * 使用 watchEffect 自動追蹤依賴並執行副作用
 * @return {Object} - 包含狀態和方法的對象
 */
function createAutoSaver() {
  const content = ref("");
  const isSaving = ref(false);
  const lastSaved = ref(null);
  const saveCount = ref(0);
  function saveContent() {
    isSaving.value = true;
    setTimeout(() => {
      saveCount.value++;
      lastSaved.value = new Date();
      isSaving.value = false;
      console.log("已保存:", content.value);
    }, 300);
  }
  function updateContent(newContent) {
    content.value = newContent;
  }
  const stop = watchEffect(() => {
    if (content.value) {
      saveContent();
    }
  });
  function stopWatching() {
    stop();
  }
  return {
    data: {
      get content() {
        return content.value;
      },
      get isSaving() {
        return isSaving.value;
      },
      get lastSaved() {
        return lastSaved.value;
      },
      get saveCount() {
        return saveCount.value;
      },
    },
    updateContent,
    stopWatching,
  };
}
// =============== 進階 Vue 3 ref/reactive/computed/watch/watchEffect ===============

/**
 * 進階：組合多個響應式功能，創建一個待辦事項應用
 * @return {Object} - 包含待辦事項應用狀態和方法的對象
 */

function createTodoApp() {
  const todos = ref([]);
  const newTodo = ref("");
  const filter = ref("all");
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case "active":
        return todos.value.filter((todo) => !todo.completed);
      case "completed":
        return todos.value.filter((todo) => todo.completed);
      default:
        return todos.value;
    }
  });
  const remainingCount = computed(() => {
    return todos.value.filter((todo) => !todo.completed).length;
  });
  const completedCount = computed(() => {
    return todos.value.filter((todo) => todo.completed).length;
  });
  function addTodo() {
    const text = newTodo.value.trim();
    if (text) {
      todos.value.push({
        id: Date.now(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
      });
      newTodo.value = "";
      saveToStorage();
    }
  }
  function toggleTodo(id) {
    const todo = todos.value.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      saveToStorage();
    }
  }
  function removeTodo(id) {
    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.value.splice(index, 1);
      saveToStorage();
    }
  }
  function setFilter(newFilter) {
    filter.value = newFilter;
  }
  function clearCompleted() {
    todos.value = todos.value.filter((todo) => !todo.completed);
    saveToStorage();
  }
  function saveToStorage() {
    localStorage.setItem("todos", JSON.stringify(todos.value));
  }
  function loadFromStorage() {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos);
    }
  }
  watch(
    todos,
    () => {
      saveToStorage();
    },
    { deep: true }
  );
  loadFromStorage();
  return {
    todos,
    newTodo,
    filter,
    filteredTodos,
    remainingCount,
    completedCount,
    addTodo,
    toggleTodo,
    removeTodo,
    setFilter,
    clearCompleted,
    saveToStorage,
    loadFromStorage,
  };
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
