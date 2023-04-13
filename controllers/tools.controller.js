const { query } = require("express");
const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getAllTools = async (req, res, next) => {
  try {
    const db = getDb();
    const { limit, page } = req.query;
    const tool = await db
      .collection("tools")
      .find()
      // .project({ _id: 0 })
      .skip(Number(page * limit))
      .limit(+limit)
      .toArray();
    res.status(200).json({ success: true, data: tool });
  } catch (error) {
    next(error);
  }
};

module.exports.saveAtool = async (req, res, next) => {
  try {
    const db = getDb();
    const tool = req.body;
    const result = await db.collection("tools").insertOne(tool);
    console.log(result);

    if (!result.insertedId) {
      return res.status(400).send({
        status: false,
        error: "Went someThing wrong",
      });
    }
    res.send({
      success: true,
      message: `Tool added with id ${result.insertedId}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getToolsDetails = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not a valid tool id" });
    }

    const tool = await db.collection("tools").findOne({ _id: ObjectId(id) });
    if (!tool) {
      res
        .status(400)
        .json({ success: false, error: "Couldn't find tool with id" });
    }
    res.status(200).json({ success: true, data: tool });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTool = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not a valid tool id" });
    }

    const tool = await db
      .collection("tools")
      .updateOne({ _id: ObjectId(id) }, { $set: req.body });
    if (!tool.modifiedCount) {
      res
        .status(400)
        .json({ success: false, error: "Couldn't updated tool with the id" });
    }
    res
      .status(200)
      .json({ success: true, message: "Successfully updated the tool" });
  } catch (error) {
    next(error);
  }
};

module.exports.deletePost = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not a valid tool id" });
    }

    const tool = await db.collection("tools").deleteOne({ _id: ObjectId(id) });
    if (!tool.deletedCount) {
      res
        .status(400)
        .json({ success: false, error: "Couldn't delete the tool" });
    }
    res.status(200).json({ success: true, message: "Successfully deleted!" });
  } catch (error) {
    next(error);
  }
};

module.exports.testPost = async (req, res, next) => {
  for (let i = 0; i < 100000; i++) {
    const db = getDb();
    const result = await db
      .collection("test")
      .insertOne({ name: `test ${i}`, age: i });
  }
};

module.exports.testGet = async (req, res, next) => {
  const db = getDb();
  const result = await db.collection("test").find({ age: 9999 }).toArray();
  res.json(result);
  console.log(result);
};
