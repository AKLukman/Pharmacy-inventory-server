const { query } = require("express");
const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getAppointmentOptions = async (req, res, next) => {
  try {
    const db = getDb();
    const result = await db
      .collection("appointmentOptiuons")
      .find({})
      .toArray();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
// { $or: [{ dob: { $regex: req.params.dob } }] }
module.exports.getUser = async (req, res, next) => {
  try {
    const db = getDb();
    const { dob } = req.params;
    const result = await db.collection("usesrs").findOne({ dob });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports.getUserHanley = async (req, res, next) => {
  try {
    const db = getDb();
    const { dob, store } = req.params;
    const result = await db.collection("usesrs").findOne({ dob, store });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllMedicine = async (req, res, next) => {
  try {
    const db = getDb();
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    let query = {};
    const search = req.query.search;

    if (search.length) {
      query = { $or: [{ drugName: { $regex: search } }] };
      const medicine = await db.collection("allMedicine").find(query).toArray();
      res.send({ medicine });
    } else {
      const result = db.collection("allMedicine").find(query);
      const medicine = await result
        .skip(page * size)
        .limit(size)
        .toArray();
      const count = await db.collection("allMedicine").estimatedDocumentCount();
      res.send({ count, medicine });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getStokeStoreMedicine = async (req, res, next) => {
  try {
    const db = getDb();
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const search = req.query.search;
    let query = {};
    if (search.length) {
      query = {
        availabilityStoke: "Y ",
        $or: [{ drugName: { $regex: search } }],
      };
      const medicine = await db.collection("allMedicine").find(query).toArray();
      res.send({ medicine });
    } else {
      const result = db
        .collection("allMedicine")
        .find({ availabilityStoke: "Y " });
      const medicine = await result
        .skip(page * size)
        .limit(size)
        .toArray();
      const countAvailbility = await db
        .collection("allMedicine")
        .find({ availabilityStoke: "Y " })
        .toArray();
      // .estimatedDocumentCount();

      const count = countAvailbility.length;
      res.send({ count, medicine });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateMedicineStock = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not a valid tool id" });
    }

    const medicine = await db.collection("allMedicine").updateOne(
      { _id: ObjectId(id) },
      {
        $inc: {
          stock: -1,
        },
      }
    );
    if (!medicine.modifiedCount) {
      res.status(400).json({
        success: false,
        error: "Couldn't updated Medicine with the id",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Successfully updated the Medicine" });
  } catch (error) {
    next(error);
  }
};

module.exports.testGet = async (req, res, next) => {
  const db = getDb();
  const result = await db.collection("test").find({}).toArray();
  res.json(result);
  console.log(result);
};
