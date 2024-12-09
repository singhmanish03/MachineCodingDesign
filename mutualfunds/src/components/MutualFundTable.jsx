import React from 'react';

const MutualFundTable = ({ funds }) => (
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>NAV</th>
                <th>1-Year Investment</th>
                <th>3-Year Investment</th>
                <th>5-Year Investment</th>
            </tr>
        </thead>
        <tbody>
            {funds.map((fund, index) => (
                <tr key={index}>
                    <td>{fund.Name}</td>
                    <td>{fund.Type}</td>
                    <td>{fund.NAV}</td>
                    <td>{fund.OneYearInvestment}</td>
                    <td>{fund.ThreeYearInvestment}</td>
                    <td>{fund.FiveYearInvestment}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default MutualFundTable;
