const { db } = require("../services/database");
const { v4: uuidv4 } = require("uuid");
const categories = async (req, res, next) => {
  try {
    await db.query("SELECT * FROM categories").exec((err, response) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ categories: response });
      }
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addCategory = async (req, res, next) => {
  try {
    const categoryId = uuidv4();
    const { name } = req.body;

    const query = `INSERT INTO categories (id, name) VALUES ('${categoryId}', '${name}')`;
    db.query(query).exec((err, response) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ response });
      }
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.query;
    const query = `DELETE FROM categories WHERE id = '${id}';`;
    db.query(query).exec((err, response) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ response });
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  categories,
  addCategory,
  deleteCategory,
};
