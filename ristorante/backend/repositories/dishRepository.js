const db = require('../config/db');

exports.getAll = async () => {
    const [rows] = await db.query(`
        SELECT 
            d.id AS dish_id,
            d.name AS dish_name,
            d.description,
            d.price,
            c.id AS category_id,
            c.name AS category_name
        FROM dishes d
        LEFT JOIN dish_categories dc ON d.id = dc.dish_id
        LEFT JOIN categories c ON dc.category_id = c.id
        ORDER BY d.id
    `);

    const dishes = [];

    rows.forEach(row => {
        let dish = dishes.find(d => d.id === row.dish_id);

        if (!dish) {
            dish = {
                id: row.dish_id,
                name: row.dish_name,
                description: row.description,
                price: row.price,
                categories: []
            };
            dishes.push(dish);
        }

        if (row.category_id) {
            dish.categories.push({
                id: row.category_id,
                name: row.category_name
            });
        }
    });

    return dishes;
};

exports.create = async (dish) => {
    const { name, description, price } = dish;

    await db.query(
        "INSERT INTO dishes(name, description, price) VALUES (?,?,?)",
        [name, description, price]
    );
};

exports.remove = async (id) => {
    await db.query("DELETE FROM dishes WHERE id=?", [id]);
};

exports.addCategory = async (dishId, categoryId) => {
    const [check] = await db.query(
        "SELECT * FROM dish_categories WHERE dish_id=? AND category_id=?",
        [dishId, categoryId]
    );

    if (check.length > 0) {
        throw new Error("ASSOCIAZIONE_ESISTENTE");
    }

    await db.query(
        "INSERT INTO dish_categories(dish_id, category_id) VALUES (?,?)",
        [dishId, categoryId]
    );
};

exports.removeCategory = async (dishId, categoryId) => {
    await db.query(
        "DELETE FROM dish_categories WHERE dish_id=? AND category_id=?",
        [dishId, categoryId]
    );
};