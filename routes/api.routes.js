const router = require('express').Router();
const queryHandler = require('../controllers/queryController');
const { routeProtect } = require('../controllers/authController');

router.post('/contact-query', queryHandler.handleQuery);
router.get('/contact-query', routeProtect, queryHandler.fetchAllQueries);

module.exports = router;
