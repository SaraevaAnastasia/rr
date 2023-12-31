import React from 'react';

// Define a default UI for filtering
export default function DefaultColumnFilter({
  column: {
    // @ts-ignore
    id,
    // @ts-ignore
    filterValue,
    // @ts-ignore
    setFilter,
  },
  // @ts-ignore
  filterValueOverride,
  // @ts-ignore
  setFilterOverride,
  // @ts-ignore
  inputPlaceholder,
}) {
  return (
    <input
      className="tc-table-filter"
      value={setFilterOverride ? filterValueOverride || `` : filterValue || ``}
      onChange={(e) => {
        const newFilterValue = e.target.value || undefined; // Set undefined to remove the filter entirely

        if (setFilterOverride) {
          setFilterOverride(id, newFilterValue);
        } else {
          setFilter(newFilterValue);
        }
      }}
      style={{
        width: `100%`,
        lineHeight: 1,
      }}
      placeholder={inputPlaceholder}
    />
  );
}
