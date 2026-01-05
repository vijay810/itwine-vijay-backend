const router = require('express').Router();
const ctrl = require('../controllers/clients.controller');

router.post('/create-client', ctrl.create);
router.get('/', ctrl.getAll);

module.exports = router;
