import { describe, expect, it } from 'vitest';
import {
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
} from './lesson1-1';

describe('Lesson 1-1: JavaScript 陣列函數', () => {

  describe('map 函數測試', () => {
    it('應該將每個數字乘以 2', () => {
      expect(doubleNumbers([1, 2, 3, 4])).toEqual([2, 4, 6, 8]);
      expect(doubleNumbers([0, -1, 5])).toEqual([0, -2, 10]);
      expect(doubleNumbers([])).toEqual([]);
    });
  });

  describe('filter 函數測試', () => {
    it('應該只返回偶數', () => {
      expect(filterEvenNumbers([1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
      expect(filterEvenNumbers([1, 3, 5])).toEqual([]);
      expect(filterEvenNumbers([2, 4, 6])).toEqual([2, 4, 6]);
      expect(filterEvenNumbers([])).toEqual([]);
    });
  });

  describe('reduce 函數測試', () => {
    it('應該計算數字總和', () => {
      expect(sumNumbers([1, 2, 3, 4])).toBe(10);
      expect(sumNumbers([5, 10, 15])).toBe(30);
      expect(sumNumbers([-1, 1])).toBe(0);
      expect(sumNumbers([])).toBe(0);
    });
  });

  describe('forEach 函數測試', () => {
    it('應該將字串轉換為大寫', () => {
      expect(convertToUpperCase(['hello', 'world'])).toEqual(['HELLO', 'WORLD']);
      expect(convertToUpperCase(['a', 'b', 'c'])).toEqual(['A', 'B', 'C']);
      expect(convertToUpperCase([])).toEqual([]);
    });
  });

  describe('includes 函數測試', () => {
    it('應該正確檢查元素是否存在', () => {
      expect(containsElement([1, 2, 3], 2)).toBe(true);
      expect(containsElement([1, 2, 3], 4)).toBe(false);
      expect(containsElement(['apple', 'banana', 'orange'], 'banana')).toBe(true);
      expect(containsElement(['apple', 'banana', 'orange'], 'grape')).toBe(false);
      expect(containsElement([], 1)).toBe(false);
    });
  });

  describe('some 函數測試', () => {
    it('應該正確檢查是否至少有一個元素符合條件', () => {
      expect(someElement([1, 2, 3], num => num > 2)).toBe(true);
      expect(someElement([1, 2, 3], num => num > 3)).toBe(false);
      expect(someElement([], num => num > 0)).toBe(false);
    });
  });

  describe('every 函數測試', () => {
    it('應該正確檢查是否所有元素都符合條件', () => {
      expect(everyElement([1, 2, 3], num => num > 0)).toBe(true);
      expect(everyElement([1, 2, 3], num => num > 2)).toBe(false);
      expect(everyElement([], num => num > 0)).toBe(true);
    });
  });
});

describe('Lesson 1-1: JavaScript 陣列函數：進階', () => {

  describe('transformUserData 函數測試', () => {
    it('應該正確轉換使用者資料', () => {
      const users = [
        {
          firstName: 'John',
          lastName: 'Doe',
          age: 28,
          hobbies: ['reading', 'swimming'],
          email: 'john@example.com',
          phone: '123-456-7890'
        },
        {
          firstName: 'Jane',
          lastName: 'Smith',
          age: 17,
          hobbies: ['painting', 'dancing', 'singing'],
          email: 'jane@example.com'
        },
        {
          firstName: 'Bob',
          lastName: 'Johnson',
          age: 35,
          phone: '555-123-4567'
        }
      ];

      const expected = [
        {
          fullName: 'John Doe',
          age: 28,
          isAdult: true,
          hobbies: 'reading, swimming',
          contactInfo: {
            email: 'john@example.com',
            phone: '123-456-7890'
          }
        },
        {
          fullName: 'Jane Smith',
          age: 17,
          isAdult: false,
          hobbies: 'painting, dancing, singing',
          contactInfo: {
            email: 'jane@example.com',
            phone: 'N/A'
          }
        },
        {
          fullName: 'Bob Johnson',
          age: 35,
          isAdult: true,
          hobbies: 'None',
          contactInfo: {
            email: 'N/A',
            phone: '555-123-4567'
          }
        }
      ];

      expect(transformUserData(users)).toEqual(expected);
    });

    it('應該處理空陣列', () => {
      expect(transformUserData([])).toEqual([]);
    });
  });

  describe('filterProducts 函數測試', () => {
    const products = [
      {
        id: 1,
        name: 'Laptop',
        price: 1200,
        inStock: true,
        categories: ['electronics', 'computers']
      },
      {
        id: 2,
        name: 'Smartphone',
        price: 800,
        inStock: true,
        categories: ['electronics', 'phones']
      },
      {
        id: 3,
        name: 'Headphones',
        price: 150,
        inStock: false,
        categories: ['electronics', 'accessories']
      },
      {
        id: 4,
        name: 'Book',
        price: 25,
        inStock: true,
        categories: ['books', 'education']
      }
    ];

    it('應該根據單一條件過濾', () => {
      expect(filterProducts(products, { inStock: true })).toEqual([
        products[0], products[1], products[3]
      ]);
    });

    it('應該根據價格範圍過濾', () => {
      expect(filterProducts(products, { price: { min: 100, max: 1000 } })).toEqual([
        products[1], products[2]
      ]);

      expect(filterProducts(products, { price: { min: 500 } })).toEqual([
        products[0], products[1]
      ]);

      expect(filterProducts(products, { price: { max: 200 } })).toEqual([
        products[2], products[3]
      ]);
    });

    it('應該根據類別過濾', () => {
      expect(filterProducts(products, { categories: ['books'] })).toEqual([
        products[3]
      ]);

      expect(filterProducts(products, { categories: ['electronics'] })).toEqual([
        products[0], products[1], products[2]
      ]);

      expect(filterProducts(products, { categories: ['accessories', 'education'] })).toEqual([
        products[2], products[3]
      ]);
    });

    it('應該根據多條件過濾', () => {
      expect(filterProducts(products, {
        inStock: true,
        categories: ['electronics'],
        price: { min: 1000 }
      })).toEqual([
        products[0]
      ]);
    });
  });

  describe('calculateCartTotal 函數測試', () => {
    it('應該正確計算購物車總金額', () => {
      const cartItems = [
        { name: 'Product A', price: 100, quantity: 2, discount: 0.1 },
        { name: 'Product B', price: 50, quantity: 1, discount: 0 },
        { name: 'Product C', price: 200, quantity: 3, discount: 0.2 }
      ];

      const expected = {
        subtotal: 850, // (100*2 + 50*1 + 200*3)
        discount: 140, // (100*2*0.1 + 200*3*0.2)
        tax: 71, // (850-140) * 0.1
        total: 781 // 850 - 140 + 71
      };

      const result = calculateCartTotal(cartItems);
      expect(result).toEqual(expected);
    });

    it('應該處理自定義稅率', () => {
      const cartItems = [
        { name: 'Product A', price: 100, quantity: 1, discount: 0 }
      ];

      const result = calculateCartTotal(cartItems, 0.05);
      expect(result).toEqual({
        subtotal: 100,
        discount: 0,
        tax: 5, // 100 * 0.05
        total: 105
      });
    });

    it('應該處理空購物車', () => {
      const result = calculateCartTotal([]);
      expect(result).toEqual({
        subtotal: 0,
        discount: 0,
        tax: 0,
        total: 0
      });
    });
  });

  describe('analyzeNestedData 函數測試', () => {
    it('應該正確分析巢狀數據', () => {
      const nestedData = [
        [1, 2, 3],
        [4, 5],
        [6, 7, 8, 9],
        [10]
      ];

      const result = analyzeNestedData(nestedData);

      expect(result.flatArray).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      expect(result.sum).toBe(55);
      expect(result.average).toBe(5.5);
      expect(result.min).toBe(1);
      expect(result.max).toBe(10);
      expect(result.countsByValue).toEqual({
        '1': 1, '2': 1, '3': 1, '4': 1, '5': 1,
        '6': 1, '7': 1, '8': 1, '9': 1, '10': 1
      });
    });

    it('應該處理重複值', () => {
      const nestedData = [
        [1, 2, 2],
        [3, 3, 3],
        [4]
      ];

      const result = analyzeNestedData(nestedData);

      expect(result.flatArray).toEqual([1, 2, 2, 3, 3, 3, 4]);
      expect(result.sum).toBe(18);
      expect(result.average).toBeCloseTo(2.57, 2);
      expect(result.min).toBe(1);
      expect(result.max).toBe(4);
      expect(result.countsByValue).toEqual({
        '1': 1, '2': 2, '3': 3, '4': 1
      });
    });

    it('應該處理空陣列', () => {
      const result = analyzeNestedData([]);

      expect(result.flatArray).toEqual([]);
      expect(result.sum).toBe(0);
      expect(result.average).toBe(0);
      expect(result.min).toBe(Number.MAX_SAFE_INTEGER);
      expect(result.max).toBe(Number.MIN_SAFE_INTEGER);
      expect(result.countsByValue).toEqual({});
    });
  });

  describe('groupAndSummarizeTransactions 函數測試', () => {
    it('應該正確分組和彙總交易', () => {
      const transactions = [
        { id: 1, category: 'food', amount: 50, date: '2023-01-15' },
        { id: 2, category: 'transport', amount: 30, date: '2023-01-20' },
        { id: 3, category: 'food', amount: 40, date: '2023-02-10' },
        { id: 4, category: 'entertainment', amount: 100, date: '2023-02-15' },
        { id: 5, category: 'food', amount: 60, date: '2023-03-05' },
        { id: 6, category: 'transport', amount: 25, date: '2023-03-10' }
      ];

      const result = groupAndSummarizeTransactions(transactions);

      // 檢查食物類別
      expect(result.food.count).toBe(3);
      expect(result.food.totalAmount).toBe(150);
      expect(result.food.averageAmount).toBe(50);
      expect(result.food.minAmount).toBe(40);
      expect(result.food.maxAmount).toBe(60);
      expect(result.food.recentTransactions).toHaveLength(3);
      expect(result.food.recentTransactions[0].id).toBe(5); // 最近的交易

      // 檢查交通類別
      expect(result.transport.count).toBe(2);
      expect(result.transport.totalAmount).toBe(55);
      expect(result.transport.averageAmount).toBe(27.5);
      expect(result.transport.minAmount).toBe(25);
      expect(result.transport.maxAmount).toBe(30);

      // 檢查娛樂類別
      expect(result.entertainment.count).toBe(1);
      expect(result.entertainment.totalAmount).toBe(100);
    });

    it('應該處理空陣列', () => {
      expect(groupAndSummarizeTransactions([])).toEqual({});
    });
  });

  describe('checkItemsWithCriteria 函數測試', () => {
    const items = [
      { id: 1, category: 'food', price: 50 },
      { id: 2, category: 'food', price: 30 },
      { id: 3, category: 'transport', price: 20 }
    ];

    it('應該正確檢查是否符合條件 (some 和 every)', () => {
      const criteria = { category: 'food' };
      const result = checkItemsWithCriteria(items, criteria);

      expect(result.anyMatch).toBe(true); // 至少有一個符合
      expect(result.allMatch).toBe(false); // 並非所有都符合
    });

    it('應該處理所有都符合的情況', () => {
      const criteria = { category: 'food', price: 50 };
      const result = checkItemsWithCriteria([{ id: 1, category: 'food', price: 50 }], criteria);

      expect(result.anyMatch).toBe(true);
      expect(result.allMatch).toBe(true);
    });

    it('應該處理空陣列', () => {
      const result = checkItemsWithCriteria([], { category: 'food' });

      expect(result.anyMatch).toBe(false);
      expect(result.allMatch).toBe(true);
    });
  });
});
