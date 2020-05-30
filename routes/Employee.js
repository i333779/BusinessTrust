'use strict';
var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function (req, res) {
//     res.send('respond with a resource');
// });

router.get('/', function (req, res) {
    res.render('EmployeeForm');
});

const EmployeeController = require("../controllers/EmployeeFormController");
const controller = new EmployeeController();

router.post("/update", (req, res) => controller.update(req, res));

module.exports = router;
