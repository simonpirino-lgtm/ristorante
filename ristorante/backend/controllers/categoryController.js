const service = require('../services/categoryService');

exports.getAll = async (req, res) => {
    try {
        const data = await service.getAll();
        res.json(data);
    } catch (err) {
        res.status(500).json({ errore: err.message });
    }
};

exports.create = async (req, res) => {
    try {
        await service.create(req.body);
        res.json({ message: "Categoria inserita" });
    } catch (err) {
        res.status(500).json({ errore: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await service.remove(req.params.id);
        res.json({ message: "Categoria eliminata" });
    } catch (err) {
        res.status(500).json({ errore: err.message });
    }
};