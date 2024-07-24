const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const mongoConnect = require('./util/database').mongoConnect;
const User =  require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cors());

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('66a11d9ef9a2cb5bfe50731d')
    .then(user => {
        req.user = user;
        next();

    })
    .catch(err => {
        console.log(err);
        next();
    });
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);


mongoose
.connect('mongodb+srv://sagars:sagarhero143@sagars.gpcupps.mongodb.net/shop?retryWrites=true&w=majority&appName=sagars')
.then(result => {
    User.findOne()
    .then(user => {
        if(!user){
            const user = new User({
                name: 'Sagar Sethi',
                email: 'sagar@gmail.com',
                cart: {
                    items:[]
                }
            })
            user.save();
        }
    })
    
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});