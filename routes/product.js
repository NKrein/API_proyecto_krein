const { Router } = require('express');
const moment = require('moment');
const Container = require('../container');
const router = Router();

const db = new Container('./db.txt');
const errNotFound = { error: '404 - Object not found' };
const errNotAuth = { error: '401 - Not Authorized' }
const auth = true; // true => admin

const productServerRoutes = (app) => {
  app.use('/api/productos', router);

  // Devuelve un producto si existe id, sino todos los productos
  router.get('/:id?', (req, res) => {
    const { id } = req.params;
    if (id) {
      const object = db.getById(id);
      object.then(response => {
        if (response) {
          res.json({auth, product: response });
        } else {
          res.json(errNotFound);
        }
      }).catch(err => console.log('Error ->', err));
    } else {
      const allProducts = db.getAll();
      allProducts.then(response => {
        res.json({auth, products: response });
      }).catch(err => console.log('Error ->', err));

    }
  })

  // Recibe y agrega nuevo producto, lo devuelve con el id
  router.post('/', (req, res) => {
    if (auth) {
      const timestamp = moment().format('DD/MM/YYYY hh:mm:ss a');
      const obj = { timestamp, ...req.body };
      const savedObj = db.save(obj);
      savedObj.then(response => res.json(response)).catch(err => console.log('Error ->', err));
    } else {
      res.json(errNotAuth);
    }
  })

  // Recibe y actualiza un producto segun id
  router.put('/:id', (req, res) => {
    if (auth) {
      const { id } = req.params;
      const obj = req.body;
      const updatedObj = db.updateById(id, obj);
      updatedObj.then(response => {
        if (response) {
          res.json(response);
        } else {
          res.json(errNotFound);
        }
      }).catch(err => console.log('Error ->', err));
    } else {
      res.json(errNotAuth);
    }
  })

  // Elimina producto segun id
  router.delete('/:id', (req, res) => {
    if (auth) {
      const { id } = req.params;
      const deleteObj = db.deleteById(id);
      deleteObj.then(response => {
        if (response) {
          res.json(response);
        } else {
          res.json(errNotFound);
        }
      }).catch(err => console.log('Error ->', err));
    } else {
      res.json(errNotAuth);
    }
  })

}

module.exports = {
  productServerRoutes
};