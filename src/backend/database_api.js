// import express from 'express'
// import mysql from 'mysql'
// import cors from 'cors'


// const app = express()

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "test"
// })

// // to send from html body
// app.use(express.json())
// app.use(cors())

// app.get("/", (req, res) => {
//     res.json("Hello World")
// })

// app.get("/users", (req, res) => {
//     const q = "SELECT * FROM nrb_users"
//     db.query(q, (err, data) => {
//         if (err) return res.json(err)
//         return res.json(data)
//     })
// })

// app.post("/users", (req, res) => {
//     const q = "INSERT INTO nrb_users (`id`,`full_name`,`phone_number`,`country_code`,'email','bihar_district','referred_by','is_registered','is_member','current_country','current_state','created_at') VALUES (?)";
//     const values = [
//         req.body.id,
//         req.body.full_name,
//         req.body.phone_number,
//         req.body.country_code,
//         req.body.email,
//         req.body.bihar_district,
//         req.body.referred_by,
//         req.body.is_registered,
//         req.body.is_member,
//         req.body.current_country,
//         req.body.current_state,
//         req.body.created_at
//     ]
//     db.query(q, [values], (err, data) => {
//         if (err) return res.json(err)
//         return res.json("user has been added.")
//     })

// })

// // app.delete("/users/:id", (req, res) => {
// //     const userId = req.params.id;
// //     const q = "DELETE FROM nrb_users WHERE id=?"

// //     db.query(q, [userId], (err, data) => {
// //         if (err) return res.json(err)
// //         return res.json("user has been deleted.")
// //     })
// // })

// // app.put("/users/:id", (req, res) => {
// //     const userId = req.params.id;
// //     const q = "UPDATE nrb_users SET `title`=?,`desc`=?,`price`=?,`cover`=? WHERE id=?"
// //     const values = [
// //         req.body.title,
// //         req.body.desc,
// //         req.body.price,
// //         req.body.cover
// //     ]
// //     db.query(q, [...values, userId], (err, data) => {
// //         if (err) return res.json(err)
// //         return res.json("User has been updated.")
// //     })
// // })

// app.listen(8800, () => {
//     console.log("Connect to backend.")
// })