import React, { useState, useEffect } from 'react';
import InvestmentCalculator from '../components/InvestmentCalculator';
import MutualFundTable from '../components/MutualFundTable';
import { calculateInvestment } from '../utils/calculateReturns';
// import mutualFundsData from '../assets/mutual_funds.json';

const Home = () => {
    const [funds, setFunds] = useState([]);
    const [calculatedFunds, setCalculatedFunds] = useState([]);

    useEffect(() => {
        const mutualFundsData = require("../assets/mutual_funds.json");
        // setFunds(mutualFundsData.MutualFunds);
        setFunds(mutualFundsData.MutualFunds);
    }, []);
  
    const handleCalculation = (amount) => {
        const updatedFunds = funds.map((fund) => ({
            ...fund,
            OneYearInvestment: calculateInvestment(amount, fund.Returns.OneYearReturn),
            ThreeYearInvestment: calculateInvestment(amount, fund.Returns.ThreeYearReturn),
            FiveYearInvestment: calculateInvestment(amount, fund.Returns.FiveYearReturn),
        }));

        const sortedFunds = [...updatedFunds].sort(
            (a, b) => b.OneYearInvestment - a.OneYearInvestment
        );

        setCalculatedFunds(sortedFunds.slice(0, 10));
    };

    return (
        <div>
            <InvestmentCalculator onCalculate={handleCalculation} />
            {calculatedFunds.length > 0 && <MutualFundTable funds={calculatedFunds} />}
        </div>
    );
};

export default Home;
