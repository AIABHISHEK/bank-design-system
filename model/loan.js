const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema({
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    },
    loan_amount: {
        type: Number,
        required: true
    },
    loan_period: {
        years:Number,
        months:Number,
    },
    loanIssueDate: {
        type: String,
        default: Date.now
    },
    rate_of_interest: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    emi_amount: {
        type: Number,
        required: true
    },
    remaining_balance: {
        type: Number,
        required: true
    },
    number_of_emis: {
        type: Number,
        required: true
    },
    paid_emis: {
        type: Number,
        default: 0
    },
    paid_amount: {
        type: Number,
        default: 0
    },
    transactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Transaction'
        }
    ],
},
    {
        timeStamps: true
    }
);

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;