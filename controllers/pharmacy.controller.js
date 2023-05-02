const { query } = require("express");
const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getAppointmentOptions = async (req, res, next) => {
  try {
    const db = getDb();
    const date = req.query.date;
    console.log(date);
    const result = await db
      .collection("appointmentOptiuons")
      .find({})
      .toArray();

    // Get the bookings of the provided date
    const bookingQuery = {
      bookingDate: date,
    };

    const alreadyBooked = await db
      .collection("bookingCollections")
      .find(bookingQuery)
      .toArray();

    console.log(alreadyBooked);

    //

    result.forEach((options) => {
      const optionBooked = alreadyBooked.filter(
        (book) => book.treatment === options.name
      );

      const bookedSlot = optionBooked.map((book) => book.slot);
      const reamainingSlots = options.slots.filter(
        (slot) => !bookedSlot.includes(slot)
      );
      options.slots = reamainingSlots;
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
// { $or: [{ dob: { $regex: req.params.dob } }] }
// Users
module.exports.getUser = async (req, res, next) => {
  try {
    const db = getDb();
    const { dob } = req.params;
    console.log(dob);
    const result = await db.collection("usesrs").findOne({ dob });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const db = getDb();
    const { dob } = req.params;
    const result = await db.collection("usesrs").find({ dob }).toArray();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Hanley Users
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
      query = {
        $or: [{ drugName: { $regex: search } }],
      };
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

// Stoke store
module.exports.getStokeStoreMedicineIdCeckNotRequired = async (
  req,
  res,
  next
) => {
  try {
    const db = getDb();
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const search = req.query.search;
    let query = {};
    if (search.length) {
      query = {
        availabilityStoke: "Y ",
        $or: [
          { drugName: { $regex: search, $options: "i" } },
          {
            condition: { $regex: search, $options: "i" },
          },
        ],
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
module.exports.getStokeMedicineDetails = async (req, res, next) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const query = { _id: ObjectId(id) };

    const result = await db.collection("allMedicine").findOne(query);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

// Tunstall Store
module.exports.getTunstallStoreMedicineIdCeckNotRequired = async (
  req,
  res,
  next
) => {
  try {
    const db = getDb();
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const search = req.query.search;
    let query = {};
    if (search.length) {
      query = {
        availabilityTunstall: "Y",
        $or: [
          { drugName: { $regex: search, $options: "i" } },
          {
            condition: { $regex: search, $options: "i" },
          },
        ],
      };
      const medicine = await db.collection("allMedicine").find(query).toArray();
      res.send({ medicine });
    } else {
      const result = db.collection("allMedicine").find({
        availabilityTunstall: "Y",
      });
      const medicine = await result
        .skip(page * size)
        .limit(size)
        .toArray();
      const countAvailbility = await db
        .collection("allMedicine")
        .find({
          availabilityTunstall: "Y",
        })
        .toArray();
      // .estimatedDocumentCount();

      const count = countAvailbility.length;
      res.send({ count, medicine });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getTunstallMedicineDetails = async (req, res, next) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const query = { _id: ObjectId(id) };

    const result = await db.collection("allMedicine").findOne(query);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

// Fenton Store

module.exports.getFentonStoreMedicine = async (req, res, next) => {
  try {
    const db = getDb();
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const search = req.query.search;
    let query = {};
    if (search.length) {
      query = {
        availabilityFenton: "Y",

        $or: [
          { drugName: { $regex: search, $options: "i" } },
          {
            condition: { $regex: search, $options: "i" },
          },
        ],
      };
      const medicine = await db.collection("allMedicine").find(query).toArray();
      res.send({ medicine });
    } else {
      const result = db.collection("allMedicine").find({
        availabilityFenton: "Y",
      });
      const medicine = await result
        .skip(page * size)
        .limit(size)
        .toArray();
      const countAvailbility = await db
        .collection("allMedicine")
        .find({
          availabilityFenton: "Y",
        })
        .toArray();
      // .estimatedDocumentCount();

      const count = countAvailbility.length;
      res.send({ count, medicine });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getFentonMedicineDetails = async (req, res, next) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const query = { _id: ObjectId(id) };

    const result = await db.collection("allMedicine").findOne(query);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

// Hanley Store

module.exports.getHanleyStoreMedicine = async (req, res, next) => {
  try {
    const db = getDb();
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const search = req.query.search;
    let query = {};
    if (search.length) {
      query = {
        availabilityHanley: "Y",

        $or: [
          { drugName: { $regex: search, $options: "i" } },
          {
            condition: { $regex: search, $options: "i" },
          },
        ],
      };
      const medicine = await db.collection("allMedicine").find(query).toArray();
      res.send({ medicine });
    } else {
      const result = db.collection("allMedicine").find({
        availabilityHanley: "Y",
      });
      const medicine = await result
        .skip(page * size)
        .limit(size)
        .toArray();
      const countAvailbility = await db
        .collection("allMedicine")
        .find({
          availabilityHanley: "Y",
        })
        .toArray();
      // .estimatedDocumentCount();

      const count = countAvailbility.length;
      res.send({ count, medicine });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getHanleyMedicineDetails = async (req, res, next) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const query = { _id: ObjectId(id) };

    const result = await db.collection("allMedicine").findOne(query);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

// Longton

module.exports.getLongtonStoreMedicine = async (req, res, next) => {
  try {
    const db = getDb();
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);
    const search = req.query.search;
    let query = {};
    if (search.length) {
      query = {
        availabilityLongton: "Y",

        $or: [
          { drugName: { $regex: search, $options: "i" } },
          {
            condition: { $regex: search, $options: "i" },
          },
        ],
      };
      const medicine = await db.collection("allMedicine").find(query).toArray();
      res.send({ medicine });
    } else {
      const result = db.collection("allMedicine").find({
        availabilityLongton: "Y",
      });
      const medicine = await result
        .skip(page * size)
        .limit(size)
        .toArray();
      const countAvailbility = await db
        .collection("allMedicine")
        .find({
          availabilityLongton: "Y",
        })
        .toArray();
      // .estimatedDocumentCount();

      const count = countAvailbility.length;
      res.send({ count, medicine });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getLongtonMedicineDetails = async (req, res, next) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const query = { _id: ObjectId(id) };

    const result = await db.collection("allMedicine").findOne(query);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

// Post sale

module.exports.postSale = async (req, res, next) => {
  try {
    const db = getDb();
    const sale = req.body;
    const result = await db.collection("saleCollections").insertOne(sale);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
// getSales
module.exports.getSale = async (req, res, next) => {
  try {
    const db = getDb();
    const result = await db.collection("saleCollections").find({}).toArray();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

// Update stock

module.exports.updateMedicineStock = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const quantity = req.headers.quantity;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not a valid tool id" });
    }

    const medicine = await db.collection("allMedicine").updateOne(
      { _id: ObjectId(id) },
      {
        $inc: {
          stock: -quantity,
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
