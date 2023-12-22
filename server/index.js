const bodyParser = require('body-parser');
const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3').verbose();
const cookieParser = require('cookie-parser');


const db = new sqlite3.Database('open.db');
const app = express()
const port = 3001

app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());

/// TEST
app.get('/login', (req, res, next) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.get('/home', (req, res, next) => {
    res.sendFile(__dirname + '/public/home.html')
})
///



app.post('/api/login', (req, res, next) => {
    next();
}, (req, res, next) => {
    console.log(req.body);

    var username = req.body.username;
    var password = req.body.password;

    console.log(username);
    console.log(password);

    db.all("SELECT * FROM employees WHERE username = ? AND password = ?", [username, password], (err, rows) => {
        if (err) {
            console.log(err);
            res.json({ message: 'Login failed' })
        } else 
        if (rows.length == 0) {
            res.json({ message: 'Login failed' })
        } else {
            console.log(rows);
            var role = rows[0].role;
            var id = rows[0].id;
            var fullname = rows[0].fullname;

            // res.json({
            //     message: 'Login success',
            //     username: username,
            //     role: role,
            //     id: id,
            //     fullname: fullname,
            // });


            res.json({
                message: 'Login success',
                username: username
            });
            
        }
    });

});


app.get('/employees', (req, res, next) => {
    var role = req.cookies.role;
    console.log(role);
    if(role == undefined) 
        res.json({ message: 'You are not allowed to access this page' });
    if(role == 'shipper' || role == 'transaction_point_staff' || role =='gathering_point_staff') {
        res.json({ message: 'You are not allowed to access this page' });
    }
    next();
}, (req, res, next) => {
    var role = req.cookies.role;

    if(role == 'director') {
        db.all("SELECT * FROM employees", (err, rows) => {
            if (err) {
                console.log(err);
                res.json({ message: 'Login failed' })
            } else {
                console.log(rows);
            }
        });
    }
    
});



app.get('/', (req, res) => {
    res.send('Homepage. Nothing to see here!')
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})