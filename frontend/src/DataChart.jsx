import React, { useEffect } from 'react';
import { Chart } from 'chart.js';

function DataChart({ data }) {
    useEffect(() => {
        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item.Country_Name),
                datasets: [{
                    label: 'Technology Adoption',
                    data: data.map(item => item.Technology_Adoption),
                    backgroundColor: '#09ee09',
                }]
            }
        });
    }, [data]);

    return <canvas id="myChart" width="400" height="200"></canvas>;
}

export default DataChart;
