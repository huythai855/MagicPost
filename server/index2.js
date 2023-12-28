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