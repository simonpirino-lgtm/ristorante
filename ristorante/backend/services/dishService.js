const repo = require('../repositories/dishRepository');

exports.getAll = () => repo.getAll();
exports.create = (data) => repo.create(data);
exports.remove = (id) => repo.remove(id);
exports.addCategory = (dishId, categoryId) => repo.addCategory(dishId, categoryId);
exports.removeCategory = (dishId, categoryId) => repo.removeCategory(dishId, categoryId);