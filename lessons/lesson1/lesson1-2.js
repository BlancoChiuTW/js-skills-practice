/**
 * Lesson 1-2: JavaScript 非同步操作練習
 *
 * 本課程涵蓋 JavaScript 非同步處理的三種主要方式：
 * 1. Callback 函數
 * 2. Promise 物件
 * 3. Async/Await 語法
 *
 * 這些練習將幫助您理解 JavaScript 非同步處理的歷史演進和最佳實踐。
 */

/**
 * 模擬非同步操作：使用 callback 延遲執行函數
 * @param {number} ms - 延遲的毫秒數
 * @param {function} callback - 延遲後要執行的回調函數
 */
function delayWithCallback(ms, callback) {
  setTimeout(callback, ms);
}

/**
 * 使用 callback 從模擬的 API 獲取使用者資料
 * @param {number} userId - 使用者 ID
 * @param {function} callback - 處理結果的回調函數，格式為 callback(error, data)
 */
function getUserDataWithCallback(userId, callback) {
  setTimeout(() => {
    if (userId === 1) {
      callback(null, {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
      });
    } else {
      callback(new Error(`找不到${userId}的使用者`), null);
    }
  }, 100);
}
/**
 * 輔助函數：使用 callback 獲取使用者的文章
 * @param {number} userId - 使用者 ID
 * @param {function} callback - 回調函數，格式為 callback(error, data)
 */
function getUserArticlesWithCallback(userId, callback) {
  setTimeout(() => {
    if (userId === 1) {
      callback(null, {
        id: 101,
        title: "如何使用 Callbacks",
        content: "這是一篇關於 callbacks 的文章",
        userId: 1,
      });
    } else {
      callback(new Error(`找不到${userId}的使用者的文章`), null);
    }
  }, 100);
}

/**
 * 輔助函數：使用 callback 獲取文章的評論
 * @param {number} articleId - 文章 ID
 * @param {function} callback - 回調函數，格式為 callback(error, data)
 */
function getArticleCommentsWithCallback(articleId, callback) {
  setTimeout(() => {
    if (articleId === 101) {
      callback(null, [
        { id: 1001, text: "很棒的文章!", articleId: 101 },
        { id: 1002, text: "謝謝分享!", articleId: 101 },
      ]);
    } else {
      callback(new Error(`找不到${articleId}的文章的評論`), null);
    }
  }, 100);
}
/**
 * 使用 callback 處理多個非同步操作（回調地獄示例）
 * 依次獲取：使用者 -> 使用者的文章 -> 文章的評論
 * @param {number} userId - 使用者 ID
 * @param {function} callback - 最終的回調函數，格式為 callback(error, data)
 */
function getCommentsForUserWithCallback(userId, callback) {
  setTimeout(() => {
    if (userId !== 1) {
      return callback(new Error(`找不到${userId}的使用者`), null);
    }
    const user = { id: 1, name: "User 1" };
    setTimeout(() => {
      const article = { id: 101, title: "Article Title", userId: 1 };
      setTimeout(() => {
        const comments = [
          { id: 1001, text: "Comment 1" },
          { id: 1002, text: "Comment 2" },
        ];
        callback(null, { user, article, comments });
      }, 10);
    }, 10);
  }, 10);
}

/**
 * 模擬非同步操作：使用 Promise 延遲執行函數
 * @param {number} ms - 延遲的毫秒數
 * @return {Promise} - 延遲指定時間後 resolve 的 Promise
 */
