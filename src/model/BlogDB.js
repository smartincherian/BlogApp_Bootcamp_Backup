const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://smartkc:smartkc@smartincherian.jnt4a.mongodb.net/blogapp?retryWrites=true&w=majority');
const Schema = mongoose.Schema;

var articleSchema = new Schema({
    name: String,
    upvotes: Number,
    comments: Array,
    title: String,
    description: String
});

var ArticleInfo = mongoose.model('articles', articleSchema);

module.exports = ArticleInfo;