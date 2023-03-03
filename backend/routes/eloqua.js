const express = require("express");
const {test, getUserByEmail, preRegisterActivateScience, submitActivateScience, checkIfUserPreRegister, registerActivateScience} = require("../controllers/eloqua");

const router = express.Router();

router.post('/testEloqua', test);
router.post('/getUserByEmail', getUserByEmail);
router.post('/submitActivateScience', submitActivateScience);
router.post('/preRegisterActivateScience', preRegisterActivateScience);
router.post('/registerActivateScience', registerActivateScience);
router.post('/checkIfUserPreRegister', checkIfUserPreRegister);

module.exports = router;