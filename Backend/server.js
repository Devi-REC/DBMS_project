import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bodyParser from 'body-parser'; // Import body-parser

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Add body-parser middleware

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "devi",
    database: "GLOBALEDGE_MANAGEMENT"
});

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM Continent';
    db.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.post('/continent', (req, res) => {
    const { Continent_Name, Population, Totalcountries } = req.body; // Destructure req.body
    const sql = "INSERT INTO continent (Continent_Name, Population, Totalcountries) VALUES (?)";
    const values = [[Continent_Name, Population, Totalcountries]]; // Wrap values in an array
    db.query(sql, [values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.listen(8081, () => {
    console.log("listening");
});
