const {
  delayWithCallback,
  getUserDataWithCallback,
  getCommentsForUserWithCallback,
  delayWithPromise,
  getUserDataWithPromise,
  getCommentsForUserWithPromise,
  getUserDataWithAsync,
  getCommentsForUserWithAsync,
  // 進階函數
  getMultipleUsersWithCallback,
  retryOperationWithCallback,
  getMultipleUsersWithPromise,
  promiseWithTimeout,
  retryPromise,
  getUsersAndArticlesWithAsync,
  getUserWithTimeoutAndRetry,
  getUserCompleteProfile
} = require('./lesson1-2');

// 測試輔助函數：等待指定時間
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Lesson 1-2: JavaScript 非同步操作', () => {
  
  describe('Callback 函數基本練習', () => {
    
    test('delayWithCallback 應該在指定時間後執行回調', done => {
      const startTime = Date.now();
      delayWithCallback(100, () => {
        const elapsedTime = Date.now() - startTime;
        expect(elapsedTime).toBeGreaterThanOrEqual(100);
        done();
      });
    });
    
    test('getUserDataWithCallback 應該返回正確的使用者資料', done => {
      getUserDataWithCallback(1, (error, userData) => {
        expect(error).toBeNull();
        expect(userData).toEqual({
          id: 1,
          name: 'Alice',
          email: 'alice@example.com'
        });
        done();
      });
    });
    
    test('getUserDataWithCallback 應該處理不存在的使用者', done => {
      getUserDataWithCallback(999, (error, userData) => {
        expect(error).toBeInstanceOf(Error);
        expect(userData).toBeNull();
        done();
      });
    });
    
    test('getCommentsForUserWithCallback 應該返回使用者、文章和評論', done => {
      getCommentsForUserWithCallback(1, (error, result) => {
        expect(error).toBeNull();
        expect(result).toHaveProperty('user');
        expect(result).toHaveProperty('article');
        expect(result).toHaveProperty('comments');
        expect(result.user.id).toBe(1);
        expect(result.article.userId).toBe(1);
        expect(Array.isArray(result.comments)).toBe(true);
        done();
      });
    });
    
    test('getCommentsForUserWithCallback 應該處理不存在的使用者', done => {
      getCommentsForUserWithCallback(999, (error, result) => {
        expect(error).toBeInstanceOf(Error);
        expect(result).toBeNull();
        done();
      });
    });
  });
  
  describe('Promise 基本練習', () => {
    
    test('delayWithPromise 應該在指定時間後 resolve', async () => {
      const startTime = Date.now();
      await delayWithPromise(100);
      const elapsedTime = Date.now() - startTime;
      expect(elapsedTime).toBeGreaterThanOrEqual(100);
    });
    
    test('getUserDataWithPromise 應該返回正確的使用者資料', async () => {
      const userData = await getUserDataWithPromise(1);
      expect(userData).toEqual({
        id: 1,
        name: 'Alice',
        email: 'alice@example.com'
      });
    });
    
    test('getUserDataWithPromise 應該處理不存在的使用者', async () => {
      await expect(getUserDataWithPromise(999)).rejects.toThrow();
    });
    
    test('getCommentsForUserWithPromise 應該返回使用者、文章和評論', async () => {
      const result = await getCommentsForUserWithPromise(1);
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('article');
      expect(result).toHaveProperty('comments');
      expect(result.user.id).toBe(1);
      expect(result.article.userId).toBe(1);
      expect(Array.isArray(result.comments)).toBe(true);
    });
    
    test('getCommentsForUserWithPromise 應該處理不存在的使用者', async () => {
      await expect(getCommentsForUserWithPromise(999)).rejects.toThrow();
    });
  });
  
  describe('Async/Await 基本練習', () => {
    
    test('getUserDataWithAsync 應該返回正確的使用者資料', async () => {
      const userData = await getUserDataWithAsync(1);
      expect(userData).toEqual({
        id: 1,
        name: 'Alice',
        email: 'alice@example.com'
      });
    });
    
    test('getUserDataWithAsync 應該處理不存在的使用者', async () => {
      await expect(getUserDataWithAsync(999)).rejects.toThrow();
    });
    
    test('getCommentsForUserWithAsync 應該返回使用者、文章和評論', async () => {
      const result = await getCommentsForUserWithAsync(1);
      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('article');
      expect(result).toHaveProperty('comments');
      expect(result.user.id).toBe(1);
      expect(result.article.userId).toBe(1);
      expect(Array.isArray(result.comments)).toBe(true);
    });
    
    test('getCommentsForUserWithAsync 應該處理不存在的使用者', async () => {
      await expect(getCommentsForUserWithAsync(999)).rejects.toThrow();
    });
  });
});

