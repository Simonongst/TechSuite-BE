const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  unitCost: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
});

const recordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    form: {
      currency: {
        type: String,
        required: true,
      },
      employees: {
        type: Number,
        required: true,
      },
      desktop: {
        type: Number,
        required: true,
      },
      laptop: {
        type: Number,
        required: true,
      },
      monitor: {
        type: Number,
        required: true,
      },
      deskPhone: {
        type: Number,
        required: true,
      },
      switchPorts: {
        type: String,
        required: true,
      },
    },
    summary: {
      items: [itemSchema],
      total: {
        type: Number,
        required: true,
      },
      totalItems: {
        type: Number,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;

