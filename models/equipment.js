const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        'Desktop',
        'Laptop',
        'Monitor',
        'Desk Phone',
        'Network Switch - 24 Ports',
        'Network Switch - 48 Ports',
        'Ethernet Cable',
      ],
    },
    unitCost: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Currency',
      required: true,
    },
    isActive: { 
        type: Boolean, 
        default: true,
    },    
  },
  { timestamps: true }
);

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
