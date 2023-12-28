const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const db = new sqlite3.Database("open.db");
const app = express();
const port = 3001;

app.use(cors());
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname + "/public")));
app.use(bodyParser.json());

/// TEST
app.get("/login", (req, res, next) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/home", (req, res, next) => {
  res.sendFile(__dirname + "/public/home.html");
});

app.get("/clear_cookies", (req, res, next) => {
  res.sendFile(__dirname + "/public/clear-cookies.html");
});

app.get("/search", (req, res, next) => {
  res.sendFile(__dirname + "/public/search.html");
});
///

/// SEARCH
app.post("/api/search", (req, res, next) => {
  console.log("/api/search triggered");
  console.log(req.body);
  var id = req.body.id;
  console.log(id);

  db.all("SELECT * FROM items WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.log(err);
      res.json({ message: "Lỗi tìm kiếm" });
    } else {
      console.log(rows);
      if (rows.length == 0) {
        res.json({ message: "Không có đơn hàng như tìm kiếm" });
      } else res.json(rows[0]);
    }
  });
});

app.post("/api/search/transaction_point", (req, res, next) => {
  console.log("/api/search/transaction_point triggered");
  console.log(req.body);
  var city = req.body.city;
  console.log(city);

  db.all(
    "SELECT * FROM departments WHERE type = ? AND city = ?",
    [1, city],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.json({ message: "Lỗi tìm kiếm" });
      } else {
        console.log(rows);
        if (rows.length == 0) {
          res.json({ message: "Không có điểm giao dịch như tìm kiếm" });
        } else res.json(rows);
      }
    }
  );
});

app.post("/api/departments", (req, res, next) => {
  var type = req.body.type;
  db.all("SELECT * FROM departments WHERE type = ? ", [type], (err, rows) => {
    if (err) {
      console.log(err);
      res.json({ message: "Lỗi tìm kiếm" });
    } else {
      console.log(rows);
      if (rows.length == 0) {
        res.json({ message: "Không có điểm giao dịch như tìm kiếm" });
      } else {
        var transaction_points = [];
        for (var row of rows) {
          row["address"] += ", " + row["district"] + ", " + row["city"];
          transaction_points.push(row);
        }

        res.json(transaction_points);
      }
    }
  });
});
app.post(
  "/department/delete",
  async (req, res, next) => {
    next();
  },
  async (req, res, next) => {
    var id = req.body.id;
    db.run(
      `DELETE FROM departments WHERE id = ?`,
      [id],
      (err) => {
        console.log(err);
        res.json({
          message: "Delete failed",
          status: 400,
        });
      },
      res.json({
        message: "Delete success",
        status: 200,
      })
    );
  }
);

/// LOGIN
app.post("/api/login", (req, res, next) => {
  console.log(req.body);

  var username = req.body.username;
  var password = req.body.password;

  console.log(username);
  console.log(password);

  db.all(
    "SELECT * FROM employees WHERE username = ? AND password = ?",
    [username, password],
    (err, rows) => {
      if (err) {
        console.log(err);
        res.json({ message: "Login failed" });
      } else if (rows.length == 0) {
        res.json({ message: "Login failed" });
      } else {
        // console.log(rows);
        var role = rows[0].role;
        var id = rows[0].id;
        var fullname = rows[0].fullname;
        var department_id = rows[0].department_id;

        res.json({
          message: "Login success",
          username: username,
          role: role,
          id: id,
          fullname: fullname,
          department_id: department_id,
        });
      }
    }
  );
});