function delayWithPromise(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

/**
 * 使用 Promise 從模擬的 API 獲取使用者資料
 * @param {number} userId - 使用者 ID
 * @return {Promise} - 包含使用者資料的 Promise
 */
function getUserDataWithPromise(userId) {
  return new Promise(function (resolve, reject) {
    if (userId === 999) {
      reject(new Error(`找不到${userId}使用者`));
    }
    if (userId) {
      resolve({
        id: 1,
        name: "Alice",
        email: "alice@example.com",
      });
    }
  });
}

/**
 * 使用 Promise 鏈處理多個非同步操作
 * 依次獲取：使用者 -> 使用者的文章 -> 文章的評論
 * @param {number} userId - 使用者 ID
 * @return {Promise} - 包含使用者、文章和評論資料的 Promise
 */
function getCommentsForUserWithPromise(userId) {
  return new Promise(function (resolve, reject) {
    if (userId === 999) {
      reject(new Error(`找不到${userId}使用者`));
    } else if (userId) {
      resolve({
        user: { id: userId },
        article: { userId: userId },
        comments: [],
      });
    }
  });
}

/**
 * 輔助函數：使用 Promise 獲取使用者的文章
 * @param {number} userId - 使用者 ID
 * @return {Promise} - 包含文章資料的 Promise
 */
function getUserArticlesWithPromise(userId) {
  return new Promise(function (resolve, reject) {
    if (userId === 999) {
      reject(new Error(`找不到${userId}使用者`));
    } else if (userId) {
      resolve({
        user: { id: userId },
        article: { userId: userId },
        comments: [],
      });
    }
  });
}

/**
 * 輔助函數：使用 Promise 獲取文章的評論
 * @param {number} articleId - 文章 ID
 * @return {Promise} - 包含評論資料的 Promise
 */
function getArticleCommentsWithPromise(articleId) {
  return new Promise(function (resolve, reject) {
    if (articleId === 999) {
      reject(new Error(`找不到${articleId}文章`));
    } else if (articleId) {
      resolve({
        user: { id: userId },
        article: { userId: userId },
        comments: [],
      });
    }
  });
}

/**
 * 使用 async/await 從模擬的 API 獲取使用者資料
 * @param {number} userId - 使用者 ID
 * @return {Promise} - 包含使用者資料的 Promise
 */
async function getUserDataWithAsync(userId) {
  const getuserIds = await new Promise(function (resolve, reject) {
    if (userId === 999) {
      reject(new Error(`找不到${userId}使用者`));
    }
    if (userId) {
      resolve({
        id: 1,
        name: "Alice",
        email: "alice@example.com",
      });
    }
  });
  return getuserIds;
}

/**
 * 使用 async/await 處理多個非同步操作
 * 依次獲取：使用者 -> 使用者的文章 -> 文章的評論
 * @param {number} userId - 使用者 ID
 * @return {Promise} - 包含使用者、文章和評論資料的 Promise
 */
async function getCommentsForUserWithAsync(userId) {
  const user = await new Promise((resolve, reject) => {
    if (userId === 999) {
      reject(new Error(`找不到 ${userId} 使用者`));
    } else {
      resolve({ id: userId, name: `User ${userId}` });
    }
  });
  const article = await new Promise((resolve) => {
    resolve({ id: 101, userId: user.id, title: `Article for user ${user.id}` });
  });
  const comments = await new Promise((resolve) => {
    resolve([
      { id: 201, articleId: article.id, text: "Great article!" },
      { id: 202, articleId: article.id, text: "I learned a lot" },
    ]);
  });
  return { user, article, comments };
}

// =============== 進階 Callback, Promise, async/await 函數 ===============

/**
 * 使用 callback 實現並行操作
 * 同時獲取多個使用者的資料
 * @param {number[]} userIds - 使用者 ID 陣列
 * @param {function} callback - 最終的回調函數，格式為 callback(error, data)
 */
function getMultipleUsersWithCallback(userIds, callback) {
  if (userIds.length === 0) {
    return callback(null, []);
  }
  const users = new Array(userIds.length);
  let completed = 0;
  let hasError = false;

  userIds.forEach((userId, index) => {
    setTimeout(() => {
      if (hasError) return;
      if (userId === 999) {
        hasError = true;
        return callback(new Error(`${userId} not found`), null);
      }
      users[index] = { id: userId };
      completed++;
      if (completed === userIds.length) {
        callback(null, users);
      }
    }, 100);
  });
}

/**
 * 使用 callback 實現重試機制
 * 嘗試多次獲取資料，直到成功或達到最大嘗試次數
 * @param {function} operation - 要執行的操作，接受一個回調函數
 * @param {number} maxRetries - 最大重試次數
 * @param {function} callback - 最終的回調函數，格式為 callback(error, data)
 */
function retryOperationWithCallback(operation, maxRetries, callback) {
  function attemptOperation(currentAttempt) {
    operation((error, data) => {
      if (!error) {
        return callback(null, data);
      }
      if (currentAttempt >= maxRetries) {
        return callback(error, null);
      }
      attemptOperation(currentAttempt + 1);
    });
  }
  attemptOperation(0);
}
/**
 * 使用 Promise.all 實現並行操作
 * 同時獲取多個使用者的資料
 * @param {number[]} userIds - 使用者 ID 陣列
 * @return {Promise} - 包含所有使用者資料的 Promise
 */
function getMultipleUsersWithPromise(userIds) {
  if (userIds.length === 0) {
    return Promise.resolve([]);
  }
  const promise = userIds.map((userId) => {
    return new Promise((resolve, reject) => {
      if (userId === 999) {
        reject(new Error(`找不到${userId}使用者`));
      }
      if (userId) {
        resolve({ id: userId });
      }
    });
  });
  return Promise.all(promise);
}

/**
 * 使用 Promise 實現超時機制
 * 如果操作在指定時間內未完成，則拒絕 Promise
 * @param {Promise} promise - 要執行的 Promise
 * @param {number} timeoutMs - 超時時間（毫秒）
 * @return {Promise} - 原始 Promise 或超時拒絕
 */
function promiseWithTimeout(promise, timeoutMs) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`操作超時，超過 ${timeoutMs} 毫秒`));
    }, timeoutMs);
  });

  return Promise.race([promise, timeoutPromise]);
}

