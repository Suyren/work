# Rander User

live demo: https://rander-user.vercel.app/#/RanderUser/AllUser

### 首頁
1. 以總數 3010 筆，並且可以自由選擇以每頁 10/30/50 筆資
料呈現 (預設 30 筆)。
2. 可以切換 Card 和 List 模式 (預設為 Card 模式)。
3. Card 和 List 中顯示的資訊和可自由發揮，其中只要求一定
要有 User 的頭像。
4. 點擊每一筆資料時會開啟一個 User 詳細資訊的 Modal，
而點擊右上角的 X icon 或點擊 Modal 外的任意處皆可將
Modal 關閉。
5. 可將任意使用者資料添加至我的收藏中。
6. 可將已添加至我的收藏的資料取消收藏。
7. 重新整理網頁會維持以下條件：
      - 每頁呈現幾筆。
      - 分頁。
      - 顯示模式。

### 我的收藏
1. 取消收藏功能。
2. 其餘功能體驗與首頁一致。

- **skill** vite + vue + typescript + tailwindcss + pug
- **tailwindcss:** 3.x
- **vue:** 3.x



## Install
```bash
npm install
```
---
## Develop
```bash
npm run dev
```
---
## Build
```bash
npm run build
```

## 開發遇到的問題

1. 沒有使用過pug和tailwind做開發，因此在語法上常常需要到官網去看怎麼使用
2. IDE執行打包後，會報一些import檔案時顯示找不到的錯誤  
  解決方式：
    - 先確認語法以及import路徑是否正確
    - 檢查npm run build時執行的語法
    - 最後發現是vue-tsc版本過舊造成的問題
3. 更新vue-tsc後延伸會報node_modules內的型別錯誤  
解決方式：npm run build對應執行的語法補上 --skipLibCheck 此方法不會去檢查node_modules內的型別檢測
4. IDE使用pug模板，模板上有使用到的函式，在定義函式的地方卻顯示未使用；import組件時，IDE顯示錯誤的highlight syntax  
解決方式：找到IDE插件volar的官方更新紀錄上寫要使用pug，要先安裝@volar/vue-language-plugin-pug套件
