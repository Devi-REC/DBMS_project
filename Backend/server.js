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
app.get('/continent/:id', (req, res) => {
    const continentID = req.params.id;
    const sqlUnemployment = 'SELECT * FROM Unemployment WHERE Continent_ID = ?';
    const sqlCountryStatistics = 'SELECT * FROM CountryStatistics WHERE Continent_ID = ?';
    db.query(sqlUnemployment, continentID, (err1, resultsUnemployment) => {
        if (err1) {
            console.error(err1);
            return res.status(500).json({ error: 'Failed to fetch unemployment data' });
        }
        db.query(sqlCountryStatistics, continentID, (err2, resultsCountryStatistics) => {
            if (err2) {
                console.error(err2);
                return res.status(500).json({ error: 'Failed to fetch country statistics data' });
            }
            const data = {
                unemployment: resultsUnemployment[0],
                countryStatistics: resultsCountryStatistics[0]
            };
            res.json(data);
        });
    });
});

app.put('/continent/:id', (req, res) => {
    // Destructure the properties from req.body
    const { Continent_Name, Population, Totalcountries } = req.body;
    // SQL query to update the continent data
    const sql = "UPDATE Continent SET Continent_Name = ?, Population = ?, Totalcountries = ? WHERE Continent_ID = ?";
    // Values to be updated along with the continent ID from the request parameters
    const values = [Continent_Name, Population, Totalcountries, req.params.id];
    // Execute the query
    db.query(sql, values, (err, result) => {
        if (err) return res.json(err); // Send error response if query fails
        return res.json(result); // Send success response
    });
});
app.get('/unemployment', (req, res) => {
    const sql = 'SELECT * FROM Unemployment';
    db.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
app.post('/unemployment', (req, res) => {
    const { Total_Unemployment, Youth_Unemployment, Longterm_Unemployment, Continent_ID, Country_Name } = req.body;
    const sql = "INSERT INTO Unemployment (Total_Unemployment, Youth_Unemployment, Longterm_Unemployment, Continent_ID, Country_Name) VALUES (?, ?, ?, ?, ?)";
    const values = [Total_Unemployment, Youth_Unemployment, Longterm_Unemployment, Continent_ID, Country_Name];
    db.query(sql, values, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.put('/unemployment/:id', (req, res) => {
    const { Total_Unemployment, Youth_Unemployment, Longterm_Unemployment, Continent_ID, Country_Name } = req.body;
    const sql = "UPDATE Unemployment SET Total_Unemployment = ?, Youth_Unemployment = ?, Longterm_Unemployment = ?, Continent_ID = ?, Country_Name = ? WHERE Unemployment_id = ?";
    const values = [Total_Unemployment, Youth_Unemployment, Longterm_Unemployment, Continent_ID, Country_Name, req.params.id];
    db.query(sql, values, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.delete('/unemployment/:id', (req, res) => {
    const sql = 'DELETE FROM Unemployment WHERE Unemployment_id = ?';
    db.query(sql, req.params.id, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get('/country-statistics', (req, res) => {
    const sql = 'SELECT * FROM CountryStatistics';
    db.query(sql, (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});
// PUT route to update country statistics data
app.put('/country-statistics/:id', (req, res) => {
    const { Country_Name, Technology_Adoption, Education_Rate, Tourism_Arrivals, Development_Status, Continent_ID } = req.body;
    const sql = "UPDATE CountryStatistics SET Country_Name = ?, Technology_Adoption = ?, Education_Rate = ?, Tourism_Arrivals = ?, Development_Status = ?, Continent_ID = ? WHERE Country_ID = ?";
    const values = [Country_Name, Technology_Adoption, Education_Rate, Tourism_Arrivals, Development_Status, Continent_ID, req.params.id];
    db.query(sql, values, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});
app.post('/country-statistics', (req, res) => {
    const { Country_Name, Technology_Adoption, Education_Rate, Tourism_Arrivals, Development_Status, Continent_ID } = req.body;
    const query = 'INSERT INTO CountryStatistics (Country_Name, Technology_Adoption, Education_Rate, Tourism_Arrivals, Development_Status, Continent_ID) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [Country_Name, Technology_Adoption, Education_Rate, Tourism_Arrivals, Development_Status, Continent_ID];
    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Error creating country statistics:', err);
            res.status(500).send('Error creating country statistics');
            return;
        }
        res.status(201).send('Country statistics created successfully');
    });
});
app.delete('/country-statistics/:id', (req, res) => {
    const sql = 'DELETE FROM CountryStatistics WHERE Country_ID = ?';
    db.query(sql, req.params.id, (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});


app.listen(8081, () => {
    console.log("listening");
});
