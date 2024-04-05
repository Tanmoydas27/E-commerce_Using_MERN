const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    razorpay_orderID:{
        type: String,
    },
    razorpay_paymentID:{
        type: String,
    },
    razorpay_signature:{
        type: String,
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    quantity:{
        type: Number,
        required: true,
        default: 1
    },
    paymentAmount:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        
    },
    mobile:{
        type: Number,
        
    },
    status:{
        type:String,
        required: true
    }
},{timestamps: true}
);

module.exports = mongoose.model('orders',paymentSchema);