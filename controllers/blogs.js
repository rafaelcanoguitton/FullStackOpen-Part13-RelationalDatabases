const router = require('express').Router();

const { Blog } = require('../models');

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(JSON.stringify(blogs));
});
router.post('/', async (req, res) => {
    const blog = await Blog.create(req.body);
    res.json(JSON.stringify(blog));
});
router.delete('/:id', async (req, res) => {
    const blog = await Blog.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json(JSON.stringify(blog));
});

module.exports = router;