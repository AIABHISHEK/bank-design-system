Assumptions:

- Simple Interest on loan borrowed
- No interest on savings
- No authorization required for operation

# Assignment 1 Bank System Design

## How to run the code

- Install the dependencies
```bash
npm install
```
- create .env file and add the following
```bash
    MONGODB_URL="your-mongodb-url"
```

- Run server
```bash
node app.js
```

## How to use the code

- Create a customer <br>
` POST ` <br>
`localhost:3000/customer`
- example data to be sent in request body
``` 
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "1234567890",
    "address": {
        "street": "123 Main St",
        "city": "Springfield",
        "state": "IL",
        "zipCode": "62701"
    },
    "accountNumber": "123456789",
    "accountType": "Savings",
    "identity": {
        "aadhar": {
            "number": "123456789012"
        },
        "pancard": {
            "number": "ABCDE1234F"
        }
    },
    "balance": 1000
}

```
- Create a loan (lend money to customer) <br>
`POST` <br>
`localhost:3000/lend` <br>
- example data to be sent in request body
```
{
    "customer_id": "6717f18958a23ba5f1704d40",            
    "loan_amount": 5000,              
    "loan_period": {"years":3, "months": 0},                  
    "rate_of_interest": 5.5,          
    "payment_type": "EMI"           
}
```

- Make a payment for loan
- example data to be sent in request body
```
{
    "loan_id": "6717f7ab0022b7588d4c9f7c",      
    "amount": 500,                 
    "payment_type": "EMI"
}

```

-- Get an overview of a loan <br>
`GET` <br>
http://localhost:3000/ledger/loanID

-- get overview customer loans
 <br>
`GET` <br>
http://localhost:3000/account/customerId



# Assignment 2 Problems

- All the problems in the assignment are solved using the code provided in the `problems` folder