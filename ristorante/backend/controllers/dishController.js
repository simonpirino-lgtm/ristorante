const service = require('../services/dishService');

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
        res.json({ message: "Piatto inserito" });
    } catch (err) {
        res.status(500).json({ errore: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await service.remove(req.params.id);
        res.json({ message: "Piatto eliminato" });
    } catch (err) {
        res.status(500).json({ errore: err.message });
    }
};

exports.addCategory = async (req, res) => {
    try {
        await service.addCategory(req.params.id, req.body.category_id);
        res.json({ message: "Categoria associata" });
    } catch (err) {
        if (err.message === "ASSOCIAZIONE_ESISTENTE") {
            res.status(409).json({ errore: "Associazione già presente" });
        } else {
            res.status(500).json({ errore: err.message });
        }
    }
};

exports.removeCategory = async (req, res) => {
    try {
        await service.removeCategory(req.params.id, req.params.categoryId);
        res.json({ message: "Associazione rimossa" });
    } catch (err) {
        res.status(500).json({ errore: err.message });
    }
};