const db = require('../config/db');

exports.getAll = async () => {
    const [rows] = await db.query("SELECT * FROM categories");
    return rows;
};

exports.create = async (category) => {
    const { name } = category;

    await db.query(
        "INSERT INTO categories(name) VALUES (?)",
        [name]
    );
};

exports.remove = async (id) => {
    await db.query("DELETE FROM categories WHERE id=?", [id]);
};