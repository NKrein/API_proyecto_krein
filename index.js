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
// app.engine('handlebars', handlebars({
//     extname: 'handlebars',
//     defaultLayout: 'index.handlebars',
//     layoutsDir: __dirname + '/views/hbs',
//     partialsDir: __dirname + '/views/hbs/partials'
//   })
// );

// app.set('views', './views/hbs');
// app.set('view engine', 'handlebars');

//Pug
// app.set('views', './views/pug');
// app.set('view engine', 'pug');

//EJS
app.set('view engine', 'ejs');


//--------------------------------------------------------------------- Middlewares
app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('', express.static(__dirname + '/public'));

//--------------------------------------------------------------------- Global Variables
const PORT = 8088;

//--------------------------------------------------------------------- Routes
serverRoutes(app);


//--------------------------------------------------------------------- Listen
app.listen(PORT, () => {
  console.log(`Servidor en el puerto ${PORT}`);
})
