const router = require("express").Router();

const MotorController = require("../controller/Motorcycle");
const upload = require("../middleware/uploader");

router.get("/", MotorController.getMotor);
router.post("/", upload.single("image"), MotorController.createMotor);
router.get("/:id", MotorController.getMotorById);
router.put("/:id", upload.single("image"), MotorController.updateMotor);
router.delete("/:id", MotorController.deleteMotorById);

module.exports = router;