/// EMPLOYEES QUERIES
app.post(
  "/employees",
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    var role = req.body.role;

    console.log(role);
    console.log("2nd mdw");

    if (role == "director") {
      console.log("D");
      db.all("SELECT * FROM employees", (err, rows) => {
        if (err) {
          console.log(err);
          return res.json({ message: "Login failed" });
        } else {
          var employees = [];
          for (var employee of rows) {
            if (employee.role == "director") employee.role = "Giám đốc";
            if (employee.role == "shipper")
              employee.role = "Nhân viên giao hàng";
            if (employee.role == "gathering_point_leader")
              employee.role = "Trưởng điểm tập kết";
            if (employee.role == "transaction_point_leader")
              employee.role = "Trưởng điểm giao dịch";
            if (employee.role == "gathering_point_staff")
              employee.role = "Nhân viên tập kết";
            if (employee.role == "transaction_point_staff")
              employee.role = "Nhân viên giao dịch";
            employees.push(employee);
          }

          console.log(rows);
          return res.json(employees);
        }
      });
    } else {
      var department_id = req.body.department_id;

      db.all(
        "SELECT * FROM employees WHERE department_id = ?",
        [department_id],
        (err, rows) => {
          if (err) {
            console.log(err);
            return res.json({ message: "Login failed" });
          } else {
            var employees = [];
            for (var employee of rows) {
              if (employee.role == "director") employee.role = "Giám đốc";
              if (employee.role == "shipper")
                employee.role = "Nhân viên giao hàng";
              if (employee.role == "gathering_point_leader")
                employee.role = "Trưởng điểm tập kết";
              if (employee.role == "transaction_point_leader")
                employee.role = "Trưởng điểm giao dịch";
              if (employee.role == "gathering_point_staff")
                employee.role = "Nhân viên tập kết";
              if (employee.role == "transaction_point_staff")
                employee.role = "Nhân viên giao dịch";
              employees.push(employee);
            }

            console.log(rows);
            return res.json(employees);
          }
        }
      );
    }
  }
);

app.post(
  "/employees/delete",
  (req, res, next) => {
    next();
  },
  (req, res, next) => {
    var role = req.cookies.role;

    db.run("DELETE FROM employees WHERE id = ?", [req.body.id], (err) => {
      if (err) {
        console.log(err);
        res.json({
          message: "Delete failed",
          status: 400,
        });
      } else {
        console.log("Delete success");
        res.json({
          message: "Delete success",
          status: 200,
        });
      }
    });
  }
);

async function countDepartment() {
  return new Promise((resolve, reject) => {
    db.get("SELECT MAX(ID) AS maxId FROM departments", (err, row) => {
      if (err) {
        console.log(err);
        reject(1000); // Trả về 1000 trong trường hợp lỗi
      } else {
        const maxId = row.maxId || 0; // Nếu không có bản ghi nào, trả về 0
        resolve(maxId);
      }
    });
  });
}

async function countEmployee() {
  return new Promise((resolve, reject) => {
    db.get("SELECT MAX(ID) as maxID FROM employees", (err, row) => {
      if (err) {
        console.log(err);
        reject(1000); // Trả về 1000 trong trường hợp lỗi
      } else {
        const maxID = row.maxID;
        resolve(maxID);
      }
    });
  });
}

app.post(
  "/department/new",
  async (req, res, next) => {
    next();
  },
  async (req, res, next) => {
    var name = req.body.name;
    var address = req.body.address;
    var city = req.body.city;
    var district = req.body.district;
    var leader_id = req.body.leader_id;
    var type = req.body.type;
    var id = (await countDepartment()) + 1;
    db.run(
      `INSERT INTO departments 
                (id, name, address, city, district, leader_id, type) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, name, address, city, district, leader_id, type],
      (err) => {
        console.log(err);
        res.json({
          message: "Insert failed",
          status: 400,
        });
      },
      res.json({
        message: "Insert success",
        status: 200,
      })
    );
  }
);

app.post(
  "/employees/new",
  async (req, res, next) => {
    next();
  },
  async (req, res, next) => {
    var fullname = req.body.fullname;
    var date_of_birth = req.body.date_of_birth;
    var tel_number = req.body.tel_number;
    var id_number = req.body.id_number;
    var address = req.body.address;
    var role = req.body.role;
    var username = req.body.username;
    var password = req.body.password;
    var department_id = req.body.department_id;
    var id = (await countEmployee()) + 1;

    console.log("insert");
    db.run(
      `INSERT INTO employees 
                (id, role, fullname, date_of_birth, tel_number, id_number, address, username, password, department_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        role,
        fullname,
        date_of_birth,
        tel_number,
        id_number,
        address,
        username,
        password,
        department_id,
      ],
      (err) => {
        console.log(err);
        res.json({
          message: "Insert failed",
          status: 400,
        });
      },
      res.json({
        message: "Insert success",
        status: 200,
      })
    );
  }
);

app.get("/", (req, res) => {
  res.send("Homepage. Nothing to see here!");
});

app.get("/", (req, res) => {
  res.send("Homepage. Nothing to see here!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
