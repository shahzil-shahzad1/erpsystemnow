// app/(commercial)/dashboard/analytics/page.tsx
"use client";

import React, { useState } from 'react';
import { Search, ChevronDown, Download} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Title as ChartTitle } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, ChartTitle);

// Removed Next.js specific font import and cn utility as they cause compilation errors in this environment.
import { cn } from "@/lib/utils";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

import StatCard from '@/components/analytics/StatCard';

// Dummy Data Structures
import { analyticsOverviewCards } from '@/lib/analyticsdata';

import { financialTrendData } from '@/lib/analyticsdata';

import { salesByCategoryData } from '@/lib/analyticsdata';

import { inventoryFlowValueData } from '@/lib/analyticsdata';

import { hrCostTrendData } from '@/lib/analyticsdata';

import { analyticsAlerts } from '@/lib/analyticsdata';


const BusinessAnalyticsPage: React.FC = () => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('Last 30 Days');
  const [searchTerm, setSearchTerm] = useState(''); // New state for search term

  const handleTimePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTimePeriod(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleExportReport = () => {
    alert("Export Report button clicked!");
  };

  return (
    <div className="min-h-screen p-6 sm:p-8 lg:p-10 font-sans text-gray-900 dark:text-white">
      {/* Header Section */}
      <div className="mb-8 p-3 inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl">
        <h1 className={cn("text-lg bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 dark:from-orange-400 dark:via-orange-300 dark:to-orange-400 font-bold text-zinc-900 dark:text-zinc-100", pacifico.className)}>Business Analytics</h1>
        <p className="text-zinc-800 dark:text-zinc-200 text-xs">Comprehensive insights into business performance and trends</p>
      </div>

      {/* Global Filters / Time Period Selector & Action Button */}
      <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full text-sm pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-zinc-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e5a004] focus:border-transparent"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          {/* Time Period Selector */}
          <div className="relative w-full sm:w-auto">
            <select
              className="appearance-none text-sm bg-white dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-zinc-900 dark:text-white py-1.5 px-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e5a004] focus:border-transparent w-full"
              value={selectedTimePeriod}
              onChange={handleTimePeriodChange}
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Quarter</option>
              <option>Last Quarter</option>
              <option>This Year</option>
              <option>Last Year</option>
              <option>Custom Range</option>
            </select>
            <ChevronDown size={18} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 pointer-events-none" />
          </div>
          {/* Export Report Button */}
          <button
            onClick={handleExportReport}
            className="bg-white/50 dark:bg-gray-800/50 text-black dark:text-white py-1.5 px-3 rounded-lg shadow-md flex items-center justify-center transition-all duration-200 w-full sm:w-auto whitespace-nowrap text-sm"
          >
            <Download size={18} className="mr-1.5" />
            Export Report
          </button>
        </div>
      </div>

      {/* Overall Business Performance Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {analyticsOverviewCards.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>

      {/* Top Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Key Financial Trends Chart */}
        <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Key Financial Trends</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Revenue, gross profit, and net profit over time.</p>
          <div className="h-64">
            <Line data={financialTrendData} />
          </div>
        </div>

        {/* Sales Performance by Category Chart */}
        <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Sales Performance by Category</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Sales distribution across different product categories.</p>
          <div className="h-64">
            <Bar data={salesByCategoryData} />
          </div>
        </div>
      </div>

      {/* Middle Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Inventory Flow & Value Trend Chart */}
        <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Inventory Flow & Value Trend</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Inbound/outbound units and total inventory value.</p>
          <div className="h-64">
            <Line data={inventoryFlowValueData} />
          </div>
        </div>

        {/* Workforce & Payroll Cost Trend Chart */}
        <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900">
          <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Workforce & Payroll Cost Trend</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Active employees and total payroll expenses over time.</p>
          <div className="h-64">
            <Line data={hrCostTrendData} />
          </div>
        </div>
      </div>

      {/* Critical Alerts & Actionable Insights Section */}
      <div className="inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-zinc-900 w-full">
        <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Critical Alerts & Actionable Insights</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">Immediate notifications and strategic recommendations.</p>
        <ul className="space-y-4">
          {analyticsAlerts.map((alert, index) => {
            const Icon = alert.icon;
            return (
              <li key={index} className="flex items-start p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <Icon size={18} className={`mt-1 mr-3 flex-shrink-0 ${alert.color}`} />
                <p className="text-gray-800 dark:text-gray-200 text-base">{alert.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default BusinessAnalyticsPage;
