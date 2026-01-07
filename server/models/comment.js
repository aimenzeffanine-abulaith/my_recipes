const {Sequelize, DataTypes} = require('sequelize');
const db = require('./database');

const Comment = db.define('Comment', {
    text: {
        type: Sequelize.DataTypes.STRING,
    }
}, {
    timestamps: false
})

Comment.associate = models => {
    Comment.belongsTo(models.User)
    Comment.belongsTo(models.Post)
}


module.exports = Comment;