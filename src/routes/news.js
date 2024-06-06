const express = require('express');
const router = express.Router();

const newsController = require('../app/controller/NewsController');

router.get('/:SLUG', newsController.show);
router.get('/', newsController.index);

module.exports = router;
