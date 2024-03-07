// imports express/body parser/multer library
const express = require('express')
const parser = require('body-parser')
const encodedParser = parser.urlencoded({extended: true})
const multer = require('multer')
const uploadProcessor = multer({dest:'upload'})
const app = express()

let data=[]
let postId=0

app.use(express.static('public'))
app.use(encodedParser)


app.set('view engine', 'ejs')

app.get('/homepage', (req, res)=>{
    res.render('homepage.ejs',{})
})

app.get('/about', (req, res)=>{
    res.render('about.ejs', {})
})

app.get('/community', (req, res) => {
    res.render('community.ejs', { allposts: data });
});

app.post('/upload', uploadProcessor.single('theimage'), (req, res) => {
    let now = new Date();
    let tags = req.body.tags.split(',').map(tag => tag.trim());
    let message = {
        id: postId++,
        name: req.body.name,
        text: req.body.text,
        tags: tags,
        date: now.toLocaleString(),
        imgSrc: req.file ? 'uploads/' + req.file.filename : null
    };
    data.unshift(message);
    res.redirect('/community');
});

app.get('/delete', (req, res) => {
    data = data.filter(post => post.id != req.query.postId);
    res.redirect('/community');
});




app.get('/education', (req, res)=>{
    res.render('education.ejs', {})
})

app.get('/suggestion', (req, res)=>{
    res.render('suggestion.ejs',{})
})

// setting up the server to start
// LAST PIECE OF CODE
// for projects going forward, it CANNOT be 80
app.listen(9999, ()=> {
    console.log('server starts')
})

