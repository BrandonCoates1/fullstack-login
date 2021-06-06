import mysql from "mysql";

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "PASSWORD",
    database: "master23",
});

connection.query("SELECT * FROM current_job_detail", (error, results) => {
    if (error) throw error;
    for (let result of results) {
        console.log(`${result.employee_id}: ${result.salary}`);
    }
});

const query = "INSERT INTO current_job_detail (employee_id, job_title, salary, laptop_id) VALUE (?, ?, ?, ?)";
const values = [2000, "code gremlin", 1000000, 10000];

connection.query(query, values, (error, results) => {
    if (error) {
        throw error;
    }

    console.log(results);
});

// const query = "DELETE FROM current_job_detail WHERE job_title = ?";
// const values = ["code gremlin"];

// connection.query(query, values, (error, results) => {
//     if (error) {
//         throw error;
//     }

//     console.log(results);
// });

// const query = "UPDATE current_job_detail SET salary = ? WHERE job_title = ?";
// const values = [1000001, "code gremlin"];

// connection.query(query, values, (error, results) => {
//     if (error) {
//         throw error;
//     }

//     console.log(results);
// });

connection.end();