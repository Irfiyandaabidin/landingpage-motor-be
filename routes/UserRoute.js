const router = require("express").Router();

const UserController = require("../controller/User");
const auth = require("../middleware/auth");

router.get("/", UserController.getUser);
router.get("/me", auth, UserController.authMe);
router.post("/", UserController.createUser);
router.post("/login", UserController.login);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUserById);

module.exports = router;