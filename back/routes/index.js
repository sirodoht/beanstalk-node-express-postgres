/**
 * @file Routes file.
 */

const express = require('express');
const router = express.Router();

const indexCtrl = require('../controllers/index.ctrl');

router.get('/', indexCtrl.getIndex);

module.exports = router;
