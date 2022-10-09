const router = require('express').Router();
const queryHandler = require('../controllers/queryController');

router.post('/contact-query', queryHandler.handleQuery);
router.get('/contact-query', queryHandler.fetchAllQueries);

module.exports = router;
