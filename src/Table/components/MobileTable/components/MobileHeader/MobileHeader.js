import React, { useState } from 'react';

import { ReactComponent as IconSearch } from '../../../../assets/images/icon-search.svg';
import { ReactComponent as IconClear } from '../../../../assets/images/icon-times.svg';
import { ReactComponent as IconFilter } from '../../../../assets/images/icon-filter.svg';
import { ReactComponent as IconSort } from '../../../../assets/images/icon-sort.svg';

import './MobileHeader.css';

export default function MobileHeader({
  // @ts-ignore
  flatHeaders,
  // @ts-ignore
  setAllFilters,
  // @ts-ignore
  toggleSortBy,
  // @ts-ignore
  sortBy,
  // @ts-ignore
  filters,
  // @ts-ignore
  languageStrings,
}) {
  // @ts-ignore
  const filterableColumns = flatHeaders.filter((column) => column.canFilter);
  const filterableColumnsCount = filterableColumns.length;

  const [showFiltersPopup, setShowFiltersPopup] = useState(false);

  // @ts-ignore
  const sortableColumns = flatHeaders.filter((column) => column.canSort);
  const sortableColumnsCount = sortableColumns.length;

  const [showSortingPopup, setShowSortingPopup] = useState(false);

  const {
    searchLabel,
  } = languageStrings;

  // @ts-ignore
  const principalFilter = filterableColumns.find((column) => column.principalFilterableColumn);

  // @ts-ignore
  const isPrincipalInputFilled = filters.some((filter) => filter.id === principalFilter.id);

  return (
    <div className="tc-table-mobile-header">
      {
        principalFilter && (
          <div className="tc-table-mobile-header__filter">
            {principalFilter.render(`Filter`, { inputPlaceholder: searchLabel })}

            <div className="tc-table-mobile-header__filter-icons">
              {
                isPrincipalInputFilled
                  ? (
                    <button
                      type="button"
                      className="tc-table-mobile-header__filter-clear"
                      onClick={resetPrincipalFilter}
                    >
                      <IconClear className="tc-table-mobile-header__filter-clear-icon" />
                    </button>
                  )
                  : <IconSearch className="tc-table-mobile-header__filter-icon" />
              }
            </div>
          </div>
        )
      }

      {
        showFiltersPopup
        && (
          <MobileFiltrationPopup
            filterableColumns={filterableColumns}
            setAllFilters={setAllFilters}
            languageStrings={languageStrings}
            onClose={() => setShowFiltersPopup(false)}
          />
        )
      }

      {
        showSortingPopup
        && (
          <MobileSortingPopup
            sortableColumns={sortableColumns}
            toggleSortBy={toggleSortBy}
            sortByColumn={sortBy[0]}
            languageStrings={languageStrings}
            onClose={() => setShowSortingPopup(false)}
          />
        )
      }

      {
        filterableColumnsCount > 1
        && (
          <button
            className="tc-table-mobile-header__button"
            type="button"
            onClick={() => setShowFiltersPopup(true)}
          >
            <IconFilter />
          </button>
        )
      }

      {
        sortableColumnsCount > 0
        && (
          <button
            className="tc-table-mobile-header__button"
            type="button"
            onClick={() => setShowSortingPopup(true)}
          >
            <IconSort />
          </button>
        )
      }
    </div>
  );

  function resetPrincipalFilter() {
    // @ts-ignore
    const resettedFilters = filters.map((filter) => (
      filter.id === principalFilter.id
        ? {
          ...filter,
          value: ``,
        }
        : filter
    ));

    setAllFilters(resettedFilters);
  }
}
