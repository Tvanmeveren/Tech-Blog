const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
// associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});
Post.belongsTo(User, {
    foreignKey: 'user_id'
});
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});
Comment.belongsTo(Post, {
    onDelete: 'CASCADE',
    foreignKey:'post_id',

});
User.hasMany(Comment, {
    foreignKey: 'user_id'
});
Post.hasMany(Comment, {
    onDelete: 'CASCADE',
    foreignKey: 'post_id',
    
});
module.exports = {User, Post, Comment};
