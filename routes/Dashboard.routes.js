const express = require("express");
const router = express.Router();

const DashboardController = require("../controllers/Dashboard.controller");

router.get("/", DashboardController.getDashboard);
router.get("/:sec", DashboardController.getAllDashboard);

router.post("/profile", DashboardController.postProfile);

router.post("/password-reset", DashboardController.patchPassword);

router.get("/listings/my", DashboardController.getMyAds);
router.get("/all-listings/complete", DashboardController.getAllAds);

router.get("/user-management/list", DashboardController.getUserList);
router.post("/user/delete", DashboardController.deleteUser);

router.get("/client-management/testdrives", DashboardController.getTestDrive);
router.get(
  "/client-management/availcheck",
  DashboardController.getAvailability
);
router.get("/client-management/shipenq", DashboardController.getShipEnq);

router.get(
  "/all-client-management/testdrives-all",
  DashboardController.getAllTestDrive
);
router.get(
  "/all-client-management/availcheck-all",
  DashboardController.getAllAvailability
);
router.get(
  "/all-client-management/shipenq-all",
  DashboardController.getAllShipEnq
);

router.post("/testdrive/delete", DashboardController.deleteTestDrive);
router.post("/availability/delete", DashboardController.deleteAvail);
router.post("/shipment/delete", DashboardController.deleteShip);

router.post("/testdrive/update", DashboardController.updateTestDrive);
router.post("/availability/update", DashboardController.updateAvail);
router.post("/shipment/update", DashboardController.updateShip);

router.get("/offers/coupon", DashboardController.getCoupons);

module.exports = router;
