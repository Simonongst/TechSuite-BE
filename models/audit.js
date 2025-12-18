const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    isComplete: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Audit = mongoose.model('Audit', auditSchema);

module.exports = Audit;
