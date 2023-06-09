const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const {checkForbidenString} = require('../validators');


const productSchema = new Schema({
    slug: {
     type: String,
     required: [true, 'Pole slug jest wymagane'],
     minLength: [3, 'Min liczba znaków to 3'],
     validate: value => checkForbidenString(value, 'slug'),
     trim: true,
     lowercase: true
    },
    name: {
     type: String,
     required: [true, 'Pole name jest wymagane'],
     minLength: [3, 'Min liczba znaków to 3']
    },
    price: {
     type: Number,
     required: [true, 'Pole cena jest wymagane'],
    },
    category: {
      type: String
    },
     //enum: ['Sukienki', 'Bluzki', 'Spodnie', 'Spódnice', 'Kurtki', 'Płaszcze', 'Swetry', 'Akcesoria', 'Dla domu', 'Inne'],
     //required: [true, 'Pole Kategoria jest wymagane'],
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    description:{
      type: String
    },

    image: String
  
 });

 productSchema.pre('save', function(next) {
    let product = this;
    product.slug = product.slug.replace(/ /g, "");
    next();
})
 const Product = mongoose.model('Product', productSchema)
 

 

 module.exports = Product
 