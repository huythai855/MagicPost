const bodyParser = require("body-parser");
// import { axios } from 'axios';
const express = require("express");
const axios = require("axios");

const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const moment = require("moment");
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

async function getDepartmentName(city, district) {
  console.log(city);
  console.log(district);
  return new Promise((resolve, reject) => {
    if (district == undefined || district == "") {
      db.all(
        "SELECT * FROM departments WHERE city = ? AND type = ?",
        [city, 2],
        (err, rows) => {
          if (err) {
            console.log(err);
            reject(1000); // Trả về 1000 trong trường hợp lỗi
          } else {
            console.log(rows);
            const department_name = rows[0].name;
            resolve(department_name);
          }
        }
      );
    } else {
      db.all(
        "SELECT * FROM departments WHERE city = ? AND district = ?",
        [city, district],
        (err, rows) => {
          console.log(city);
          console.log(district);
          if (err) {
            console.log(err);
            reject(1000); // Trả về 1000 trong trường hợp lỗi
          } else {
            const department_name = rows[0].name;

            resolve(department_name);
          }
        }
      );
    }
  });
}

async function countItem() {
  return new Promise((resolve, reject) => {
    db.get("SELECT MAX(id) as maxId FROM items", (err, row) => {
      if (err) {
        console.log(err);
        console.log("1234");
        reject(1000); // Trả về 1000 trong trường hợp lỗi
      } else {
        const maxId = row.maxId;
        resolve(maxId);
      }
    });
  });
}

