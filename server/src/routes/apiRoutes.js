const express = require("express");
const authMiddleware = require("../middleware/auth");
const scheduleController = require("../controllers/scheduleController");
const categoriesController = require("../controllers/categoriesController");

const router = express.Router();

router.get("/categories", authMiddleware, categoriesController.categories);
router.post("/addCategory", authMiddleware, categoriesController.addCategory);
router.delete("/deleteCategory", categoriesController.deleteCategory);

router.post("/addSchedule", authMiddleware, scheduleController.addSchedule);
router.post("/getTimeSlot", authMiddleware, scheduleController.getTimeSlot);
router.post(
  "/getUserSchedule",
  authMiddleware,
  scheduleController.getUserSchedule
);
router.get(
  "/getAllBookings",
  authMiddleware,
  scheduleController.getAllBookings
);
router.put("/updateBooking", authMiddleware, scheduleController.updateBooking);
router.delete(
  "/deleteBooking",
  authMiddleware,
  scheduleController.deleteBooking
);

module.exports = router;
