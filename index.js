//--------------------------------------------------------------------- Imports
const express = require('express');
const cors = require('cors');
//const { config } = require('./config');
const { productServerRoutes } = require('./routes/product');
const { cartServerRoutes } = require('./routes/cart');

//--------------------------------------------------------------------- Initializations
const app = express()

//--------------------------------------------------------------------- Settings
//EJS
//app.set('view engine', 'ejs');


//--------------------------------------------------------------------- Middlewares
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('', express.static(__dirname + '/public'));

//--------------------------------------------------------------------- Global Variables
const PORT = 8088;

//--------------------------------------------------------------------- Routes
productServerRoutes(app);
cartServerRoutes(app);

//--------------------------------------------------------------------- Listen
app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
})
