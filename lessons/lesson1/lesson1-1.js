/**
 * Lesson 1-1: JavaScript 陣列函數練習
 *
 * 本課程涵蓋以下陣列方法：
 * - map: 將陣列中的每個元素轉換為新的元素
 * - filter: 過濾陣列中符合條件的元素
 * - reduce: 將陣列中的元素歸納為單一值
 * - forEach: 對陣列中的每個元素執行指定操作
 * - includes: 檢查陣列是否包含特定元素
 * - some: 檢查陣列中是否至少有一個元素符合條件
 * - every: 檢查陣列中的所有元素是否都符合條件
 */

/**
 * 使用 map 將數字陣列中的每個元素乘以 2
 * @param {number[]} numbers - 輸入的數字陣列
 * @return {number[]} - 轉換後的陣列
 */
function doubleNumbers(numbers) {
  const result = numbers.map((numbers) => numbers * 2);
  return result;
}

/**
 * 使用 filter 過濾出數字陣列中的偶數
 * @param {number[]} numbers - 輸入的數字陣列
 * @return {number[]} - 只包含偶數的陣列
 */
function filterEvenNumbers(numbers) {
  const result = numbers.filter((numbers) => numbers % 2 === 0);
  return result;
}

/**
 * 使用 reduce 計算數字陣列的總和
 * @param {number[]} numbers - 輸入的數字陣列
 * @return {number} - 總和
 */
function sumNumbers(numbers) {
  const result = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return result;
}

/**
 * 使用 forEach 將每個元素轉換為大寫並存入新陣列
 * @param {string[]} textList - 輸入的字串陣列
 * @return {string[]} - 轉換為大寫的陣列
 */
function convertToUpperCase(textList) {
  const result = [];
  textList.forEach((text) => {
    result.push(text.toUpperCase());
  });
  return result;
}

/**
 * 使用 includes 檢查陣列是否包含特定元素
 * @param {Array} array - 要檢查的陣列
 * @param {*} element - 要檢查的元素
 * @return {boolean} - 是否包含該元素
 */
function containsElement(array, element) {
  return array.includes(element);
}

/**
 * 使用 some 檢查陣列中是否至少有一個元素符合條件
 * @param {Array} array - 要檢查的陣列
 * @param {Function} predicate - 條件函數
 * @return {boolean} - 是否至少有一個元素符合條件
 */
function someElement(array, predicate) {
  return array.some(predicate);
}

/**
 * 使用 every 檢查陣列中的所有元素是否都符合條件
 * @param {Array} array - 要檢查的陣列
 * @param {Function} predicate - 條件函數
 * @return {boolean} - 是否所有元素都符合條件
 */
function everyElement(array, predicate) {
  return array.every(predicate);
}

// =============== 進階陣列函數 ===============

/**
 * 使用 map 和其他陣列方法將複雜物件陣列轉換為指定格式
 * @param {Object[]} users - 使用者物件陣列
 * @return {Object[]} - 轉換後的使用者資訊陣列
 */
function transformUserData(users) {
  return users.map((user) => {
    return {
      fullName: `${user.firstName} ${user.lastName}`.trim(),
      age: user.age,
      isAdult: user.age >= 18,
      hobbies: user.hobbies ? user.hobbies.join(", ") : "None",
      contactInfo: {
        email: user.email || "N/A",
        phone: user.phone || "N/A",
      },
    };
  });
}

/**
 * 使用 filter 和複合條件過濾複雜物件陣列
 * @param {Object[]} products - 產品物件陣列
 * @param {Object} criteria - 過濾條件
 * @return {Object[]} - 符合條件的產品陣列
 */
function filterProducts(products, criteria) {
  return products.filter((product) => {
    return Object.entries(criteria).every(([key, value]) => {
      if (key === "price") {
        const { min = -Infinity, max = Infinity } = value;
        return product.price >= min && product.price <= max;
      }
      if (key === "categories") {
        return value.some((category) => product.categories.includes(category));
      }
      return product[key] === value;
    });
  });
}

/**
 * 使用 reduce 計算購物車總價，包含折扣和稅金
 * @param {Object[]} cartItems - 購物車項目陣列
 * @param {number} taxRate - 稅率 (0.1 表示 10%)
 * @return {Object} - 包含小計、稅金、折扣和總計的物件
 */
