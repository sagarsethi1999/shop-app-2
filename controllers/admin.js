const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false

  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  }).then( result => {
    console.log('Created Product');
  })
  .catch( err => {
    console.log(err);
  })
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product( prodId,updatedTitle,updatedImageUrl,updatedDescription,updatedPrice)

  updatedProduct.save()
  .then(() => {
    res.redirect('/admin/products')
  })
  .catch(err => console.log(err));

  // res.redirect('/admin/products')
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/');
  }

  const prodId = req.params.productId;

  Product.findById(prodId)
  .then(result => {
    console.log(result); // Check the format of the result
    const [product] = result;
    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      product: product[0],
      pageTitle: 'Edit Product',
      editing: editMode,
      path: '/admin/edit-product'
    });
  })
  .catch(err => {
    console.log(err);
    res.redirect('/');
  });
};



  // Product.findById(prodId, product => {
  //   if(!product)
  //   {
  //     return res.redirect('/');
  //   }
  //   res.render('admin/edit-product', {
  //     pageTitle: 'Edit Product',
  //     path: '/admin/edit-product',
  //     editing: editMode,
  //     product: product 
  // });
  // });


exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([rows, fieldData]) => {
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  } )
  .catch(err => console.log(err))

  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  
  Product.deleteProductById(productId)
  .then(() => {
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err));

  
};