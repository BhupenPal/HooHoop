const express = require('express');
const router = express.Router();

const SearchHandle = require('../controllers/Search.controller')
const { carsPaginator } = require("../controllers/RecordManager/Paginator");

router.get('/', SearchHandle.getCars);
router.get('/:page', carsPaginator, SearchHandle.getBuyCar);

module.exports = router;