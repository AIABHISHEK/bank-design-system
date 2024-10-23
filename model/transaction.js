const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    },
    amount: {
        type: Number,
        required: true
    },
    loanId: {
        type: Schema.Types.ObjectId,
        ref: 'Loan',
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String, enum: ['EMI', 'LUMP_SUM', 'WITHDRAWAL', 'DEPOSIT'],
        required: true
    }
},
    {
        timeStamps: true
    }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;