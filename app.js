const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
// const User =  require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cors());

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//     User.findById('669f0b7d9e4a47cf464d4102')
//     .then(user => {
//         req.user = new User(user.name, user.email, user.cart, user._id);
//         next();

//     })
//     .catch(err => {
//         console.log(err);
//         next();
//     });
// })

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);


mongoose
.connect('mongodb+srv://sagars:sagarhero143@sagars.gpcupps.mongodb.net/shop?retryWrites=true&w=majority&appName=sagars')
.then(result => {
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});