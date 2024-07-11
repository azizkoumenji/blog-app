import db from "../db.js";
import bcrypt from "bcrypt";

export const register = (req, res) => {
  // Check if user already exists.
  const q = `select * from users where username  = ? or email = ?`;
  db.query(q, [req.body.username, req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists!");

    // Hash the password and create user.
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "insert into users (username, email, password) values (?)";
    const values = [req.body.username, req.body.email, hash];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User created.");
    });
  });
};

export const login = (req, res) => {};

export const logout = (req, res) => {};
