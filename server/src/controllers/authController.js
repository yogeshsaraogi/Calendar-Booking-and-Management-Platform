const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const { db } = require("../services/database");
const secretKey = "token_access";

const signup = async (req, res, next) => {
  try {
    const userId = uuidv4();
    const { username, email, password, role } = req.body;
    const checkUsernameQuery = `
        SELECT count() as count FROM users WHERE username = '${username}'
      `;
    const query = `
        INSERT INTO users
        (id, username, email, password, role)
        VALUES ('${userId}','${username}','${email}','${password}','${role}')
      `;
    await db.query(checkUsernameQuery).exec(async (checkErr, checkResponse) => {
      if (checkErr) {
        next(checkErr);
      } else {
        const usernameExists = checkResponse[0].count > 0;
        if (usernameExists) {
          res.status(400).json({ error: "Username already exists" });
        } else {
          await db.query(query).exec((err, response) => {
            if (err) {
              next(err);
            } else {
              res.json({ response });
            }
          });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password, isAdmin } = req.body;
    let query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    if (isAdmin) {
      query += " AND role = 'admin'";
    }
    db.query(query).exec((err, response) => {
      if (err) {
        next(err);
      } else {
        if (response.length > 0) {
          jwt.sign(
            { username },
            secretKey,
            { expiresIn: "3000s" },
            (err, token) => {
              const { password, ...userResponse } = { ...response[0] };
              res.json({
                status: "Success",
                user: userResponse,
                token,
              });
            }
          );
        } else {
          res.json({ status: "Failed" });
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
};
