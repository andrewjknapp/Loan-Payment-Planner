const STARTING_BALANCE = 318000;

const INTEREST_RATE = 0.065;

const PAYMENT = 100000;

let currentAmt = STARTING_BALANCE;
let totalPaid = 0;

let counter = 0;

while (currentAmt > 0) {
    if (PAYMENT > currentAmt) {
        totalPaid += currentAmt;
    } else {
        totalPaid += PAYMENT;
    }
    currentAmt -= PAYMENT;
    currentAmt *= (1 + INTEREST_RATE);
    counter++;
}

console.log(`${counter} years, $${totalPaid.toFixed(2)} paid in total`);