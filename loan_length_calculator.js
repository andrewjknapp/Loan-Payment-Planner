/*

    Algorithm:
    1. Define an array of loans with amount, interest rate, and payback priority
    2. Pay interest on every loan other than the highest priority
    3. Put the remainder of the months payment into the highest priority loan
    4. When highest priority loan is paid off move priority to next loan
    5. When all loans have been paid off exit loop
*/

// Holds information about each of the loans
// Principle is the amount borrowed
// currentAmt is set to principle at the start then subtracted from as the money is paid off
// annualIntRate is the annual interest rate in percent.
// priority is the order in which the loans will be paid starting with 0 and incrementing upward
const loans = [
    {
        principle: 200000,
        currentAmt: 0,
        annualIntRate: 6.08,
        priority: 1
    },
    {
        principle: 150000,
        currentAmt: 0,
        annualIntRate: 7.08,
        priority: 0
    }
]

// Assigns the currentAmt for each loan to their respective principle amount
loans.forEach(element => element.currentAmt = element.principle);

// Duration is in months, -1 means continue with payment indefinitely
// payment is the annual contribution to loan payments
const ANNUAL_PAYMENT = [
    {
        payment: 25000,
        duration: 48 
    },
    {
        payment: 100000,
        duration: -1
    }
];

// Stores the sum of all payments made
let totalPaid = 0;

// Keeps track of how many months have passed
let month = 0;

// Will be set to false once all payment amounts are 0
let inDebt = true;

// Index of the highest priority loan in the loans array
let priorityIndex = 0;

// Stores the numerical value associated with the highest priority loan 
// Starts a 0 and increments upward until there are no loans left
let currentPriority = 0;

// Stores the calculated interest of each loan
let currentInterest;

// Stores total money available each month. 
let currentPayment;

// Used in calculations. Holds the current balance of the loan
let currentAmount;

// When one loan is paid off the remainder from that month's payment is subtracted 
// from the next loan on the priority list. carryOver stores this excess payment
let carryOver = 0;


while (inDebt && month < 1200) {

    for (let i = 0; i < ANNUAL_PAYMENT.length; i++) {
        if (ANNUAL_PAYMENT[i].duration === -1) {
            currentPayment = ANNUAL_PAYMENT[i].payment / 12;
            break;
        } else if (ANNUAL_PAYMENT[i].duration > 0) {
            currentPayment = ANNUAL_PAYMENT[i].payment / 12;
            ANNUAL_PAYMENT[i].duration--;
            break;
        }
    }

    for (let i = 0; i < loans.length; i++) {
        
        if (loans[i].priority === currentPriority) {
            priorityIndex = i;
        } else {
            currentInterest = loans[i].currentAmt * (loans[i].annualIntRate / 1200);
            
            if (currentPayment > currentInterest) {
                currentPayment -= currentInterest;
            } else {
                loans[i].currentAmt += (currentInterest - currentPayment);
            }
            totalPaid += currentInterest;
            
        }
    }

    loans[priorityIndex].currentAmt += loans[priorityIndex].currentAmt * (loans[priorityIndex].annualIntRate / 1200);
    
    currentAmount = loans[priorityIndex].currentAmt;
    
    if (carryOver > 0 && currentPriority < loans.length) {
        loans[priorityIndex].currentAmt -= carryOver;
        totalPaid += carryOver;
        carryOver = 0;
    }
    
    if (currentPriority >= loans.length) {

        inDebt = false;
        break;
    } else if (currentPayment > currentAmount) {
        totalPaid += currentAmount;
        currentPayment -= currentAmount;
        loans[priorityIndex].currentAmt = 0;
        currentPriority++;
        carryOver = currentPayment;
    } else {
        loans[priorityIndex].currentAmt -= currentPayment;
        totalPaid += currentPayment;
    }
    
    month++;
}

let totalPrinciple = loans.reduce((prev, element) => element.principle + prev, 0).toFixed(2);
let totalInterest = (totalPaid - totalPrinciple).toFixed(2);

let years = Math.floor(month / 12);
let months = (month % 12 + 1);

console.log(`${years} years and ${months} months, $${totalPaid.toFixed(2)} paid in total`);
console.log(`Total Borrowed: $${totalPrinciple}`);
console.log(`Total Interest Accrued: $${totalInterest}`);