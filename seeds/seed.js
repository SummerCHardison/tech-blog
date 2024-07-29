const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    const createdPosts = [];
    for (const post of postData) {
      const createdPost = await Post.create({
        ...post,
        user_id: users[Math.floor(Math.random() * users.length)].id
      });
      createdPosts.push(createdPost);
    };

    for (const comment of commentData) {
      await Comment.create({
        ...comment,
        user_id: users[Math.floor(Math.random() * users.length)].id,
        post_id: createdPosts[Math.floor(Math.random() * createdPosts.length)].id
      });
    };

    process.exit(0);
  };

seedDatabase();