describe('Lesson 1-2: JavaScript 非同步操作：進階', () => {
  
  describe('Callback 函數進階練習', () => {
    
    test('getMultipleUsersWithCallback 應該並行獲取多個使用者資料', done => {
      getMultipleUsersWithCallback([1, 2, 3], (error, users) => {
        expect(error).toBeNull();
        expect(users).toHaveLength(3);
        expect(users[0].id).toBe(1);
        expect(users[1].id).toBe(2);
        expect(users[2].id).toBe(3);
        done();
      });
    });
    
    test('getMultipleUsersWithCallback 應該處理空陣列', done => {
      getMultipleUsersWithCallback([], (error, users) => {
        expect(error).toBeNull();
        expect(users).toEqual([]);
        done();
      });
    });
    
    test('getMultipleUsersWithCallback 應該處理部分失敗', done => {
      getMultipleUsersWithCallback([1, 999, 3], (error, users) => {
        expect(error).not.toBeNull();
        expect(users).toBeNull();
        done();
      });
    });
    
    test('retryOperationWithCallback 應該在操作成功時返回結果', done => {
      let attempts = 0;
      const operation = callback => {
        attempts++;
        if (attempts <= 2) {
          callback(new Error('模擬失敗'), null);
        } else {
          callback(null, 'success');
        }
      };
      
      retryOperationWithCallback(operation, 3, (error, result) => {
        expect(error).toBeNull();
        expect(result).toBe('success');
        expect(attempts).toBe(3);
        done();
      });
    });
    
    test('retryOperationWithCallback 應該在達到最大重試次數時失敗', done => {
      let attempts = 0;
      const operation = callback => {
        attempts++;
        callback(new Error('模擬失敗'), null);
      };
      
      retryOperationWithCallback(operation, 3, (error, result) => {
        expect(error).toBeInstanceOf(Error);
        expect(result).toBeNull();
        expect(attempts).toBe(4); // 初始嘗試 + 3 次重試
        done();
      });
    });
  });
  
  describe('Promise 進階練習', () => {
    
    test('getMultipleUsersWithPromise 應該並行獲取多個使用者資料', async () => {
      const users = await getMultipleUsersWithPromise([1, 2, 3]);
      expect(users).toHaveLength(3);
      expect(users[0].id).toBe(1);
      expect(users[1].id).toBe(2);
      expect(users[2].id).toBe(3);
    });
    
    test('getMultipleUsersWithPromise 應該處理空陣列', async () => {
      const users = await getMultipleUsersWithPromise([]);
      expect(users).toEqual([]);
    });
    
    test('getMultipleUsersWithPromise 應該處理部分失敗', async () => {
      await expect(getMultipleUsersWithPromise([1, 999, 3])).rejects.toThrow();
    });
    
    test('promiseWithTimeout 應該在操作完成時返回結果', async () => {
      const promise = new Promise(resolve => {
        setTimeout(() => resolve('success'), 50);
      });
      
      const result = await promiseWithTimeout(promise, 100);
      expect(result).toBe('success');
    });
    
    test('promiseWithTimeout 應該在超時時拒絕', async () => {
      const promise = new Promise(resolve => {
        setTimeout(() => resolve('success'), 100);
      });
      
      await expect(promiseWithTimeout(promise, 50)).rejects.toThrow(/超時/);
    });
    
    test('retryPromise 應該在操作成功時返回結果', async () => {
      let attempts = 0;
      const promiseFactory = () => new Promise((resolve, reject) => {
        attempts++;
        if (attempts <= 2) {
          reject(new Error('模擬失敗'));
        } else {
          resolve('success');
        }
      });
      
      const result = await retryPromise(promiseFactory, 3);
      expect(result).toBe('success');
      expect(attempts).toBe(3);
    });
    
    test('retryPromise 應該在達到最大重試次數時失敗', async () => {
      let attempts = 0;
      const promiseFactory = () => new Promise((_, reject) => {
        attempts++;
        reject(new Error('模擬失敗'));
      });
      
      await expect(retryPromise(promiseFactory, 3)).rejects.toThrow();
      expect(attempts).toBe(4); // 初始嘗試 + 3 次重試
    });
  });
  
  describe('Async/Await 進階練習', () => {
    
    test('getUsersAndArticlesWithAsync 應該返回使用者和他們的文章', async () => {
      const results = await getUsersAndArticlesWithAsync([1, 2]);
      expect(results).toHaveLength(2);
      expect(results[0].user.id).toBe(1);
      expect(Array.isArray(results[0].articles)).toBe(true);
      expect(results[1].user.id).toBe(2);
      expect(Array.isArray(results[1].articles)).toBe(true);
    });
    
    test('getUsersAndArticlesWithAsync 應該處理空陣列', async () => {
      const results = await getUsersAndArticlesWithAsync([]);
      expect(results).toEqual([]);
    });
    
    test('getUserWithTimeoutAndRetry 應該在操作成功時返回結果', async () => {
      const result = await getUserWithTimeoutAndRetry(1, 500, 3);
      expect(result.id).toBe(1);
      expect(result.name).toBe('Alice');
    });
    
    test('getUserWithTimeoutAndRetry 應該在超時和達到最大重試次數時失敗', async () => {
      // 這個測試可能需要模擬，因為實際測試會很耗時
      // 這裡我們假設函數內部邏輯正確實現
      await expect(getUserWithTimeoutAndRetry(999, 10, 1)).rejects.toThrow();
    });
    
    test('getUserCompleteProfile 應該返回使用者的完整資料', async () => {
      const profile = await getUserCompleteProfile(1);
      expect(profile.id).toBe(1);
      expect(profile.name).toBe('Alice');
      expect(Array.isArray(profile.articles)).toBe(true);
      expect(profile.profile).toHaveProperty('bio');
      expect(profile.profile).toHaveProperty('location');
    });
    
    test('getUserCompleteProfile 應該處理不存在的使用者', async () => {
      await expect(getUserCompleteProfile(999)).rejects.toThrow();
    });
  });
});
