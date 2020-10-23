const express = require('express');
//MySQLを使うためのコード
const mysql = require('mysql');

const app = express();

//cssや画像ファイルを置くフォルダを指定する
app.use(express.static('public'));
// DBへの接続情報
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysqlmysql',
    database: 'list_app'
});

app.get('/', (req, res) => {
    res.render('top.ejs');
});

//一覧画面を表示するルーティング
app.get('/index', (req, res) => {
    res.render('index.ejs');
})
//サーバーを起動するコード
app.listen(3000);