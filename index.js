const express = require('express');
const cors = require('cors');
const ArticleInfo = require('./src/model/BlogDB');
const path = require('path');


const app = express();
app.use(cors());

//static file
app.use(express.static(path.join(__dirname, '/src/build')));

// Post Method
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/login', (req, res) => {
    res.send({
      token: 'test123'
    });
  });

// Basic Article Fetch Route
app.get('/api/article/:name', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    try {
        const articleName = req.params.name;
        ArticleInfo.findOne({ name: articleName })
            .then(function (article) {
                res.status(200).json(article);
            })
    }
    catch (error) {
        res.status(500).json({ message: 'Error', eroor });
    }
});

// Update Article 
app.put('/api/article/:name', (req, res) => {
        const articleName = req.params.name;
        ArticleInfo.findOneAndUpdate({ name: articleName })
            .then(function (article) {
                res.status(200).json(article);
            })
    }
);


// Basic Article List Fetch Route
app.get('/api/article-list', (req, res) => {
    
        ArticleInfo.find()
        .then(function(article){
            res.json(article)
        });
        
});

// Delete Article 
app.post('/api/article/:name', (req, res) => {
    const articleName = req.params.name;
    const filter = { name: articleName };
    ArticleInfo.findOneAndDelete(filter)
    .then(function(article){
        res.json(article)
    });
    
});

// Update Article 
app.post('/api/article/:name/update', (req, res) => {
    const articleName = req.params.name;
    const filter = { name: articleName };
    const { title, description } = req.body;
    const update = {title, description};
    ArticleInfo.updateMany(filter, update, { multi: true })
        .then(function (article) {
            res.json(article);
        })
});

// Add Article 
app.post('/api/addarticle', (req, res) => {
    const { name, title, description } = req.body;
    var upvotes = 0;
    var comments = [];
    const update = {name, title, description,upvotes,comments };
    ArticleInfo.insertMany(update)
        .then(function (article) {
            res.json(article);
        })
});

// Upvotes Routing
app.post('/api/article/:name/upvotes', (req, res) => {
    const articleName = req.params.name;
    const filter = { name: articleName };
    const update = { $inc: { upvotes: 1 } };
    ArticleInfo.findOneAndUpdate(filter, update, { new: true })
        .then(function (article) {
            res.json(article);
        })
})

// Comments Routing
app.post('/api/article/:name/comments', (req, res) => {
    const articleName = req.params.name;
    const { username, text } = req.body;
    const filter = { name: articleName };
    const update = { $push: { comments: { username, text } } };
    ArticleInfo.findOneAndUpdate(filter, update, { new: true })
        .then(function (article) {
            res.json(article);
        })
})

//static file
app.get('*', (req,res)=> {
    res.sendFile(path.join(__dirname + '/src/build/index.html'));
})

// Port number
app.listen(process.env.PORT || 5001,()=>{
    console.log("Listening on port 5000");
})
