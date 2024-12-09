export function calculateInvestment(amount, returnPercentage) {
    const rate = parseFloat(returnPercentage.replace('%', '')) / 100; // Convert "3.6%" to 0.036
        // Ensure amount is treated as a number (in case it is passed as a string)
    const numericAmount = parseFloat(amount);
    // console.log("Rate",rate)
    // console.log(numericAmount + numericAmount * rate)
    return numericAmount + numericAmount * rate; // Final value = initial amount + interest
}
