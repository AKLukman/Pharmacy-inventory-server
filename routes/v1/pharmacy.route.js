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
router.route("/pharmacy-medicine").get(pharmacyController.getMedicine);
router
  .route("/pharmacy-medicine/:id")
  .delete(pharmacyController.deleteMedicine);

// Stoke Store

router
  .route("/stock-store-id-check-not-required")
  .get(pharmacyController.getStokeStoreMedicineIdCeckNotRequired);

router
  .route("/stock-store-id-check-not-required/:id")
  .get(pharmacyController.getStokeMedicineDetails);

// Tunstall

router
  .route("/tunstall-store")
  .get(pharmacyController.getTunstallStoreMedicineIdCeckNotRequired);
router
  .route("/tunstall-store/:id")
  .get(pharmacyController.getTunstallMedicineDetails);

// Fenton
router.route("/fenton-store").get(pharmacyController.getFentonStoreMedicine);
router
  .route("/fenton-store/:id")
  .get(pharmacyController.getFentonMedicineDetails);

// Hanely store
router.route("/hanley-store").get(pharmacyController.getHanleyStoreMedicine);
router
  .route("/hanley-store/:id")
  .get(pharmacyController.getHanleyMedicineDetails);

// Longton store
router.route("/longton-store").get(pharmacyController.getLongtonStoreMedicine);
router
  .route("/longton-store/:id")
  .get(pharmacyController.getLongtonMedicineDetails);

// Sales
router
  .route("/sales")
  .post(pharmacyController.postSale)
  .get(pharmacyController.getSale);

// JWT token
router.route("/jwt").get(doctorsPortalController.getJWT);

// Post Users
router
  .route("/doctors-portal-users")
  .post(doctorsPortalController.postDoctorsPortalUsers)
  .get(doctorsPortalController.getAllUsers);

router.route("/users/admin/:email").get(doctorsPortalController.getAdmin);
router.route("/users/stuff/:email").get(doctorsPortalController.getStuff);
router
  .route("/doctors-portal-users/admin/:id")
  .put(doctorsPortalController.makeAdmin);

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

// post pharmacy user
router
  .route("/pharmacy-user")
  .post(pharmacyController.postPharmacyUser)
  .get(pharmacyController.getPharmacyUsers);

router
  .route("/pharmacy-user/:id")
  .delete(pharmacyController.deletePharmacyUser);