function calculateCartTotal(cartItems, taxRate = 0.1) {
  if (!cartItems || cartItems.length === 0) {
    return {
      subtotal: 0,
      discount: 0,
      tax: 0,
      total: 0,
    };
  }
  const subtotal = cartItems.reduce((sum, Item) => {
    return sum + Item.price * Item.quantity;
  }, 0);
  const discount = cartItems.reduce((sum, Item) => {
    return sum + Item.price * Item.quantity * Item.discount;
  }, 0);
  const tax = Math.round((subtotal - discount) * taxRate);
  const total = subtotal - discount + tax;

  return {
    subtotal,
    discount,
    tax,
    total,
  };
}

/**
 * 使用 forEach 和其他方法處理巢狀陣列並進行資料統計
 * @param {Array[]} nestedData - 巢狀數字陣列
 * @return {Object} - 包含統計資訊的物件
 */
function analyzeNestedData(nestedData) {
  const result = {
    flatArray: [],
    sum: 0,
    average: 0,
    min: Number.MAX_SAFE_INTEGER,
    max: Number.MIN_SAFE_INTEGER,
    countsByValue: {},
  };
  nestedData.forEach((subArray) => {
    subArray.forEach((num) => {
      result.flatArray.push(num);
      result.sum += num;
      if (num < result.min) {
        result.min = num;
      }
      if (num > result.max) {
        result.max = num;
      }
      const key = String(num);
      result.countsByValue[key] = (result.countsByValue[key] || 0) + 1;
    });
  });
  if (result.flatArray.length > 0) {
    result.average = result.sum / result.flatArray.length;
  }
  return result;
}

/**
 * 使用多個陣列方法組合處理資料，實現分組和彙總
 * @param {Object[]} transactions - 交易記錄陣列
 * @return {Object} - 按類別分組並彙總的結果
 */

function groupAndSummarizeTransactions(transactions) {
  if (!transactions || transactions.length === 0) {
    return {};
  } else {
    const foodData = transactions.filter(
      (transaction) => transaction.category === "food"
    );
    const transportData = transactions.filter(
      (transaction) => transaction.category === "transport"
    );
    const entertainmentData = transactions.filter(
      (transaction) => transaction.category === "entertainment"
    );

    const foodCount = foodData.length;
    const foodTotalAmount = foodData.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    const foodAverageAmount = foodTotalAmount / foodCount;
    const foodAmounts = foodData.map((transaction) => transaction.amount);
    const foodMinAmount = Math.min(...foodAmounts);
    const foodMaxAmount = Math.max(...foodAmounts);
    const foodRecentTransactions = [...foodData].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    const transportCount = transportData.length;
    const transportTotalAmount = transportData.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    const transportAverageAmount = transportTotalAmount / transportCount;
    const transportAmounts = transportData.map(
      (transaction) => transaction.amount
    );
    const transportMinAmount = Math.min(...transportAmounts);
    const transportMaxAmount = Math.max(...transportAmounts);

    const entertainmentCount = entertainmentData.length;
    const entertainmentTotalAmount = entertainmentData.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    const result = {};
    if (foodData.length > 0) {
      result.food = {
        count: foodCount,
        totalAmount: foodTotalAmount,
        averageAmount: foodAverageAmount,
        minAmount: foodMinAmount,
        maxAmount: foodMaxAmount,
        recentTransactions: foodRecentTransactions,
      };
    }
    if (transportData.length > 0) {
      result.transport = {
        count: transportCount,
        totalAmount: transportTotalAmount,
        averageAmount: transportAverageAmount,
        minAmount: transportMinAmount,
        maxAmount: transportMaxAmount,
      };
    }

    if (entertainmentData.length > 0) {
      result.entertainment = {
        count: entertainmentCount,
        totalAmount: entertainmentTotalAmount,
      };
    }
    return result;
  }
}

/**
 * 使用 some 和 every 檢查複雜物件陣列是否符合條件
 * @param {Object[]} items - 物件陣列
 * @param {Object} criteria - 檢查條件
 * @return {Object} - 包含 some 和 every 的結果
 */
function checkItemsWithCriteria(items, criteria) {
  const anyMatch = (items, criteria) =>
    items.some((item) =>
      Object.keys(criteria).every((key) => criteria[key] === item[key])
    );
  const allMatch = (items, criteria) =>
    items.every((item) =>
      Object.keys(criteria).every((key) => criteria[key] === item[key])
    );
  return {
    anyMatch: anyMatch(items, criteria),
    allMatch: allMatch(items, criteria),
  };
}

module.exports = {
  doubleNumbers,
  filterEvenNumbers,
  sumNumbers,
  convertToUpperCase,
  containsElement,
  someElement,
  everyElement,
  // 進階函數
  transformUserData,
  filterProducts,
  calculateCartTotal,
  analyzeNestedData,
  groupAndSummarizeTransactions,
  checkItemsWithCriteria,
};
