const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
 
  
  Product.findAll()
  .then( products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
  })
})
  .catch( err => {
    console.log(err)
  })
  
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  

  Product.findByPk(prodId)
  .then((product) => {
    res.render('shop/product-detail', { 
      product: product , 
      pageTitle: product.title, 
      path: '/product'})
  })
  .catch(err => console.log(err))

 
}

exports.getIndex = (req, res, next) => {

  Product.findAll()
  .then( products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
})
  .catch( err => {
    console.log(err)
  })

  // Product.fetchAll()
  // .then(([rows, fieldData]) => {
  //   res.render('shop/index', {
  //     prods: rows,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   });
  // } )
  // .catch(err => console.log(err))

  
};

exports.getCart = (req, res, next) => {
 console.log(req.user.Cart);
  req.user.getCart()
  .then(cart => {
    return cart.getProducts()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => console.log(err));
  })
  
  .catch(err => console.log(err));

 
};

exports.postCart = (req, res, next) => {
   const prodId = req.body.productId;
   let fetchedCart;
   let newQuantity = 1 ;
   req.user.getCart()
   .then(cart => {
    fetchedCart = cart;
    return cart.getProducts( {where: { id: prodId} } );
   })
   .then(products => {
    let product;
    if(products.length > 0)
    {
      product = products[0];
    }
   
    if(product)
    {
      const oldQuantity = product.cartItem.quantity;
      newQuantity =  oldQuantity + 1;
      return product;
    }
    return Product.findByPk(prodId)  
   })
   .then(product => {
    return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
   })
   .then(() => {
    res.redirect('/cart');
   })
   .catch(err => console.log(err))
}


exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy(); 
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
}

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user.getCart()
    .then(cart => {

      if (!cart) {
        throw new Error('Cart not found for the user.');
      }

      fetchedCart = cart;

      return cart.getProducts();
    })
    .then(products => {
      if (!products || products.length === 0) {
        throw new Error('No products found in the cart.');
      }

      return req.user.createOrder()
        .then(order => {
          return order.addProducts(products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity };
            return product;
          }));
        });
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    .then( result => {
      console.log('Order processed successfully.');
      res.redirect('/orders');

    })
    .catch(err => {
      console.error('Error processing order:', err);
      res.status(500).send('Internal Server Error');
    });
};



exports.getOrders = (req, res, next) => {

  req.user.getOrders({include: ['products']})
  .then(orders => {
    console.log(orders)
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });

  })
  .catch(err => console.log(err))
};

