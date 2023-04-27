const { query } = require("express");
const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");
const jwt = require("jsonwebtoken");

module.exports.getJWT = async (req, res, next) => {
  try {
    const db = getDb();
    const email = req.query.email;
    const query = { email };
    const user = await db.collection("usersCollections").findOne(query);
    if (user) {
      const token = jwt.sign({ user }, process.env.ACESS_TOKEN, {
        expiresIn: "1h",
      });
      res.send({ accessToken: token });
    }
    res.status(403).send({ accessToken: "" });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const db = getDb();
    const query = {};
    const result = await db
      .collection("usersCollections")
      .find(query)
      .toArray();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

module.exports.makeAdmin = async (req, res, next) => {
  try {
    const db = getDb();

    const email = req.headers.email;
    console.log(email);
    const query = { email: email };

    const user = await db.collection("usersCollections").findOne(query);
    console.log(user);
    if (user?.role !== "admin") {
      res.status(403).send({ message: "Forbidden" });
    } else {
      const id = req.params.id;
      const filter = { _id: ObjectId(id) };
      const options = { $upsert: true };

      const updatedDoc = {
        $set: {
          role: "admin",
        },
      };
      const result = await db
        .collection("usersCollections")
        .updateOne(filter, updatedDoc, options);
      res.send(result);
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getAdmin = async (req, res, next) => {
  try {
    const db = getDb();
    const email = req.params.email;
    console.log(email);
    const query = { email: email };
    const user = await db.collection("usersCollections").findOne(query);
    res.send({ isAdmin: user?.role === "admin" });
  } catch (error) {
    next(error);
  }
};

module.exports.postDoctorsPortalUsers = async (req, res, next) => {
  try {
    const db = getDb();
    const user = req.body;
    const result = await db.collection("usersCollections").insertOne(user);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

module.exports.getBookings = async (req, res, nex) => {
  const db = getDb();
  const email = req.query.email;
  // const decodedEmail = req.decoded.email;
  // if (email !== decodedEmail) {
  //   res.status(403).send({ message: "Forbidden access" });
  // }
  const query = {
    email: email,
  };
  const result = await db
    .collection("bookingCollections")
    .find(query)
    .toArray();
  res.send(result);
};

module.exports.postBookings = async (req, res, next) => {
  try {
    const db = getDb();
    const booking = req.body;
    console.log(booking);
    const query = {
      bookingDate: booking.bookingDate,
      email: booking.email,
      treatment: booking.treatment,
    };

    const alreadyBooked = await db
      .collection("bookingCollections")
      .find(query)
      .toArray();

    if (alreadyBooked.length) {
      const message = `You already have an booking on ${booking.bookingDate}`;
      return res.send({ acknowleged: false, message });
    }
    const result = await db.collection("bookingCollections").insertOne(booking);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

module.exports.getSpecialtyName = async (req, res, next) => {
  try {
    const db = getDb();
    const query = {};
    const result = await db
      .collection("appointmentOptiuons")
      .find(query)
      .project({ name: 1 })
      .toArray();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

// Doctors
module.exports.postDoctor = async (req, res, next) => {
  try {
    const db = getDb();
    const doctor = req.body;
    const result = await db.collection("doctorsCollection").insertOne(doctor);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

module.exports.getDoctors = async (req, res, next) => {
  try {
    const db = getDb();
    const query = {};
    const result = await db
      .collection("doctorsCollection")
      .find(query)
      .toArray();
    res.send(result);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteDoctor = async (req, res, next) => {
  try {
    const db = getDb();
    const id = req.params.id;
    const filter = { _id: ObjectId(id) };
    const result = await db.collection("doctorsCollection").deleteOne(filter);
    res.send(result);
  } catch (error) {
    next(error);
  }
};
