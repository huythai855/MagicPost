const bodyParser = require('body-parser');
const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3').verbose();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const e = require('express');
const moment = require('moment');


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

app.post('/api/search/transaction_point', (req, res, next) => {
    console.log("/api/search/transaction_point triggered");
    console.log(req.body);
    var city = req.body.city;
    console.log(city);

    db.all("SELECT * FROM departments WHERE type = ? AND city = ?", [1, city], (err, rows) => {
        if (err) {
            console.log(err);
            res.json({ message: 'Lỗi tìm kiếm' })
        } else {
            console.log(rows);
            if(rows.length == 0) {
                res.json({ message: 'Không có điểm giao dịch như tìm kiếm' })
            }
            else
                res.json(rows);
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




async function getDepartmentId(city, district) {
    return new Promise((resolve, reject) => {
        if (district == undefined || district == ""){
            db.all("SELECT * FROM departments WHERE city = ?", [city], (err, rows) => {
                if (err) {
                    console.log(err);
                    reject(1000); // Trả về 1000 trong trường hợp lỗi
                } else {
                    const department_id = rows[0].id;
                    resolve(department_id);
                }
            });
        }
        else{
            db.all("SELECT * FROM departments WHERE city = ? AND district = ?", [city, district], (err, rows) => {
                if (err) {
                    console.log(err);
                    reject(1000); // Trả về 1000 trong trường hợp lỗi
                } else {
                    const department_id = rows[0].id;
                    resolve(department_id);
                }
            });
        }
    });
}


async function countItem() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM items", (err, rows) => {
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


/// ITEMS QUERY

app.post('/item/new', async (req, res, next) => {
    // TODO: kiem tra quyen truy cap
    next();
}, async (req, res, next) => {
    var department_id = req.cookies.department_id;
    var type = 0;
    var weight = req.body.weight;
    var sender_name = req.body.sender_name;
    var sender_address_city = req.body.sender_address_city;
    var sender_address_district = req.body.sender_address_district;
    var sender_address = sender_address_district + ", " + sender_address_city;
    var sender_tel_number = req.body.sender_tel_number;
    var sender_message = req.body.sender_message;
    var receiver_name = req.body.receiver_name;
    var receiver_address_city = req.body.receiver_address_city;
    var receiver_address_district = req.body.receiver_address_district;
    var receiver_address = receiver_address_district + ", " + receiver_address_city;
    var receiver_tel_number = req.body.receiver_tel_number;
    var cost = 0;
    var stage = 0;
    var countItem = await countItem();
    var detail = [
        { "id": 0, "time": "undefined" },
        { "id": 0, "cost": 0 },
        { "id": 0, "time": "undefined" },
        { "id": 0, "cost": 0 },
        { "id": 0, "time": "undefined" },
        { "id": 0, "cost": 0 },
        { "id": 0, "time": "undefined" },
        { "id": 0, "cost": 0 },
        { "status": "undefined" }
    ];

    var date = moment().utcOffset(7).format('DDMMYYYY');
    console.log(date);

    if(sender_address_city == receiver_address_city)
        if(sender_address_district == receiver_address_district)
            type = 1;
        else
            type = 2;
    else
        type = 3;

    // TODO: xử lý bất đồng bộ

    if(type == 1) {
        cost = 30000;
        detail[0] = { "id": id, "time": date };
        detail[6] = { "id": id, "time": date };
        stage = 6;
    }else if(type == 2) {
        cost = 50000;
        detail[0] = { "id": id, "time": date };
        var gathering_point_id = getDepartmentId(sender_address_city, "");
        detail[2] = { "id": gathering_point_id, "time": "undefined" };
        detail[4] = { "id": gathering_point_id, "time": "undefined" };
        var transaction_point_id = getDepartmentId(receiver_address_city, receiver_address_district);
        detail[6] = { "id": transaction_point_id, "time": "undefined" };
        stage = 0;
    }
    else { // type == 3
        cost = 70000;
        detail[0] = { "id": id, "time": date };
        var sender_gathering_point_id = getDepartmentId(sender_address_city, "");
        var receiver_gathering_point_id = getDepartmentId(receiver_address_city, "");
        var transaction_point_id = getDepartmentId(receiver_address_city, receiver_address_district);
        detail[2] = { "id": sender_gathering_point_id, "time": "undefined" };
        detail[4] = { "id": receiver_gathering_point_id, "time": "undefined" };
        detail[6] = { "id": transaction_point_id, "time": "undefined" };
        stage = 0;
    }


    // TODO: xu ly bat dong bo
    db.run(`INSERT INTO items 
                (id,
                type,
                weight,
                sender_name,
                sender_address,
                sender_tel_number,
                sender_message,
                receiver_name,
                receiver_address_city,
                receiver_address_district,
                receiver_tel_number,
                cost,
                stage,
                detail)
            VALUES (?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)`,
            [
                countItem + 1,
                type,
                weight,
                sender_name,
                sender_address,
                sender_tel_number,
                sender_message,
                receiver_name,
                receiver_address_city,
                receiver_address_district,
                receiver_tel_number,
                cost,
                stage,
                JSON.stringify(detail)
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

app.post('/item/ready_to_ship', async (req, res, next) => {
    //TODO: kiem tra quyen truy cap
    next();
}, (req, res, next) => {
    db.all("SELECT * FROM items", (err, rows) => {
        if (err) {
            console.log(err);
            res.json({ message: 'Lỗi tìm kiếm' })
        } else {
            var ready_to_ship = [];
            console.log(rows);
            for(var row in rows)
                if((row.stage == 0 || row.stage == 4 || row.stage == 6 || row.stage == 8) && (row.detail[row.stage].id == req.cookies.department_id))
                    ready_to_ship.push(row);
            // TODO: xu ly bat dong bo
            res.json(ready_to_ship);
        }
    });
});

app.post('/item/ready_to_confirm', async (req, res, next) => {
    //TODO: kiem tra quyen truy cap
    next();
}, (req, res, next) => {
    db.all("SELECT * FROM items", (err, rows) => {
        if (err) {
            console.log(err);
            res.json({ message: 'Lỗi tìm kiếm' })
        } else {
            var ready_to_confirm = [];
            console.log(rows);
            for(var row in rows)
                if(row.detail[row.stage + 1].id == req.cookies.department_id)
                    ready_to_confirm.push(row);
            // TODO: xu ly bat dong bo
            res.json(ready_to_confirm);
        }
    });
});

app.post('/item/finished', async (req, res, next) => {
    //TODO: kiem tra quyen truy cap
    next();
}, (req, res, next) => {
    db.all("SELECT * FROM items", (err, rows) => {
        if (err) {
            console.log(err);
            res.json({ message: 'Lỗi tìm kiếm' })
        } else {
            var finished = [];
            var temps = [0,2,4];
            console.log(rows);
            for(var row in rows)
                for(var temp in temps) 
                    if(temp < row.stage && row.detail[temp].id == req.cookies.department_id)
                        finished.push(row);
            //TODO: xu ly bat dong bo
            res.json(finished);
        }
    });
});

app.post('/item/confirm_incoming', async (req, res, next) => {
    //TODO: kiem tra quyen truy cap
    next();
}, (req, res, next) => {
    var id = req.body.id;
    console.log(id);
    db.all("SELECT * FROM items WHERE id = ?", [id], (err, rows) => {
        if (err) {
            console.log(err);
            res.json({ message: 'Lỗi tìm kiếm' })
        } else {
            var row = rows[0];
            var currentDate = moment().utcOffset(7).format('DDMMYYYY');
            var id = row.id;
            var detail = row.detail;
            var stage = row.stage;
            if(row.type == 2 && row.stage == 1){
                detail[2].date = currentDate;
                detail[4].date = currentDate;

                db.run(`UPDATE items 
                        SET stage = ?, detail = ?
                        WHERE id = ?`,
                    [
                        4,
                        JSON.stringify(detail),
                        id
                    ],
                );
                res.json({ message: 'Xác nhận thành công' });
            }
            else {
                detail[stage].date = currentDate;
                stage = stage + 1;

                db.run(`UPDATE items 
                        SET stage = ?, detail = ?
                        WHERE id = ?`,
                    [
                        4,
                        JSON.stringify(detail),
                        id
                    ],
                );

                res.json({ message: 'Xác nhận thành công' });
            }
        }
    });

});





















app.get('/', (req, res) => {
    res.send('Homepage. Nothing to see here!')
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})