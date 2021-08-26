
const { getUserById, getAllUsers } = require("../controllers/user.controller");

const router = require('express').Router();


router.get('/:user_id', getUserById);

router.get('/', getAllUsers);



module.exports = router;
