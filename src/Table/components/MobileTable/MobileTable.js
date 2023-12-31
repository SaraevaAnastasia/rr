import React, { useState } from 'react';

import { ReactComponent as IconChevronDown } from '../../assets/images/icon-chevron-down.svg';

import NoRecords from '../NoRecords/NoRecords';
import MobileHeader from './components/MobileHeader/MobileHeader';
import MobilePagination from './components/MobilePagination/MobilePagination';

import './MobileTable.css';

export default function MobileTable({
  // @ts-ignore
  flatHeaders,
  // @ts-ignore
  setAllFilters,
  // @ts-ignore
  toggleSortBy,
  // @ts-ignore
  prepareRow,
  // @ts-ignore
  page,
  // @ts-ignore
  totalCount,
  // @ts-ignore
  setPageSize,
  state: {
    // @ts-ignore
    pageSize,
    // @ts-ignore
    sortBy,
    // @ts-ignore
    filters,
  },
  // @ts-ignore
  renderMobileTitle,
  // @ts-ignore
  noFooter,
  // @ts-ignore
  loading,
  // @ts-ignore
  actions,
  // @ts-ignore
  languageStrings,
}) {
  const [expandedRowId, setExpandedRowId] = useState(null);

  const {
    totalLabel,
    loadingLabel,
  } = languageStrings;

  return (
    <div className="tc-table-mobile">
      <MobileHeader
        flatHeaders={flatHeaders}
        setAllFilters={setAllFilters}
        languageStrings={languageStrings}
        toggleSortBy={toggleSortBy}
        sortBy={sortBy}
        filters={filters}
      />
      <ul className="tc-table-mobile__list">
        {
          // @ts-ignore
          page.map((row) => {
            prepareRow(row);
            return (
              <li
                className="tc-table-mobile__row"
                key={row.id}
              >
                <div className="tc-table-mobile__row-header">
                  <h2 className="tc-table-mobile__row-title">{renderMobileTitle(row)}</h2>
                  <button
                    type="button"
                    className="tc-table-mobile__row-trigger"
                    onClick={() => (row.id === expandedRowId ? setExpandedRowId(null) : setExpandedRowId(row.id))}
                  >
                    <IconChevronDown
                      className={`tc-table-mobile__chevron tc-table-mobile__chevron--${row.id === expandedRowId ? `up` : `down`}`}
                    />
                  </button>
                </div>
                {
                  expandedRowId === row.id && (
                    <div className="tc-table-mobile__row-inner">
                      <div className="tc-table-mobile__row-data">
                        {
                          row.cells
                          // @ts-ignore
                            .filter((cell) => !cell.column.nonMobileColumn)
                            // @ts-ignore
                            .map((cell) => (
                              <div
                                key={`${cell.column.id}`}
                                className={`tc-table-mobile__row-data-item ${cell.column.twoRowsMobileLayout ? `tc-table-mobile__row-data-item--vertical` : ``}`}
                              >
                                <div className="tc-table-mobile__label">
                                  {cell.render(`Header`)}
                                </div>
                                <div className="tc-table-mobile__value">
                                  {cell.render(`Cell`)}
                                </div>
                              </div>
                            ))
                        }
                      </div>
                      {
                        actions.length > 0
                        && (
                          <div className="tc-table-mobile__actions">
                            {
                              actions
                              // @ts-ignore
                                .filter((action) => action.show(row))
                                // @ts-ignore
                                .map((action) => (
                                  <button
                                    key={`${action.name}-${row.id}`}
                                    type="button"
                                    className="tc-table-mobile-action"
                                    onClick={(e) => action.onClick(e, row)}
                                  >
                                    <span className="tc-table-mobile-action__inner">
                                      {
                                        action.renderIcon && (
                                          <span className="tc-table-mobile-action__icon">
                                            {action.renderIcon(row)}
                                          </span>
                                        )
                                      }
                                      <span className="tc-table-mobile-action__label">{action.renderText(row)}</span>
                                    </span>
                                  </button>
                                ))
                            }
                          </div>
                        )
                      }
                    </div>
                  )
                }
              </li>
            );
          })
        }
        {
          totalCount === 0
          && <NoRecords languageStrings={languageStrings} />
        }
        {
          !noFooter && !!totalCount
          && (
            <li className="tc-table-mobile__row">
              <div className="tc-table-mobile__row-header">
                <h2 className="tc-table-mobile__row-title">{totalLabel}</h2>
              </div>
              <div className="tc-table-mobile__row-inner">
                <div className="tc-table-mobile__row-data">
                  {
                    flatHeaders
                    // @ts-ignore
                      .filter((column) => !column.nonMobileColumn)
                      // @ts-ignore
                      .filter((column) => !column.noFooterColumn)
                      // @ts-ignore
                      .map((column) => (
                        <div
                          key={`total-${column.id}`}
                          className="tc-table-mobile__row-data-item"
                        >
                          <div className="tc-table-mobile__label">
                            {column.render(`Header`)}
                          </div>
                          <div className="tc-table-mobile__value">
                            {column.render(`Footer`)}
                          </div>
                        </div>
                      ))
                  }
                </div>
              </div>
            </li>
          )
        }
        <MobilePagination
          totalCount={totalCount}
          setPageSize={setPageSize}
          pageSize={pageSize}
          languageStrings={languageStrings}
        />
      </ul>

      {!loading && (
        <div className="tc-table-mobile__loading-overlay">
          {loadingLabel}
        </div>
      )}
    </div>
  );
}
