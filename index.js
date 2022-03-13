require("dotenv").config();
const { Sequelize, QueryTypes, Model, DataTypes } = require("sequelize");
const express = require("express");

const sequelize = new Sequelize(process.env.DATABASE_URL);
const app = express();

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

Blog.sync()

app.use(express.json());

app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.findAll();
    res.json(JSON.stringify(blogs));
});
app.post('/api/blogs', async (req, res) => {
    const blog = await Blog.create(req.body);
    res.json(JSON.stringify(blog));
});
app.delete('/api/blogs/:id', async (req, res) => {
    const blog = await Blog.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json(JSON.stringify(blog));
});