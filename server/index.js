const bodyParser = require('body-parser');
const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3').verbose();
const cookieParser = require('cookie-parser');
const cors = require('cors');


const db = new sqlite3.Database('open.db');
const app = express()
const port = 3001

app.use(cors());
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

app.get('/clear_cookies', (req, res, next) => {
    res.sendFile(__dirname + '/public/clear-cookies.html')
})

app.get('/search', (req, res, next) => {
    res.sendFile(__dirname + '/public/search.html')
});
///


/// SEARCH
app.post('/api/search', (req, res, next) => {
    console.log("/api/search triggered");
    console.log(req.body);
    var id = req.body.id;
    console.log(id);

    db.all("SELECT * FROM items WHERE id = ?", [id], (err, rows) => {
        if (err) {
            console.log(err);
            res.json({ message: 'Lỗi tìm kiếm' })
        } else {
            console.log(rows);
            if(rows.length == 0) {
                res.json({ message: 'Không có đơn hàng như tìm kiếm' })
            }
            else
                res.json(rows[0]);
        }
    });
});


/// LOGIN
app.post('/api/login',(req, res, next) => {
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
            // console.log(rows);
            var role = rows[0].role;
            var id = rows[0].id;
            var fullname = rows[0].fullname;
            var department_id = rows[0].department_id;

            res.json({
                message: 'Login success',
                username: username,
                role: role,
                id: id,
                fullname: fullname,
                department_id: department_id
            });
            
        }
    });

});


/// EMPLOYEES QUERIES
app.get('/employees', (req, res, next) => {
    var role = req.cookies.role;
    console.log(role);
    if(role == undefined || role == '') 
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
                res.json(rows);
            }
        });
    }
    else {
        var department_id = req.cookies.department_id;

        db.all("SELECT * FROM employees WHERE department_id = ?", [department_id], (err, rows) => {
            if (err) {
                console.log(err);
                res.json({ message: 'Login failed' })
            } else {
                console.log(rows);
                res.json(rows);
            }
        });
    }
});


app.delete('/employees', (req, res, next) => {
    var role = req.cookies.role;
    if(role == undefined || role == '') 
        res.json({ message: 'You are not allowed to access this page' });
    if(role == 'shipper' || role == 'transaction_point_staff' || role =='gathering_point_staff') {
        res.json({ message: 'You are not allowed to access this page' });
    }
    next();
}, (req, res, next) => {
    var role = req.cookies.role;

    if(role == 'director') {
        db.run("DELETE FROM employees WHERE id = ?", [req.body.id], (err) => {
            if (err) {
                console.log(err);
                res.json({
                    message: 'Delete failed',
                    status: 400 
                });
            } else {
                console.log('Delete success');
                res.json({
                    message: 'Delete success',
                    status: 200
                });
            }
        });
    }
    else {
        // res.json({ message: 'You are not allowed to access this page' });
        var department_id = req.cookies.department_id;
        var id = req.body.id;
        db.run("DELETE FROM employees WHERE id = ? AND department_id = ?", [id, department_id], (err) => {
            if (err) {
                console.log(err);
                res.json({
                    message: 'Delete failed',
                    status: 400 
                });
            } else {
                console.log('Delete success');
                res.json({
                    message: 'Delete success',
                    status: 200
                });
            }
        });
    }

});



async function countEmployee() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM employees", (err, rows) => {
            if (err) {
                console.log(err);
                reject(1000); // Trả về 1000 trong trường hợp lỗi
            } else {
                const count = rows.length;
                resolve(count);
            }
        });
    });
}


app.post('/employees/edit', async (req, res, next) => {
    var role = req.cookies.role;
    // console.log(req.body);
    if(role != 'director') {
        res.json({ message: 'You are not allowed to access this page' });
    }
    await next();
}, async (req, res, next) => {
    var id = req.body.id;
    console.log(id);

    var fullname = req.body.fullname;
    var date_of_birth = req.body.date_of_birth;
    var tel_number = req.body.tel_number;
    var id_number = req.body.id_number;
    var address = req.body.address;
    var role = req.body.role;
    var username = req.body.username;
    var password = req.body.password;
    var department_id = req.body.department_id;
    
    if(id!=undefined && id!='') {
        db.run(`UPDATE employees 
                SET role = ?, fullname = ?, date_of_birth = ?, tel_number = ?, id_number = ?, address = ?, username = ?, password = ?, department_id = ?
                WHERE id = ?`,
            [
                role,
                fullname,
                date_of_birth,
                tel_number,
                id_number,
                address,
                username,
                password,
                department_id,
                id
            ],
        (err) => {
            console.log(err);
            res.json({
                message: 'Edit failed',
                status: 400 
            });
        },
        res.json({
            message: 'Edit success',
            status: 200
        })
        );
    }
    else {
        res.json({
            message: 'Edit failed',
            status: 400 
        });
    }
});


app.post('/employees/new', async (req, res, next) => {
    var role = req.cookies.role;
    // console.log(req.body);
    if(role != 'director') {
        res.json({ message: 'You are not allowed to access this page' });
    }
    await next();
}, async (req, res, next) => {
    var fullname = req.body.fullname;
    var date_of_birth = req.body.date_of_birth;
    var tel_number = req.body.tel_number;
    var id_number = req.body.id_number;
    var address = req.body.address;
    var role = req.body.role;
    var username = req.body.username;
    var password = req.body.password;
    var department_id = req.body.department_id;
    

    db.run(`INSERT INTO employees 
                (id, role, fullname, date_of_birth, tel_number, id_number, address, username, password, department_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            await countEmployee() + 1,
            role,
            fullname,
            date_of_birth,
            tel_number,
            id_number,
            address,
            username,
            password,
            department_id
        ],
    (err) => {
        console.log(err);
        res.json({
            message: 'Insert failed',
            status: 400 
        });
    },
    res.json({
        message: 'Insert success',
        status: 200
    })
    );
});




app.get('/', (req, res) => {
    res.send('Homepage. Nothing to see here!')
})


app.get('/', (req, res) => {
    res.send('Homepage. Nothing to see here!')
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})