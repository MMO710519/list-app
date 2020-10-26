const express = require('express');
//MySQLを使うためのコード
const mysql = require('mysql');
const app = express();

//cssや画像ファイルを置くフォルダを指定する
app.use(express.static('public'));
// フォームから送信された値を受け取る
app.use(express.urlencoded({extended: false}));

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
    //DBからデータを取得する
    connection.query(
        'SELECT id, name FROM items',
        (error, results) => {
            res.render('index.ejs', {items:　results});
        }
    );
});

app.get('/new',(req,res) => {
    res.render('new.ejs');
});

app.post('/create',(req,res) => {
    connection.query(
        'INSERT INTO items (name) VALUES (?)',
        [req.body.itemName],
        (error, results) => {
            res.redirect('/index'); 
        }
    );
});

app.post('/delete/:id',(req,res)=>{
    connection.query(
        'DELETE FROM items WHERE id=?',
        [req.params.id],
        (error,results)=>{
            res.redirect('/index');
        }
    )
});

//サーバーを起動するコード
app.listen(3000);