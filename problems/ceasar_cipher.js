



// Function to encode or decode the message
function caesarCipher(message, shift, isDecode = false) {
    // If we are decoding, reverse the shift
    if (isDecode) {
        shift = -shift;
    }

    // Function to shift a character based on the shift value
    function shiftChar(char, shift) {
        const alphabetStart = char >= 'a' ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
        const totalLetters = 26; // English alphabet has 26 letters

        // Calculate the new character position using modulo for wrap-around
        let newCharCode = ((char.charCodeAt(0) - alphabetStart + shift) % totalLetters + totalLetters) % totalLetters + alphabetStart;

        return String.fromCharCode(newCharCode);
    }

    // Result to store the encoded or decoded message
    let result = '';

    // Iterate through the message
    for (let i = 0; i < message.length; i++) {
        let char = message[i];

        // If the character is a letter, shift it; otherwise, leave it unchanged
        if (char.match(/[a-zA-Z]/)) {
            result += shiftChar(char, shift);
        } else {
            result += char; // Keep non-alphabet characters unchanged
        }
    }

    return result;
}

// Encoding a message
let encodedMessage = caesarCipher("Hello, World za!", 3);
console.log("Encoded message:", encodedMessage);
// Output: "Khoor, Zruog!"

// Decoding a message
let decodedMessage = caesarCipher(encodedMessage, 3, true);
console.log("Decoded message:", decodedMessage);
// Output: "Hello, World!"