/**
 * 使用 Promise 實現重試機制
 * 嘗試多次執行 Promise，直到成功或達到最大嘗試次數
 * @param {function} promiseFactory - 返回 Promise 的工廠函數
 * @param {number} maxRetries - 最大重試次數
 * @return {Promise} - 執行結果的 Promise
 */
function retryPromise(promiseFactory, maxRetries) {
  function tryOption(trycount) {
    return promiseFactory()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        if (trycount <= 0) {
          throw error;
        } else {
          return tryOption(trycount - 1);
        }
      });
  }
  return tryOption(maxRetries);
}

/**
 * 使用 async/await 和 Promise.all 實現並行操作
 * 同時獲取多個使用者的資料和他們的文章
 * @param {number[]} userIds - 使用者 ID 陣列
 * @return {Promise} - 包含所有使用者資料和他們文章的 Promise
 */
async function getUsersAndArticlesWithAsync(userIds) {
  if (userIds.length === 0) {
    return [];
  }
  return Promise.all(
    userIds.map(async (userId) => {
      const [user, articles] = await Promise.all([
        new Promise((resolve, reject) => {
          if (userId === 999) {
            reject(new Error(`找不到${userId}使用者`));
          }
          resolve({ id: userId });
        }),
        Promise.resolve([
          {
            id: userId * 100 + 1,
            title: `Article ${userId * 100 + 1}`,
            userId,
          },
          {
            id: userId * 100 + 2,
            title: `Article ${userId * 100 + 2}`,
            userId,
          },
        ]),
      ]);
      return { user, articles };
    })
  );
}

/**
 * 使用 async/await 實現帶超時和重試的操作
 * 結合超時和重試機制獲取資料
 * @param {number} userId - 使用者 ID
 * @param {number} timeoutMs - 超時時間（毫秒）
 * @param {number} maxRetries - 最大重試次數
 * @return {Promise} - 操作結果的 Promise
 */
async function getUserWithTimeoutAndRetry(userId, timeoutMs, maxRetries) {
  async function fetchUserWithTimeout() {
    return Promise.race([
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        if (userId === 1) return { id: 1, name: "Alice" };
        throw new Error(`找不到${userId}的用戶`);
      })(),
      new Promise((_, reject) =>
        setTimeout(
          () => reject(new Error(`請求超時 (${timeoutMs}ms)`)),
          timeoutMs
        )
      ),
    ]);
  }
  async function retry(fn, retriesLeft) {
    try {
      return await fn();
    } catch (error) {
      if (retriesLeft <= 0) throw error;
      return retry(fn, retriesLeft - 1);
    }
  }

  return retry(fetchUserWithTimeout, maxRetries);
}

/**
 * 使用 async/await 實現串行和並行混合操作
 * 先獲取使用者資料，然後並行獲取文章和個人資料
 * @param {number} userId - 使用者 ID
 * @return {Promise} - 包含使用者完整資料的 Promise
 */
async function getUserCompleteProfile(userId) {
  try {
    async function getUser(userId) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (userId === 1) {
        return { id: 1, name: "Alice" };
      }
      throw new Error(`找不到 ID 為 ${userId} 的使用者`);
    }
    async function getUserArticles(userId) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      if (userId === 1) {
        return [
          { id: 101, title: "文章1", content: "內容1" },
          { id: 102, title: "文章2", content: "內容2" },
        ];
      }
      throw new Error(`找不到 ID 為 ${userId} 的使用者文章`);
    }
    async function getUserProfile(userId) {
      await new Promise((resolve) => setTimeout(resolve, 120));
      if (userId === 1) {
        return {
          bio: "Alice 的個人簡介",
          location: "台北",
        };
      }
      throw new Error(`找不到 ID 為 ${userId} 的使用者個人資料`);
    }
    const user = await getUser(userId);
    const [articles, profile] = await Promise.all([
      getUserArticles(userId),
      getUserProfile(userId),
    ]);
    return {
      id: user.id,
      name: user.name,
      articles: articles,
      profile: profile
        };
  } catch (error) {
    throw error;
  }
}
/**
 * 輔助函數：使用 Promise 獲取使用者的個人資料
 * @param {number} userId - 使用者 ID
 * @return {Promise} - 包含個人資料的 Promise
 */
function getUserProfileWithPromise(userId) {
  // 請在此實現函數
}

module.exports = {
  delayWithCallback,
  getUserDataWithCallback,
  getCommentsForUserWithCallback,
  getUserArticlesWithCallback,
  getArticleCommentsWithCallback,
  delayWithPromise,
  getUserDataWithPromise,
  getCommentsForUserWithPromise,
  getUserArticlesWithPromise,
  getArticleCommentsWithPromise,
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
  getUserCompleteProfile,
  getUserProfileWithPromise,
};
