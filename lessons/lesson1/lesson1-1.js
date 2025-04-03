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
  // 請在此實現函數
}

/**
 * 使用 filter 過濾出數字陣列中的偶數
 * @param {number[]} numbers - 輸入的數字陣列
 * @return {number[]} - 只包含偶數的陣列
 */
function filterEvenNumbers(numbers) {
  // 請在此實現函數
}

/**
 * 使用 reduce 計算數字陣列的總和
 * @param {number[]} numbers - 輸入的數字陣列
 * @return {number} - 總和
 */
function sumNumbers(numbers) {
  // 請在此實現函數
}

/**
 * 使用 forEach 將每個元素轉換為大寫並存入新陣列
 * @param {string[]} strings - 輸入的字串陣列
 * @return {string[]} - 轉換為大寫的陣列
 */
function convertToUpperCase(strings) {
  // 請在此實現函數
}

/**
 * 使用 includes 檢查陣列是否包含特定元素
 * @param {Array} array - 要檢查的陣列
 * @param {*} element - 要檢查的元素
 * @return {boolean} - 是否包含該元素
 */
function containsElement(array, element) {
  // 請在此實現函數
}

/**
 * 使用 some 檢查陣列中是否至少有一個元素符合條件
 * @param {Array} array - 要檢查的陣列
 * @param {Function} predicate - 條件函數
 * @return {boolean} - 是否至少有一個元素符合條件
 */
function someElement(array, predicate) {
  // 請在此實現函數
}

/**
 * 使用 every 檢查陣列中的所有元素是否都符合條件
 * @param {Array} array - 要檢查的陣列
 * @param {Function} predicate - 條件函數
 * @return {boolean} - 是否所有元素都符合條件
 */
function everyElement(array, predicate) {
  // 請在此實現函數
}

// =============== 進階陣列函數 ===============

/**
 * 使用 map 和其他陣列方法將複雜物件陣列轉換為指定格式
 * @param {Object[]} users - 使用者物件陣列
 * @return {Object[]} - 轉換後的使用者資訊陣列
 */
function transformUserData(users) {
  // 請在此實現函數
}

/**
 * 使用 filter 和複合條件過濾複雜物件陣列
 * @param {Object[]} products - 產品物件陣列
 * @param {Object} criteria - 過濾條件
 * @return {Object[]} - 符合條件的產品陣列
 */
function filterProducts(products, criteria) {
  // 請在此實現函數
}

/**
 * 使用 reduce 計算購物車總價，包含折扣和稅金
 * @param {Object[]} cartItems - 購物車項目陣列
 * @param {number} taxRate - 稅率 (0.1 表示 10%)
 * @return {Object} - 包含小計、稅金、折扣和總計的物件
 */
function calculateCartTotal(cartItems, taxRate = 0.1) {
  // 請在此實現函數
}

/**
 * 使用 forEach 和其他方法處理巢狀陣列並進行資料統計
 * @param {Array[]} nestedData - 巢狀數字陣列
 * @return {Object} - 包含統計資訊的物件
 */
function analyzeNestedData(nestedData) {
  // 請在此實現函數
}

/**
 * 使用多個陣列方法組合處理資料，實現分組和彙總
 * @param {Object[]} transactions - 交易記錄陣列
 * @return {Object} - 按類別分組並彙總的結果
 */
function groupAndSummarizeTransactions(transactions) {
  // 請在此實現函數
}

/**
 * 使用 some 和 every 檢查複雜物件陣列是否符合條件
 * @param {Object[]} items - 物件陣列
 * @param {Object} criteria - 檢查條件
 * @return {Object} - 包含 some 和 every 的結果
 */
function checkItemsWithCriteria(items, criteria) {
  // 請在此實現函數
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
  checkItemsWithCriteria
};
