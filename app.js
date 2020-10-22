const express = require('express');
const app = express();

//cssや画像ファイルを置くフォルダを指定する
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('top.ejs');
});

//一覧画面を表示するルーティング
app.get('/index', (req, res) => {
    res.render('index.ejs');
})
//サーバーを起動するコード
app.listen(3000);