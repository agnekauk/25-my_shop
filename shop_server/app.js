const express = require('express');
const app = express();
const port = 3003;

const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

const mysql = require("mysql");
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "my_shop",
});

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

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
    const sql = `UPDATE products 
    SET title = ?, price = ?, code = ?, description = ? WHERE id = ?`;

    console.log(sql);

    con.query(
        sql, [req.body.title, req.body.price, req.body.code, req.body.description, req.params.id],
        (err, results) => {
            if (err) throw err;
            res.send(results);
        }
    );
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});