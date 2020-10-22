const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.render('hello.ejs');
});

//トップ画面を表示するルーティング
app.get('/top', (req, res) => {
    res.render('top.ejs');
})

//サーバーを起動するコード
app.listen(3000);