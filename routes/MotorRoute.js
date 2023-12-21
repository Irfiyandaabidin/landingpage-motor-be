const router = require("express").Router();

const MotorController = require("../controller/Motorcycle");

router.get("/", MotorController.getMotor);
router.post("/", MotorController.createMotor);
router.get("/:id", MotorController.getMotorById);
router.put("/:id", MotorController.updateMotor);
router.delete("/:id", MotorController.deleteMotorById);

module.exports = router;