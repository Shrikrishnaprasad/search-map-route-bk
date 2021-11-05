const mongoose = require("mongoose");

const MapSchema = new mongoose.Schema(
  {
    mapId: { type: String, required: true },
    count: { type: Number, required: true, default: 0 },
    expireTime: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Map", MapSchema);
