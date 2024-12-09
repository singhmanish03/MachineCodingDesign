import React, { useState } from 'react';

const InvestmentCalculator = ({ onCalculate }) => {
    const [amount, setAmount] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (amount && amount > 0) onCalculate(amount);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Investment Amount:</label>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
            />
            <button type="submit">Calculate</button>
        </form>
    );
};

export default InvestmentCalculator;
