const express = require("express");
const viewCount = require("../../middleware/viewCount");
const toolsController = require("../../controllers/tools.controller");
const { limiter } = require("../../middleware/limiter");
const { Router } = require("express");

const router = express.Router();

// manual routing
// router.get("/:id", (req, res) => {
//   res.send("tools found with id");
// });

// router.post("/", (req, res) => {});

// shortcut routing

router
  .route("/")

  .get(toolsController.getAllTools)

  .post(toolsController.saveAtool);

// Router level middle counting the views

router
  .route("/test")
  .post(toolsController.testPost)
  .get(toolsController.testGet);
router
  .route("/:id")
  .get(viewCount, limiter, toolsController.getToolsDetails)
  .patch(toolsController.updateTool)
  .delete(toolsController.deletePost);

module.exports = router;
