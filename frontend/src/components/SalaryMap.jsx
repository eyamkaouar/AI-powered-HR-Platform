import React from 'react';
import Plot from 'react-plotly.js';

const SalaryMap = () => {
  // Sample data - easy to connect to backend API later
  const data = [{
    type: 'choropleth',
    locationmode: 'ISO-3',
    locations: ['USA', 'CAN', 'FRA', 'DEU', 'GBR', 'AUS', 'JPN', 'IND', 'BRA', 'ZAF'],
    z: [120000, 95000, 72000, 78000, 85000, 92000, 68000, 35000, 42000, 48000],
    text: ['United States', 'Canada', 'France', 'Germany', 'United Kingdom', 'Australia', 'Japan', 'India', 'Brazil', 'South Africa'],
    hovertemplate: '<b>%{text}</b><br>Avg. Salary: $%{z:,.0f}<extra></extra>',
    colorscale: 'Blues',
    reversescale: false,
    marker: {
      line: {
        color: '#f8fafc',
        width: 0.5
      }
    },
    showscale: false,
  }];

  const layout = {
    geo: {
      projection: {
        type: 'natural earth'
      },
      showframe: false,
      showcoastlines: true,
      coastlinecolor: '#e2e8f0',
      landcolor: '#f8fafc',
      bgcolor: 'rgba(0,0,0,0)',
    },
    margin: { t: 0, b: 0, l: 0, r: 0 },
    autosize: true,
    height: 320,
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
  };

  const config = {
    responsive: true,
    displayModeBar: false,
  };

  return (
    <div className="w-full bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">Global Salary Insights</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Average Market Rates by Region</p>
        </div>
        <div className="px-3 py-1 bg-primary-50 rounded-lg text-primary-600 text-[10px] font-black uppercase">
          Live Data
        </div>
      </div>
      
      <div className="w-full overflow-hidden flex justify-center items-center">
        <Plot
          data={data}
          layout={layout}
          config={config}
          className="w-full"
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default SalaryMap;
