const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    address: {
        street: {
            type: String,
            required: false,
            trim: true
        },
        city: {
            type: String,
            required: true,
            trim: true
        },
        state: {
            type: String,
            required: true,
            trim: true
        },
        zipCode: {
            type: String,
            required: true,
            trim: true
        }
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
    },
    accountType: {
        type: String,
        required: true,
        enum: ['Savings', 'Current'],
        default: 'Savings'
    },
    identity: {
        aadhar: {
            number: {
                type: String,
                required: true,
                unique: true,
                trim: true
            }
        },
        pancard: {
            number: {
                type: String,
                required: true,
                unique: true,
                trim: true
            }
        }
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    loans: [{
        type: Schema.Types.ObjectId,
        ref: 'Loan'
    }],
},
    {
        timeStamps: true
    }

);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;