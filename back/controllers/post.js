import jwt from "jsonwebtoken";
import db from "../db.js";

export const getPosts = (req, res) => {
  const category = req.query.cat; // Get the cat query from the link (everthing after the question mark in a link is a query)
  const q = category
    ? "select * from posts where cat = ?"
    : "select * from posts";

  db.query(q, [category], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "select username, title, p.id, description, p.img, date, cat from users u join posts p on u.id  = p.uid where p.id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(500).json("User not authenticated.");

  jwt.verify(token, "jwt key", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = "delete from posts where id = ? and uid = ?";

    db.query(q, [req.params.id, userInfo.id], (err) => {
      if (err) return res.status(403).json("You can delete only your posts.");

      return res.status(200).json("Post has been deleted.");
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(500).json("User not authenticated.");

  jwt.verify(token, "jwt key", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "insert into posts (title, description, date, img, cat, uid) values (?, ?,  STR_TO_DATE(?, '%Y%m%d %H:%i:%s'), ?, ?, ?)";

    const values = [
      req.body.title,
      req.body.description,
      req.body.date,
      req.body.img,
      req.body.cat,
      userInfo.id,
    ];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Post has been added.");
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(500).json("User not authenticated.");

  jwt.verify(token, "jwt key", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const postId = req.params.id;
    const q =
      "update posts set title = ?, description = ?, img = ?, cat = ?, uid = ? where id = ? and uid = ?";

    const values = [
      req.body.title,
      req.body.description,
      req.body.img,
      req.body.cat,
      userInfo.id,
    ];

    db.query(q, [...values, postId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);

      return res.status(200).json("Post has been updated.");
    });
  });
};
