import React from 'react';

import Select from '../DesktopTable/components/Select/Select';

export default function SelectColumnFilter({
  column: {
    // @ts-ignore
    filterValue,
    // @ts-ignore
    setFilter,
    // @ts-ignore
    id,
    // @ts-ignore
    selectFilterOptions,
  },
  // @ts-ignore
  filterValueOverride,
  // @ts-ignore
  setFilterOverride,
}) {
  return (
    <Select
      value={setFilterOverride ? filterValueOverride : filterValue}
      options={selectFilterOptions}
      // @ts-ignore
      onChange={(e) => {
        const newFilterValue = e.target.value;

        if (setFilterOverride) {
          setFilterOverride(id, newFilterValue);
        } else {
          setFilter(newFilterValue);
        }
      }}
    />
  );
}
