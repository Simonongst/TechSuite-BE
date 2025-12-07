const Equipment = require("../models/equipment")

const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find({});
    res.status(200).json(equipment);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};