app.post(
  "/item/new",
  async (req, res, next) => {
    // TODO: kiem tra quyen truy cap
    next();
  },
  async (req, res, next) => {
    var id = req.body.department_id;
    var type = 0;
    var weight = req.body.weight;
    var sender_name = req.body.sender_name;
    var sender_address_city = req.body.sender_address_city;
    var sender_address_district = req.body.sender_address_district;
    var sender_address = req.body.sender_address;
    var sender_tel_number = req.body.sender_tel_number;
    var type_of_good = req.body.type_of_good;
    var receiver_name = req.body.receiver_name;
    var receiver_address_city = req.body.receiver_address_city;
    var receiver_address_district = req.body.receiver_address_district;
    var receiver_address = req.body.receiver_address;
    var receiver_tel_number = req.body.receiver_tel_number;
    var cost = 0;
    var stage = 0;
    var count = (await countItem()) + 1;
    var detail = {
      stage: [

        { id: 0, time: "undefined", name: "undefined" },
        { id: 0, cost: "undefined" },
        { id: 0, time: "undefined", name: "undefined" },
        { id: 0, cost: "undefined" },
        { id: 0, time: "undefined", name: "undefined" },
        { id: 0, cost: "undefined" },
        { id: 0, time: "undefined", name: "undefined" },

        { id: 0, cost: "undefined" },
        { status: "undefined" },
      ],
    };

    const host = "https://provinces.open-api.vn/api/";

    var rp = [];
    try {
      const response = await axios.get(host + "?depth=1");
      rp = response.data; // Access the data property of the response
      // console.log(rp);
      for (var row of rp) {
        // Use 'of' instead of 'in' when iterating over an array
        if (row.code == sender_address_city) sender_address_city = row.name;
        if (row.code == receiver_address_city) receiver_address_city = row.name;
        console.log(1234);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    var date = moment().utcOffset(7).format("DD/MM/YYYY");
    console.log(date);

    if (sender_address_city == receiver_address_city)
      if (sender_address_district == receiver_address_district) type = 1;
      else type = 2;
    else type = 3;

    // TODO: xử lý bất đồng bộ

    if (type == 1) {
      console.log("type1")
      
      cost = 30000;
      var department_name = await getDepartmentName(
        sender_address_city,
        sender_address_district
      );
      detail.stage[0] = { id: id, time: date, name: department_name };
      detail.stage[6] = { id: id, time: date, name: department_name };
      stage = 6;
    } else if (type == 2) {
      cost = 50000;
      var sender_department_name = await getDepartmentName(
        sender_address_city,
        sender_address_district
      );
      detail.stage[0] = { id: id, time: date, name: sender_department_name };
      var gathering_point_id = getDepartmentId(sender_address_city, "");
      var gathering_point_name = await getDepartmentName(
        sender_address_city,
        ""
      );
      detail.stage[2] = {
        id: gathering_point_id,
        time: date,
        name: gathering_point_name,
      };
      detail.stage[4] = {
        id: gathering_point_id,
        time: date,
        name: gathering_point_name,
      };
      var transaction_point_id = getDepartmentId(
        receiver_address_city,
        receiver_address_district
      );
      var transaction_point_name = await getDepartmentName(
        receiver_address_city,
        receiver_address_district
      );
      detail.stage[6] = {
        id: transaction_point_id,
        time: date,
        name: transaction_point_name,
      };
      stage = 0;
    } else {
      // type == 3
      console.log("typ3")
      cost = 70000;
      var sender_department_name = await getDepartmentName(
        sender_address_city,
        sender_address_district
      );
      detail.stage[0] = { id: id, time: date, name: sender_department_name };
      var gathering_point_id = getDepartmentId(sender_address_city, "");
      var gathering_point_name = await getDepartmentName(
        sender_address_city,
        ""
      );
      detail.stage[2] = {
        id: gathering_point_id,
        time: date,
        name: gathering_point_name,
      };
      var receiver_gathering_point_id = getDepartmentId(
        receiver_address_city,
        ""
      );
      var receiver_gathering_point_name = await getDepartmentName(
        receiver_address_city,
        ""
      );
      detail.stage[4] = {
        id: receiver_gathering_point_id,
        time: date,
        name: receiver_gathering_point_name,
      };
      //
      var transaction_point_id = getDepartmentId(
        receiver_address_city,
        receiver_address_district
      );
      var transaction_point_name = await getDepartmentName(
        receiver_address_city,
        receiver_address_district
      );
      detail.stage[6] = {
        id: transaction_point_id,
        time: date,
        name: transaction_point_name,
      };
      stage = 0;
    }


    db.run(
      `INSERT INTO items 
              (id,
              type,
              weight,
              sender_name,
              sender_address,
              sender_tel_number,
              type_of_good,
              receiver_name,
              receiver_address,
              receiver_tel_number,
              cost,
              stage,
              detail)
          VALUES (?, ? ,? ,? ,? ,? ,? ,?, ? ,? ,? ,? ,?)`,
      [
        count,
        type,
        weight,
        sender_name,
        sender_address,
        sender_tel_number,
        type_of_good,
        receiver_name,

        receiver_address,
        receiver_tel_number,
        cost,
        stage,
        JSON.stringify(detail),
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

async function getDepartmentId(city, district) {
  return new Promise((resolve, reject) => {
    if (district == undefined || district == "") {
      db.all(
        "SELECT * FROM departments WHERE city = ?",
        [city],
        (err, rows) => {
          console.log(city);
          if (err) {
            console.log(err);
            reject(1000); // Trả về 1000 trong trường hợp lỗi
          } else {
            // const department_id = rows[0].id;
            console.log(rows);
            resolve(1000);

            // resolve(department_id);
          }
        }
      );
    } else {
      db.all(
        "SELECT * FROM departments WHERE city = ? AND district = ?",
        [city, district],
        (err, rows) => {
          console.log(city);
          console.log(district);
          if (err) {
            console.log(err);
            reject(1000); // Trả về 1000 trong trường hợp lỗi
          } else {
            const department_id = rows[0].id;
            resolve(department_id);
          }
        }
      );
    }
  });
}

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

app.post(
  "/item/don_noi_khu",
  async (req, res, next) => {
    next();
  },
  async (req, res, next) => {
    var department_id = req.body.department_id;
    var username = req.body.username;
    var id;
    if (username !== undefined) id = await getEmployeeId(username);

    db.all("SELECT * FROM items", (err, rows) => {
      if (err) {
        console.log(err);
        res.json({ message: "Lỗi tìm kiếm" });
      } else {
        var don_noi_khu = [];
        // console.log(rows)
        // console.log(rows);
        for (var row of rows) {
          // console.log(row);
          if (row.stage >= 6) {
            var temp = JSON.parse(row.detail);

            // console.log(temp);

            if (temp.stage[6].id == department_id) {
              if (id === undefined || id == "") {
                // console.log(1234);
                // console.log(id);
                row.detail = temp.stage[6].time;
                if (row.stage == 6) row.stage = "chờ gửi";
                if (row.stage == 7) row.stage = "đang giao";
                if (row.stage == 8) row.stage = temp.stage[8].status;
                don_noi_khu.push(row);
              } else if (temp.stage[7].id == id || row.stage <= 6) {
                row.detail = temp.stage[6].time;
                if (row.stage == 6) row.stage = "chờ gửi";
                if (row.stage == 7) row.stage = "đang giao";
                if (row.stage == 8) row.stage = temp.stage[8].status;
                don_noi_khu.push(row);

              }
            }
            // console.log(row)
          }
        }

        // console.log(don_noi_khu);
        res.json(don_noi_khu);
      }
    });
  }
);

app.post(
  "/item/don_ngoai_khu",
  async (req, res, next) => {
    next();
  },
  async (req, res, next) => {
    var department_id = req.body.department_id;
    var username = req.body.username;
    var id;
    if (username !== undefined) id = await getEmployeeId(username);
    console.log(id);

    db.all("SELECT * FROM items", (err, rows) => {
      if (err) {
        console.log(err);
        res.json({ message: "Lỗi tìm kiếm" });
      } else {
        var don_noi_khu = [];
        // console.log(rows)
        // console.log(rows);
        for (var row of rows) {
          // console.log(row);
          if (row.stage >= 0) {
            var temp = JSON.parse(row.detail);

            // console.log(temp);

            if (temp.stage[0].id == department_id) {
              if (id === undefined || id == "") {
                // console.log(1234);
                // console.log(id);
                console.log(12345);
                row.detail = temp.stage[0].time;
                row.receiver_address = temp.stage[2].name;

                if (row.stage == 0) row.stage = "chờ gửi";
                if (row.stage == 1) row.stage = "đang giao";
                if (row.stage >= 2) row.stage = "giao thành công";
                don_noi_khu.push(row);
              } else if (temp.stage[1].id == id || row.stage <= 0) {
                row.detail = temp.stage[0].time;
                row.receiver_address = temp.stage[2].name;

                if (row.stage == 0) row.stage = "chờ gửi";
                if (row.stage == 1) row.stage = "đang giao";
                if (row.stage >= 2) row.stage = "giao thành công";
                don_noi_khu.push(row);
              }
            }
            // console.log(row)
          }
        }

        // console.log(don_noi_khu);
        res.json(don_noi_khu);
      }
    });
  }
);


app.post(
  "/item/don_ngoai_khu_tk",
  async (req, res, next) => {
    next();
  },
  async (req, res, next) => {
    var department_id = req.body.department_id;


    db.all("SELECT * FROM items", (err, rows) => {
      if (err) {
        console.log(err);
        res.json({ message: "Lỗi tìm kiếm" });
      } else {
        var don_noi_khu = [];
        // console.log(rows);
        for (var row of rows) {
          if (row.stage >= 0) {
            var temp = JSON.parse(row.detail);
                  console.log(temp);
            // console.log(temp);

            if (temp.stage[2].id == department_id || temp.stage[4].id == department_id) {
                console.log(12345);
                row.detail = temp.stage[0].time;
                row.receiver_address = temp.stage[2].name;

                if (row.stage == 0) row.stage = "chờ gửi";
                if (row.stage == 1) row.stage = "đang giao";
                if (row.stage >= 2) row.stage = "giao thành công";


                don_noi_khu.push(row);
            }
          }
        }

        res.json(don_noi_khu);
      }
    });
  }
);

async function getEmployeeId(username) {
  return new Promise((resolve, reject) => {
    console.log(username)
    db.all(
      "SELECT * FROM employees WHERE username = ?",
      [username],
      (err, rows) => {
        if (err) {
          console.log(err);
          reject(1000); // Trả về 1000 trong trường hợp lỗi
        } else {
          const id = rows[0].id;
          resolve(id);
        }
      }
    );
  });
}

app.post(
  "/item/update",
  async (req, res, next) => {
    next();
  },
  async (req, res, next) => {
    var id = req.body.id;
    var status = req.body.status;
    var username = req.body.username;

    console.log(id);
    console.log(status);
    console.log(username);
    console.log(1234546);

    var shipper_id = await getEmployeeId(username);
    // var temp = await db.all("SELECT * FROM items WHERE id = ?", [id]);

    var x1 = (id) => {
      return new Promise((resolve, reject) => {
        db.all("SELECT * FROM items WHERE id = ?", [id], (err, rows) => {
          if (err) {
            console.log(err);
            reject(1000); // Trả về 1000 trong trường hợp lỗi
          } else {
            resolve(rows);
          }
        });
      });
    };

    var temp = await x1(id);

    var detail = JSON.parse(temp[0].detail);
    var stage = 0;

    if (status == "đang giao") {
      stage = 7;
      detail.stage[7] = { id: shipper_id };
    } else {
      console.log(12);
      stage = 8;
      detail.stage[8] = { status: status };
    }

    db.all(
      "UPDATE items SET stage = ?, detail = ? WHERE id = ?",
      [stage, JSON.stringify(detail), id],
      (err) => {
        if (err) {
          console.log(err);
          res.json({
            message: "Update failed",
            status: 400,
          });
        } else {
          console.log("Update success");
          res.json({
            message: "Update success",
            status: 200,
          });
        }
      }
    );
  }
);

app.post(
  "/item/updatenk",
  async (req, res, next) => {
    next();
  },
  async (req, res, next) => {
    var id = req.body.id;
    var status = req.body.status;
    var username = req.body.username;

    console.log("update nk");
    console.log(id);
    console.log(status);
    console.log(username);

    var shipper_id = await getEmployeeId(username);
    // var temp = await db.all("SELECT * FROM items WHERE id = ?", [id]);

    var x1 = (id) => {
      return new Promise((resolve, reject) => {
        db.all("SELECT * FROM items WHERE id = ?", [id], (err, rows) => {
          if (err) {
            console.log(err);
            reject(1000); // Trả về 1000 trong trường hợp lỗi
          } else {
            resolve(rows);
          }
        });
      });
    };

    var temp = await x1(id);

    var detail = JSON.parse(temp[0].detail);
    var stage = 0;

    if (status == "đang giao") {
      stage = 1;
      detail.stage[1] = { id: shipper_id };
    }
    if (status == "giao thành công") {
      console.log(12);
      stage = 2;
      // deta//il.stage[2] = { status: status };
    }

    db.all(
      "UPDATE items SET stage = ?, detail = ? WHERE id = ?",
      [stage, JSON.stringify(detail), id],
      (err) => {
        if (err) {
          console.log(err);
          res.json({
            message: "Update failed",
            status: 400,
          });
        } else {
          console.log("Update success");
          res.json({
            message: "Update success",
            status: 200,
          });
        }
      }
    );
  }
);

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
      [id, name, address, city, district, 1, type],
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
