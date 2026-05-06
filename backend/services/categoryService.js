const repo = require('../repositories/categoryRepository');

exports.getAll = () => repo.getAll();
exports.create = (data) => repo.create(data);
exports.remove = (id) => repo.remove(id);