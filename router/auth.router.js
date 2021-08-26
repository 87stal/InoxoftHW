const {  getLogForm, login, getRegForm, createUser } = require("../controllers/auth.controller");

const router = require('express').Router();
   

router.get('/log', getLogForm);

router.post('/log', login);

router.get('/reg', getRegForm);

router.post('/reg', createUser);


module.exports = router;