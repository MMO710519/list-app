const express = require('express');
//MySQLを使うためのコード
const mysql = require('mysql');
const app = express();
const moment = require('moment');
const date = require('date-utils');
// const session = require('express-session');
// const router = express.Router();

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

// router.get('/',function(req,res,next){
//     if(req.session.id){
//         res.redirect('/');
//     }　else {
//         res.render('login',{
//             title: 'ログイン'
//         });
//     }
// });

// router.post('/login', function(req, res, next) {
//     const email = req.body.email;
//     const password = req.body.password;
//     const query = 'SELECT id FROM users WHERE email = "' + email + '" AND password = "' + password + '" LIMIT 1';
//     connection.query(query, function(err, rows) {
//       const id = rows.length? rows[0].id: false;
//       if (id) {
//         req.session.id = id;
//         res.redirect('/index');
//       } else {
//         res.render('login', {
//           title: 'ログイン',
//           noUser: 'メールアドレスとパスワードが一致するユーザーはいません'
//         });
//       }
//     });
//     res.render('/index');
// });


// app.get('/', (req, res) => {
//     res.render('top.ejs');
// });

app.get('/toRegister',(req,res) => {
    res.render('register.ejs');
});


app.post('/register',(req,res) => {
    connection.query(
        'INSERT INTO users (name,email,password,created_at) VALUES (?,?,?,?)',
        [req.body.name,req.body.email,req.body.password,moment().format('YYYY-MM-DD HH:mm:ss')],
        (error, results) => {
            res.redirect('/'); 
        }
    );
});

//一覧画面を表示するルーティング
app.get('/', (req, res) => {
    //DBからデータを取得する
    connection.query(
        'SELECT id, name,expire_date FROM items',
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
        'INSERT INTO items (name,expire_date) VALUES (?,?)',
        [req.body.itemName, moment().format('YYYY-MM-DD')],
        (error, results) => {
            res.redirect('/'); 
        }
    );
});

app.post('/delete/:id',(req,res)=>{
    connection.query(
        'DELETE FROM items WHERE id=?',
        [req.params.id],
        (error,results)=>{
            res.redirect('/');
        }
    )
});

app.get('/edit/:id',(req,res)=>{
    connection.query(
        'SELECT name FROM items WHERE id=?',
        [req.params.id],
        (error,results)=>{
            res.render('edit.ejs', {item:results[0]});
        }
    );
});

app.post('/update/:id', (req,res)=>{
    connection.query(
        'UPDATE items SET name=? WHERE id=?',
        [req.body.updateName, req.params.id],
        (error,results)=>{
            res.redirect('/');
        }
    )
});

//サーバーを起動するコード
app.listen(3000);