import express from "express";
import bcrypt from "bcrypt";
import mysql from "mysql2";
import cors from "cors";

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "PASSWORD",
    database: "master23",
});

const router = express.Router();
router.options("*", cors());

const options = {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type"
}

router.post("/register", cors(options), async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    const query = "INSERT INTO users (Name, email, password) VALUE (?, ?, ?)";
    const values = [req.body.name, req.body.email, req.body.password];
    
    connection.query(query, values, (error, results) => {
        if (error) {
            res.status(500).json({"message": "not ok", "data": req.body, "error": error});
            return;
        }

        res.status(200).json({"message": "ok", "data": req.body, "response": results});
    });
});

router.post("/login", cors(options), async (req, res) => {
    let user;
    try {
        user = await connection.promise().query("SELECT name, email, password FROM users WHERE email = ?", req.body.email);
        if (user[0][0] == undefined) {
            throw new Error("User doesn't exist");
        }
        const result = await bcrypt.compare(req.body.password, user[0][0].password);
        result ? res.status(200).json({"message": "ok", "status": result, "user": {"name": user[0][0].name, "email": user[0][0].email}}) : res.status(500).json({"message": "not ok", "status": result});
    } catch (Error) {
        res.status(500).json({"message": "not ok", "data": req.body, "error": Error});
    }
});

export default router