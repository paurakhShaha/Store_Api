const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, 'Product name is required'] 
  },
  price:{
    type:Number,
    required:[true, 'Product price is required'],
    maxLength:[5, 'Product price cannot exceed 5 characters'],
    default:0.0
  },
  featured:{
    type:Boolean,
    default:false
  },

  rating:{
    type:Number,
    default:4.5
  },
  createdAt:{
    type:Date,
    default:Date.now
  },
  company:{
    type:String,
    enum:{
      values:[
        'ikea',
        'liddy',
        'caressa',
        'marcos'
      ],
      message:'Please select correct company for product'
    }
  },
  }
  


);

module.exports = mongoose.model('Product', productSchema);