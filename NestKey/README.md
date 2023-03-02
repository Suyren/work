# Nested Key-Value Pair Tree Viewer

live demo: https://nest-key-demo.vercel.app/

1. 畫面分為兩側，一側為輸入區，一側為預覽區。
2. 輸入區中，每行 (Pair) 有兩個輸入框，一個用來輸入 Key，另一個用來
輸入 Value。
3. key 的輸入欄可以用 . 符號來標示其 Value 應屬於巢狀物件中某一節點
的值。
4. 使用者可自行增減行數。
5. 尚未輸入任何字符時，輸入框內預設皆為空字串，如果使用者只輸入
Value，但 Key 值為空時，該行 (Pair) 不會顯示在預覽區。
6. 預覽區中，須清楚呈現對應輸入區內容的巢狀物件結構。
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
  1. 先確認語法以及import路徑是否正確
  2. 檢查npm run build時執行的語法
  3. 最後發現是vue-tsc版本過舊造成的問題
3. 更新vue-tsc後延伸會報node_modules內的型別錯誤
解決方式：npm run build對應執行的語法補上 --skipLibCheck 此方法不會去檢查node_modules內的型別檢測
4. IDE使用pug模板，模板上有使用到的函式，在定義函式的地方卻顯示未使用；import組件時，IDE顯示錯誤的highlight syntax
解決方式：找到IDE插件volar的官方更新紀錄上寫要使用pug，要先安裝@volar/vue-language-plugin-pug套件
