const Customer = require('../model/customer'); // Adjust the path if neede

// Create a new customer
const createCustomer = async (req, res) => {
    console.log(req.body);
    try {
        const {
            firstName,
            lastName,
            email,
            phone,
            address,
            accountNumber,
            accountType,
            identity,
            balance
        } = req.body;

        // Create a new customer instance
        const newCustomer = new Customer({
            firstName,
            lastName,
            email,
            phone,
            address,
            accountNumber,
            accountType,
            identity,
            balance
        });

        // Save to the database
        const savedCustomer = await newCustomer.save();

        // Respond with the created customer
        res.status(201).json({
            message: 'Customer created successfully',
            customer: savedCustomer
        });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({
            message: 'Failed to create customer',
            error: error.message
        });
    }
};

module.exports = {
    createCustomer
};
