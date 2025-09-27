import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { getBudgetData } from '../api/budgetAPI';

function ChartJSPieChart() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // store chart instance

  useEffect(() => {
    getBudgetData().then((data) => {
      const ctx = chartRef.current.getContext('2d');

      // Destroy old chart if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data.map(item => item.title),
          datasets: [
            {
              label: 'Budget',
              data: data.map(item => item.budget),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#4BC0C0',
                '#9966FF',
                '#FF9F40',
                '#C9CBCF'
              ],
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'right' },
          }
        }
      });
    });

    // Cleanup on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []); // <-- empty dependency array, only runs once

  return <canvas ref={chartRef}></canvas>;
}

export default ChartJSPieChart;
