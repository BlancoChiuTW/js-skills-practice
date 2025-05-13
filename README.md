# 前端技能練習

這是一個用於練習前端技能的專案，使用 Vitest 進行測試驗證。

## 課程結構

- Lesson 1: JavaScript 基礎技能
  - Lesson 1-1: 陣列函數 (map/filter/reduce/forEach/includes/some/every)
  - Lesson 1-2: 非同步函數 (Callback/Promise/Async/Await)
- Lesson 2: Vue 3 前端框架
  - Lesson 2-1: Vue 3 基礎 (ref/reactive/computed/watch/methods)

## 依賴
- Node.js 18: 用於執行 JavaScript 代碼。
- NPM: 用於管理依賴。
- Vue 3: 用於前端框架基礎的練習。
- Vitest: 用於測試 Vue 3 代碼。


## 使用方法

安裝依賴：
```bash
npm install
```

預覽 VUE 檔案:
```
安裝擴充插件「VUE preview」
在vue檔案內按下 「Ctrl + Alt + P」
```

測試:
 - 監聽模式:
    ```bash
    npm run test:watch
    ```
 - 單次測試:
    ```bash
    npm test
    ```
  - 單獨測試
    ```bash
    npm run test -- -t "Lesson 2-1: Vue 3 基礎"
    ```
