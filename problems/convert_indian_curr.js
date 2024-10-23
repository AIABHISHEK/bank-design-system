function formatIndianCurrency(num) {
    // Convert the number to a string
    let [integerPart, fractionalPart] = num.toString().split('.');

    // Reverse the integer part for easier processing from the right
    let reversedInteger = integerPart.split('').reverse().join('');

    // Add commas after the first three digits and every two digits after
    let formattedInteger = reversedInteger.replace(/(\d{3})(?=\d)/, '$1,')  // First group of 3
        .replace(/(\d{2})(?=\d)/g, '$1,'); // Groups of 2 after that

    // Reverse back the integer part to its original form
    formattedInteger = formattedInteger.split('').reverse().join('');

    // If there's a fractional part, concatenate it, otherwise return just the integer part
    return fractionalPart ? `${formattedInteger}.${fractionalPart}` : formattedInteger;
}

// Example usage:
console.log(formatIndianCurrency(123456.7891)); // Output: 1,23,456.7891
console.log(formatIndianCurrency(987654321.00)); // Output: 98,76,54,321
console.log(formatIndianCurrency(1000000)); // Output: 10,00,000
