const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: [
        'desktop',
        'laptop',
        'monitor',
        'desk_phone',
        'network_switch',
        'ethernet_cable',
      ],
    },
    label: {
      type: String,
      required: true,
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
  },
  { timestamps: true }
);

const Equipment = mongoose.model('Equipment', equipmentSchema);

module.exports = Equipment;
