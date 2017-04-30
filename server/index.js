import express from 'express'

const app = express();
const port = 3000;

app.get('/',function(req, res, next){
    res.send('<h1>Hello React Server-Side Rendering</h1>');
});

app.listen(port, ()=>{
    console.log('http://localhost:3000')
});