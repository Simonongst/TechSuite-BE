const Equipment = require("../models/equipment")

const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find({});
    res.status(200).json(equipment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const createEquipment = async (req, res) => {
  try {
    const { type, unitCost, currency } = req.body;

    if (!type || !unitCost || !currency) {
      return res.status(400).json({
        success: false,
        message: 'Type, Unit Cost and Currency are required.',
      });
    }

    const equipmentExists = await Equipment.findOne({ type });
    if (equipmentExists) {
      return res.json({
        success: false,
        message: 'Equipment already exists.',
      });
    }

    const newEquipment = new Equipment({ type, unitCost, currency });
    const savedEquipment = await newEquipment.save();

    res.status(201).json({ success: true, data: savedEquipment });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const updateEquipment = async (req, res) => {
  try {
    const updatedEquipment = await Equipment.findByIdAndUpdate(
      req.params.equipmentId,
      req.body,
      { new: true }
    );

    if (!updatedEquipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found.',
      });
    }

    res.status(200).json({ success: true, data: updatedEquipment });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const deleteEquipment = async (req, res) => {
  try {
    const deletedEquipment = await Equipment.findById(
      req.params.equipmentId
    );

    if (!deletedEquipment) {
      return res.status(404).json({
        success: false,
        message: 'Equipment not found.',
      });
    }

    deletedEquipment.isActive = false;
    await deletedEquipment.save();

    res.status(200).json({ success: true, data: deletedEquipment });
  } catch (err) {
    res.status(500).json({ 
        success: false,
        err: err.message,
    });
  }
};

module.exports = {
  getAllEquipment,
  createEquipment,
  updateEquipment,
  deleteEquipment,
};