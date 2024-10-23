const Loan = require('../model/loan');
const Transaction = require('../model/transaction');

// {
//     "customer_id": "6717f18958a23ba5f1704d40",
//         "loan_amount": 5000,
//             "loan_period": { "year": 3, "months": 0 },
//     "rate_of_interest": 5.5,
//         "payment_type": "EMI"
// }

exports.lend = (req, res) => {

    // Interest = P * N * I / 100
    // Total Amount(A) = P + Interest
    // EMI calculation:
    // EMI = (P + Interest) / N
    // P = loan amount
    // N = loan period (in years)
    // I = rate of interest
    let interest = req.body.loan_amount * (req.body.loan_period.years + req.body.loan_period.months / 12) * req.body.rate_of_interest / 100;
    console.log(interest);
    let total_amount = (+req.body.loan_amount) + (+interest);
    console.log(total_amount);
    let emi_amount = total_amount / (req.body.loan_period.years * 12 + req.body.loan_period.months);
    console.log(req.body);
    const loan = new Loan({
        customer_id: req.body.customer_id,
        loan_amount: req.body.loan_amount,
        loan_period: {
            years: req.body.loan_period.years ? req.body.loan_period.years : 0,
            months: req.body.loan_period.months ? req.body.loan_period.months : 0
        },
        loanIssueDate: req.body.loanIssueDate ? req.body.loanIssueDate : new Date(),
        paid_amount: 0,
        rate_of_interest: req.body.rate_of_interest,
        total_amount: total_amount,
        emi_amount: emi_amount,
        remaining_amount: total_amount,
        number_of_emis: 0,
        remaining_balance: total_amount,
    });

    loan.save().then(data => {
        return res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Loan."
        });
    });
}


// {
//     "loan_id": "loan-unique-id",       // Unique identifier of the loan
//         "amount": 1500.45,                 // Amount to be paid
//             "payment_type": "EMI"              // Payment type: either "EMI" or "LUMP_SUM"
// }



const calculateEMI = (principal, annualRate, remainingMonths) => {
    const monthlyRate = annualRate / (12 * 100);
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, remainingMonths)) /
        (Math.pow(1 + monthlyRate, remainingMonths) - 1);
};
// PAYMENT API: Make a payment for a loan
/**
 * Make a payment for a loan
 * @api {post} /loan/:loan_id/pay
 * @apiName makePayment
 * @apiGroup Loan
 * @apiParam {String} loan_id Loan's unique ID.
 * @apiParam {Number} amount Amount being paid.
 * @apiParam {String} payment_type Type of payment (EMI/LUMPSUM)
 * @apiSuccess {Object} transaction Transaction object
 * @apiSuccess {Object} loan Loan object
 * @apiError {Object} 500 Error processing payment
 */
exports.makePayment = async (req, res) => {
    try {
        const { loan_id, amount, payment_type } = req.body;

        // Find the loan
        const loan = await Loan.findById(loan_id);
        if (!loan) return res.status(404).json({ message: 'Loan not found' });

        // Update the loan details based on payment type
        if (payment_type === 'EMI') {
            loan.paid_emis += 1;
            loan.paid_amount += loan.emi_amount;
            loan.remaining_balance -= loan.emi_amount;
        } else {
            const newEMI = calculateEMI(
                loan.loan_amount,
                loan.rate_of_interest,
                loan.loan_period.years * 12 + loan.loan_period.months - loan.paid_emis
            );
            loan.emi_amount = newEMI;
            loan.paid_amount += amount;
            loan.remaining_balance -= amount;
        }

        // Save the updated loan
        await loan.save();

        // Create a transaction record
        const newTransaction = new Transaction({
            loanId: loan.loan_id,
            customerId: loan.customer_id,
            amount,
            type: payment_type
        });

        await newTransaction.save();
        loan.transactions.push(newTransaction._id);
        loan.save();
        res.status(200).json({ message: 'Payment successful', transaction: newTransaction, loan });
    } catch (error) {
        res.status(500).json({ message: 'Error processing payment', error: error.message });
    }
};




// LEDGER API: Get all transactions for a specific loan

/**
 * Get the ledger for a loan
 * @api {get} /loan/:loan_id/ledger
 * @apiName getLedger
 * @apiGroup Loan
 * @apiParam {String} loan_id Loan's unique ID.
 * @apiSuccess {Object} ledger Ledger object with loan and transaction details
 * @apiError {Object} 500 Error retrieving ledger
 */
exports.getLedger = async (req, res) => {

    try {
        const { loan_id } = req.params;
        console.log(loan_id);
        // Find the loan
        const loan = await Loan.findById(loan_id);
        if (!loan) return res.status(404).json({ message: 'Loan not found' });

        // Find all transactions related to this loan
        const transactions = await Transaction.findById(loan.transactions);

        // Return ledger details
        res.status(200).json({
            loan_id: loan.loan_id,
            loan_amount: loan.loan_amount,
            total_amount: loan.total_amount,
            customer_id: loan.customer_id,
            transactions,
            remaining_balance: loan.remaining_balance,
            emi_amount: loan.emi_amount,
            amount_paid: loan.paid_amount,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving ledger', error: error.message });
    }
};

// ACCOUNT OVERVIEW API: Get an overview of all loans for a customer

/**
 * Get an overview of all loans for a customer
 * @api {get} /account/:customer_id/overview
 * @apiName getAccountOverview
 * @apiGroup Account
 * @apiParam {String} customer_id Customer's unique ID.
 * @apiSuccess {Object} overview Account overview object with loan details
 * @apiError {Object} 404 No loans found for this customer
 * @apiError {Object} 500 Error retrieving account overview
 */
exports.getAccountOverview = async (req, res) => {
    try {
        const { customer_id } = req.params;

        // Find all loans for the customer
        const loans = await Loan.find({ customer_id });
        if (loans.length === 0) return res.status(404).json({ message: 'No loans found for this customer' });

        // Prepare the overview
        const overview = loans.map(loan => ({
            loan_id: loan.loan_id,
            loan_amount: loan.loan_amount,
            total_amount: loan.total_amount,
            emi_amount: loan.emi_amount,
            rate_of_interest: loan.rate_of_interest,
            paid_amount: loan.paid_amount,
            remaining_balance: loan.remaining_balance,
            number_of_emis_left: loan.number_of_emis - loan.paid_emis,
            payment_type: loan.payment_type
        }));

        res.status(200).json({ customer_id, loans: overview });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving account overview', error: error.message });
    }
};
