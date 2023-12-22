const bodyParser = require('body-parser');
const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('open.db');
const app = express()
const port = 3000

app.use('/public', express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());


app.get('/login', (req, res, next) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.get('/home', (req, res, next) => {
    res.sendFile(__dirname + '/public/home.html')
})

app.post('/api/login', (req, res, next) => {
    console.log(req.body);

    var username = req.body.username;
    var password = req.body.password;

    console.log(username);
    console.log(password);

    db.all("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, rows) => {
        if (err) {
            console.log(err);
            res.json({ message: 'Login failed' })
        } else 
        if (rows.length == 0) {
            res.json({ message: 'Login failed' })
        } else {
            res.json({
                message: 'Login success',
                user: username
            });
            
        }
    });

})




app.get('/', (req, res, next) => {
    res.send('Hello World!')


}, (req, res, next) => {
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})