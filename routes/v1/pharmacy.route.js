const express = require("express");
const viewCount = require("../../middleware/viewCount");
const pharmacyController = require("../../controllers/pharmacy.controller");
const { limiter } = require("../../middleware/limiter");
const { Router } = require("express");

const router = express.Router();

router
  .route("/appointmentOptions")
  .get(pharmacyController.getAppointmentOptions);
router.route("/allmedicine").get(pharmacyController.getAllMedicine);
router.route("/stock-store").get(pharmacyController.getStokeStoreMedicine);

router.route("/allmedicine/:id").patch(pharmacyController.updateMedicineStock);

router.route("/user/:dob").get(pharmacyController.getUser);
router.route("/userHanley/:dob/:store").get(pharmacyController.getUserHanley);

module.exports = router;
