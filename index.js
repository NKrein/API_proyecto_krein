//--------------------------------------------------------------------- Imports
const express = require('express');
const handlebars = require('express-handlebars');
const cors = require('cors');
//const { config } = require('./config');
const serverRoutes = require('./routes');

//--------------------------------------------------------------------- Initializations
const app = express()

//--------------------------------------------------------------------- Settings
//Handlebars
app.engine('handlebars', handlebars({
    extname: 'handlebars',
    defaultLayout: 'index.handlebars',
    layoutsDir: __dirname + '/views/hbs',
    partialsDir: __dirname + '/views/hbs/partials'
  })
);

app.set('views', './views/hbs');
app.set('view engine', 'handlebars');

//--------------------------------------------------------------------- Middlewares
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('', express.static(__dirname + '/public'));

//--------------------------------------------------------------------- Global Variables
const PORT = 8088;

//--------------------------------------------------------------------- Routes
serverRoutes(app);

// app.get('/', (req, res) => {
//   let data = [{
//     title:"product1",
//     price:"123",
//     stock:"0",
//     thumbnail:"url1",
//     id:"1"
//   },
//   {
//     title:"product2",
//     price:"123",
//     stock:"2",
//     thumbnail:"url2",
//     id:"2"
//   }]
//   res.render('index', { products: data });
// })

//--------------------------------------------------------------------- Listen
app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
})
