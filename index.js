const express=require('express');
const router = express.Router();
const ejs=require('ejs');
const { createServer } = require('node:http');




const app=express();
const server = createServer(app);
const chatserver=require('./config/chat_server').chatserver(server);



app.use(express.static('./assest'));

//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');
app.use('/',require('./route/index'));




server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });
