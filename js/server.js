
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const parser = require('body-parser');
const bcrypt = require('bcrypt');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'hr',
    password: 'Hrapp@1234',
    database: 'hr'
})

app.use(cors({
    origin: "*"
}));


app.use(parser.json());

app.post('/login', (req, res) => {


    const { email, password } = req.body;
    console.log("Email:", email);
    console.log("Password:", password);

    // Process the email and password and send a response
    
    conn.connect((error) => {
        if (error) throw error;
        else {
            console.log("connected");
            const sql = "select * from login where user_name = ?";
            conn.query(sql, [email], (error, result) => {
                if (error) throw error;
                else {
                    if (result.length == 0) {
                        const status = "Active";
                        const empId = "A0001"
                        const saltRound = 10;

                        let hashedPwd = "";

                     

                        bcrypt.hash(password, saltRound)
                        .then((hash) => {
                          hashedPwd = hash;
                      
                          const sql = "INSERT INTO login (user_name, user_pwd, user_status, emp_id) VALUES (?, ?, ?, ?)";
                          conn.query(sql, [email, hashedPwd, status, empId], (error) => {
                            if (error) throw error;
                            else {
                              console.log("User created");
                            }
                          });
                        })
                        .catch((error) => {
                          throw error;
                        });
                    }
                    else {
                        // console.log(result[0])
                        const hashPwd = result[0]['user_pwd'];
                        bcrypt.compare(password,hashPwd,(error,result)=>{
                            if(error) {
                                console.log(error)
                            }
                            else if(result){
                                console.log("Valid password")
                                res.send("Valid login")

                            }
                            else {
                                res.send("invalid login")
                            }
                        })

                    }
                }
            })
        }
    });

});

app.listen(3000, () => {
    console.log("server started on port 3000")
});

