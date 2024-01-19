// const db = require('../util/database')

// const Cart = require('./cart');





// module.exports = class Product {
//   constructor(id,title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//    return db.execute('INSERT INTO products (title,price,imageUrl,description) VALUES (?,?,?,?)',
//    [this.title,this.price, this.imageUrl,this.description]
//    );
//   }
  
//   static deleteProductById(id) {
//    return db.execute('DELETE FROM products WHERE id= ?',
//    [id])
//   }

//   static fetchAll(cb) {
//       return  db.execute('SELECT * FROM products');
//     }

//   static findById(id, cb)
//   {
//    return db.execute('SELECT * FROM products WHERE id= ?',
//     [id])
//   }
// };


const Sequelize = require('sequelize');

const sequelize = require ('../util/database');

const Product = sequelize.define('product',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull:false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
})


module.exports = Product;