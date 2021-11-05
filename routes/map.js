const router = require("express").Router();
const Map = require("../models/Map");

router.post("/route", async (req, res) => {
  try {
    const maps = await Map.findOne({ mapId: req.body.mapId });
    if (!maps) {
      const newMap = new Map({
        mapId: req.body.mapId,
        count: 1,
        expireTime: Date.now() + 60000,
      });
      const map = await newMap.save();
      res.status(200).json({ message: map.count, mapId: map.mapId });
    } else if (maps) {
      if (maps.expireTime > Date.now()) {
        if (maps.count < 5) {
          const updMap = await Map.findByIdAndUpdate(
            { _id: maps._id },
            { $inc: { count: 1 } },
            { new: true }
          );
          res.status(200).json({ message: updMap.count });
        } else {
          res.status(200).json({ message: 6 });
        }
      } else {
        const updMap = await Map.findByIdAndUpdate(
          { _id: maps._id },
          { count: 1, expireTime: Date.now() + 60000 },
          { new: true }
        );
        res.status(200).json({ message: updMap.count });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
