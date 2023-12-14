import React, { useEffect, useState } from 'react';
import { ServerTable } from './Table/components/ServerTable/ServerTable.js';
import { Product } from "./types.ts";

function App() {
  const columns = [
    {
      Header: 'Employee',
      accessor: 'employee',
      // Use our custom `fuzzyText` filter on this column
      filter: 'fuzzyText',
      Cell: ({ row }) => row.original.employee,
      Footer: () => 'Total',
      nonMobileColumn: true,
      principalFilterableColumn: true,
    },
    {
      Header: 'Weight (%)',
      accessor: 'weight',
      width: 140,
      disableFilters: true,
      Footer: () => 100,
    },
    {
      Header: 'Planned',
      accessor: 'plannedSales',
      width: 200,
      disableFilters: true,
      Footer: () => '48 529 957,27',
    },
    {
      Header: 'Previous',
      accessor: 'previousSales',
      width: 200,
      disableSortBy: true,
      disableFilters: true,
      Footer: () => '42 238 542,94',
    },
    {
      Header: 'Actual',
      accessor: 'actualSales',
      width: 200,
      disableSortBy: true,
      disableFilters: true,
      Footer: () => '47 193 196,2',
    },
    {
      Header: 'Target',
      accessor: 'targetAchivementPercent',
      width: 100,
      disableSortBy: true,
      disableFilters: true,
      Footer: () => '97,25',
    },
    {
      Header: 'Forecasting',
      disableFilters: true,
      disableSortBy: true,
      width: 220,
      minWidth: 140,
      id: 'newSlider',
      accessor: 'targetAchivementPercent',
      Cell: () => (<input type="range" min={0} max={100} defaultValue={79} />),
      twoRowsMobileLayout: true,
      noFooterColumn: true,
    },
    {
      Header: 'Bonus',
      id: 'calculatedBonus',
      disableSortBy: true,
      disableFilters: true,
      accessor: (row) => row.forcastedBonus || row.calculatedBonus,
      Cell: (row) => row.value,
      noFooterColumn: true,
    },
    {
      Header: 'Type',
      accessor: 'someType',
      minWidth: 200,
      maxWidth: 400,
      noFooterColumn: true,
    },
  ];
  
  const actions = [
    {
      name: 'open-dictionaries-action',
      show: () => true,
      renderText: () => 'Open Dictionaries',
    },
    {
      name: 'open-dictionaries1-action',
      show: () => true,
      renderText: () => 'Open Dictionaries',
    },
  ];
  return (
    <div className="App">
<ServerTable
    tableId="tc-story-server-table"
    isStriped
    order={{
      id: 'orderNumber',
      desc: false,
    }}
    apiHostUrl="https://testhost.com"
    dataPath="/table/test"
    requestMethod="GET"
    refresh
    actions={actions}
    columns={columns}
  />
    </div>
  );
}

export default App;
