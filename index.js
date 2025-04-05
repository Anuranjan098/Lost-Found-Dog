const express = require("express");
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
const path = require("path"); 
app.use(express.static(path.join(__dirname, "public")));
const mysql = require('mysql2');

const connection = mysql.createConnection({
     host: "localhost",
     user: "root",
     password: "Dhruv@090803",
     database: "mydatabase",
   });

   // Connect to MySQL
connection.connect((err) => {
     if (err) {
         console.error('Database Connection Failed:', err);
         return;
     }
     console.log('Connected to MySQL Database');
 });

app.get("/" ,(req,res)=>{
    res.sendFile(path.join(__dirname, "index.html" ,)); // Correct way to send HTML file
 })
 
 app.post("/submit", (req, res) => {
     const { myname, details } = req.body;
     connection.query("INSERT INTO users (myname, details) VALUES (?, ?)", [myname, details], (err) => {
          if (err) return res.send("Database Error");
          res.send("Data Saved Successfully!");
      });
 });
 

app.listen(3000 , ()=>{
     console.log("server is running on port 3000");
})
