const router = require('express').Router();

const loanController = require('../controller/loan');
const customerController = require('../controller/customer');

//create a customer
router.post('/customer', customerController.createCustomer);


// LEND API
router.post('/lend', loanController.lend);

// PAYMENT API
router.post('/payment', loanController.makePayment);

// LEDGER API
router.get('/ledger/:loan_id', loanController.getLedger);

// ACCOUNT OVERVIEW API
router.get('/account/:customer_id', loanController.getAccountOverview);

module.exports = router;