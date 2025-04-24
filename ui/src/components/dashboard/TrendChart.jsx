// /gebral-Estate/ui/src/components/dashboard/TrendChart.jsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const TrendChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  
  useEffect(() => {
    // Simulated data for the chart
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
    
    const data = {
      labels,
      datasets: [
        {
          label: 'Occupancy Rate',
          data: [88, 90, 89, 86, 87, 84, 80, 85, 88],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Rental Price',
          data: [120, 125, 130, 135, 140, 138, 145, 150, 155],
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Market Average',
          data: [115, 118, 122, 125, 130, 134, 138, 142, 148],
          borderColor: '#10b981',
          borderDash: [5, 5],
          backgroundColor: 'transparent',
          fill: false,
          tension: 0.4,
        },
      ],
    };
    
    setChartData(data);
  }, []);
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        titleColor: '#fff',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        padding: 10,
        boxPadding: 5,
        usePointStyle: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: '#64748b',
        },
      },
      y: {
        grid: {
          color: 'rgba(100, 116, 139, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: '#64748b',
        },
      },
    },
    elements: {
      point: {
        radius: 2,
        hoverRadius: 4,
        hitRadius: 20,
      },
    },
  };

  return (
    <div className="h-64">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TrendChart;
