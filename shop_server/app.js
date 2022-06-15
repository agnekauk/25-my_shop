const express = require('express');
const app = express();
const port = 3003;
app.use(express.json({ limit: '50mb' }));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

const cors = require("cors");
app.use(cors());

const mysql = require("mysql");
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "my_shop",
});


// READ

app.get("/admin/products", (req, res) => {
    const sql = `SELECT * FROM products`;

    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// CREATE

app.post("/admin/products", (req, res) => {
    const sql = `INSERT INTO products 
    (title, price, code, description, photo) 
    VALUES (?, ?, ?, ?, ?)`;

    con.query(
        sql, [req.body.title, req.body.price, req.body.code, req.body.description, req.body.photo || null],
        (err, results) => {
            if (err) throw err;
            res.send(results);
        }
    );
});

// DELETE

app.delete("/admin/products/:id", (req, res) => {

    const sql = `DELETE FROM products WHERE id = ?`;

    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});



// UPDATE

app.put("/admin/products/:id", (req, res) => {
    let sql;
    let data;

    if (!req.body.photo && !req.body.deletePhoto) {
        sql = `UPDATE products 
        SET title = ?, price = ?, code = ?, description = ? WHERE id = ?`;

        data = [req.body.title, req.body.price, req.body.code, req.body.description, req.params.id];
    } else if (req.body.deletePhoto) {
        sql = `UPDATE products 
        SET title = ?, price = ?, code = ?, description = ?, photo = null WHERE id = ?`;

        data = [req.body.title, req.body.price, req.body.code, req.body.description, req.params.id];
    } else {
        sql = `UPDATE products 
        SET title = ?, price = ?, code = ?, description = ?, photo = ? WHERE id = ?`;
        data = [req.body.title, req.body.price, req.body.code, req.body.description, req.body.photo, req.params.id];
    }

    con.query(
        sql, data,
        (err, results) => {
            if (err) throw err;
            res.send(results);
        }
    );
});

// FRONT
// READ

app.get("/products", (req, res) => {
    const sql = `SELECT * FROM products`;

    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});