const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema(
  {
    code: { 
        type: String, 
        required: true, 
        unique: true,
    },
    label: { 
        type: String, 
        required: true,
    },
    rateToBase: { 
        type: Number, 
        required: true,
    },
    isActive: { 
        type: Boolean, 
        default: true,
    },
  },
  { timestamps: true }
);

const Currency = mongoose.model('Currency', currencySchema);

module.exports = Currency;
