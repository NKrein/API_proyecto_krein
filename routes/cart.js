const { Router } = require('express');
const moment = require('moment');
const Container = require('../container');
const router = Router();

const db = new Container('./db.txt');
const cart = new Container('./cart.txt');
const errNotFound = { error: '404 - Object not found' };
const errNotAuth = { error: '401 - Not Authorized' }
const auth = true; // true => admin

const cartServerRoutes = (app) => {
  app.use('/api/carrito', router);

  // Agrega un nuevo carrito, lo devuelve con el id
  router.post('/', (req, res) => {
    const timestamp = moment().format('DD/MM/YYYY hh:mm:ss a');
    const obj = { timestamp, products: [] };
    const savedObj = cart.save(obj);
    savedObj.then(response => res.json(response)).catch(err => console.log('Error ->', err));
  })

  // Elimina carrito segun id
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const savedObj = cart.deleteById(id);
    savedObj.then(response => {
      if (response) {
        res.json(response);
      } else {
        res.json(errNotFound);
      }
    }).catch(err => console.log('Error ->', err));
  })

  // Devuelve lista de productos, según id de carrito
  router.get('/:id/productos', (req, res) => {
    const { id } = req.params;
    const object = cart.getById(id);
    object.then(response => {
      if (response) {
        res.json({ products: response.products });
      } else {
        res.json(errNotFound);
      }
    }).catch(err => console.log('Error ->', err));
  })

  // Incorpora producto al carrito con el id, por id_prod del producto
  router.post('/:id/productos', (req, res) => {
    const { id } = req.params;
    const { id_prod } = req.body;
    const getProduct = db.getById(id_prod);
    getProduct.then(productResponse => {
      if (productResponse) {
        const getCart = cart.getById(id);
        getCart.then(cartResponse => {
          if (cartResponse) {
            const updatedItemCart = cartResponse;
            updatedItemCart.products.push(productResponse);
            cart.updateById(id, updatedItemCart).then(updatedRes => res.json(updatedRes)).catch(err => console.log('Error ->', err));
          } else {
            res.json(errNotFound);
          }
        }).catch(err => console.log('Error ->', err));
      } else {
        res.json(errNotFound);
      }
    }).catch(err => console.log('Error ->', err));
  })

// Elimina producto del carrito segun id y id_prod
router.delete('/:id/productos/:id_prod', (req, res) => {
  const { id, id_prod } = req.params;
  const getCart = cart.getById(id);
  getCart.then(cartResponse => {
    if (cartResponse) {
      const cartItem = cartResponse;
      const productIndex = cartItem.products.findIndex(e => e.id == id_prod);
      if (productIndex >= 0) {
        cartItem.products.splice(productIndex, 1);
        cart.updateById(id, cartItem).then(updatedRes => res.json(updatedRes)).catch(err => console.log('Error ->', err));
      } else {
        res.json(errNotFound);
      }
    } else {
      res.json(errNotFound);
    }
  }).catch(err => console.log('Error ->', err));
})

}

module.exports = {
  cartServerRoutes
};