const express = require("express");
const viewCount = require("../../middleware/viewCount");
const pharmacyController = require("../../controllers/pharmacy.controller");
const doctorsPortalController = require("../../controllers/doctorsPortal.controller");
const { limiter } = require("../../middleware/limiter");
const { Router } = require("express");
const { verifyToken } = require("../../middleware/verifyToken");

const router = express.Router();

// Pharmacy Users
router.route("/user/:dob").get(pharmacyController.getUser);
router.route("/users/:dob").get(pharmacyController.getAllUsers);
router.route("/userHanley/:dob/:store").get(pharmacyController.getUserHanley);

// Allmedicine
router.route("/allmedicine").get(pharmacyController.getAllMedicine);
router.route("/allmedicine/:id").patch(pharmacyController.updateMedicineStock);

// Stoke Store
router.route("/stock-store").get(pharmacyController.getStokeStoreMedicine);
router
  .route("/stock-store-id-check-not-required")
  .get(pharmacyController.getStokeStoreMedicineIdCeckNotRequired);

// Tunstall
router
  .route("/tunstall-store")
  .get(pharmacyController.getTunstallStoreMedicine);
router
  .route("/tunstall-store-id-check-not-required")
  .get(pharmacyController.getTunstallStoreMedicineIdCeckNotRequired);

// Fenton
router.route("/fenton-store").get(pharmacyController.getFentonStoreMedicine);
router
  .route("/fenton-store-id-check-not-required")
  .get(pharmacyController.getFentonStoreMedicineIdCeckNotRequired);

// Doctors portal Users

// JWT token
router.route("/jwt").get(doctorsPortalController.getJWT);

// Post Users
router
  .route("/doctors-portal-users")
  .post(doctorsPortalController.postDoctorsPortalUsers)
  .get(doctorsPortalController.getAllUsers);

router
  .route("/doctors-portal-users/admin/:id")
  .put(doctorsPortalController.makeAdmin);

router.route("/users/admin/:email").get(doctorsPortalController.getAdmin);

// Appointment
router
  .route("/appointmentOptions")
  .get(pharmacyController.getAppointmentOptions);
router.route("/doctor-specialty").get(doctorsPortalController.getSpecialtyName);

// Bookings
router
  .route("/booking")
  .post(doctorsPortalController.postBookings)
  .get(doctorsPortalController.getBookings);

module.exports = router;

// doctors
router
  .route("/doctors")
  .post(doctorsPortalController.postDoctor)
  .get(doctorsPortalController.getDoctors);

router.route("/doctors/:id").delete(doctorsPortalController.deleteDoctor);
