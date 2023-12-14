/* eslint-disable @typescript-eslint/indent */
/* eslint-disable max-len */
/* eslint-disable import/order */
/* eslint-disable no-nested-ternary */
import React, { useRef } from 'react';

import DesktopPagination from './components/DesktopPagination/DesktopPagination';
import NoRecords from '../NoRecords/NoRecords';

import { ACTIONS_COLUMN_ID } from '../Actions/actionsColumnFactory';

import './DesktopTable.css';
import { JSX } from 'react/jsx-runtime';
// @ts-ignore
// eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
const headerProps = (props, { column }) => getStyles(props, column.align);
// @ts-ignore
// eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
const cellProps = (props, { cell }) => getStyles(props, cell.column.align, cell.column.alignItems);
// @ts-ignore
const getStyles = (props, align = `left`, alignItems = `flex-start`) => [
  props,
  {
    style: {
      justifyContent: align === `right` ? `flex-end` : `flex-start`,
      alignItems,
      display: `flex`,
    },
  },
];

const setActionCellClassname = (column) => (
  column.id === ACTIONS_COLUMN_ID ? `tc-table-desktop__action-cell` : ``
);

export default function DesktopTable({
  // @ts-ignore
  tableId,
  // @ts-ignore
  getTableProps,
  // @ts-ignore
  headerGroups,
  // @ts-ignore
  footerGroups,
  // @ts-ignore
  prepareRow,
  // @ts-ignore
  rows,
  // @ts-ignore
  page,
  // @ts-ignore
  totalCount,
  // @ts-ignore
  canPreviousPage,
  // @ts-ignore
  canNextPage,
  // @ts-ignore
  pageCount,
  // @ts-ignore
  gotoPage,
  // @ts-ignore
  nextPage,
  // @ts-ignore
  previousPage,
  // @ts-ignore
  setPageSize,
  state: {
    // @ts-ignore
    pageIndex,

    // @ts-ignore
    pageSize,
  },
  // @ts-ignore
  noFooter,
  // @ts-ignore
  loading,
  // @ts-ignore
  isStriped,
  // @ts-ignore
  languageStrings,
}) {
  const {
    loadingLabel,
  } = languageStrings;

  const tableContainerRef = useRef();

  const isStripedClassname = isStriped ? `tc-table-desktop__tr--striped` : ``;

  return (
    <div
      // @ts-ignore
      ref={tableContainerRef}
      className="tc-table-desktop"
    >
      <div className="tc-table-desktop__inner">
        <div
          {...getTableProps()}
          className="tc-table-desktop__content"
        >
          <div className="tc-table-desktop__header">
            {headerGroups.map((headerGroup) => (
              <React.Fragment key={`headergroup-wrapper-${headerGroup.id}`}>
                <div
                  {...headerGroup.getHeaderGroupProps()}
                  className="tc-table-desktop__tr"
                >
                  {headerGroup.headers.map((column) => (
                    <div
                      {...column.getHeaderProps({
                        ...headerProps,
                        ...(column.getSortByToggleProps ? column.getSortByToggleProps() : {}),
                      })}
                      title={column.render(`Header`)}
                      className={`tc-table-desktop__th tc-table-desktop__th--header
                        ${setActionCellClassname(column)}
                        ${column.isSorted
                      ? column.isSortedDesc
                        ? `tc-table-desktop__th--sort-desc`
                        : `tc-table-desktop__th--sort-asc`
                      : ``}`}
                    >
                      {column.render(`Header`)}
                      {/* Use column.getResizerProps to hook up the events correctly */}
                      {column.canResize && (
                        <div
                          {...column.getResizerProps({
                            // This disables sorting when resizing ends
                            onClick: (e) => { e.stopPropagation(); e.preventDefault(); },
                          })}
                          className="resizer"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div
                  {...headerGroup.getHeaderGroupProps()}
                  key="filters-row"
                  className="tc-table-desktop__tr tc-table-desktop__tr--filter"
                >
                  {headerGroup.headers.map((column) => (
                    <div
                      {...column.getHeaderProps()}
                      className={`tc-table-desktop__th ${setActionCellClassname(column)}`}
                    >
                      {/* Render the columns filter UI */}
                      <div>{column.canFilter ? column.render(`Filter`) : null}</div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>

          <div className="tc-table-desktop__body">
            {page.map((row) => {
              prepareRow(row);
              return (
                <div
                  {...row.getRowProps()}
                  className={`tc-table-desktop__tr ${isStripedClassname}`}
                >
                  {row.cells.map((cell) => (
                    <div
                      {...cell.getCellProps(cellProps)}
                      className={`tc-table-desktop__td ${setActionCellClassname(cell.column)}`}
                    >
                      {cell.render(`Cell`, { tableContainerRef })}
                    </div>
                  ))}
                </div>
              );
            })}

            {
              rows.length === 0
              && <NoRecords languageStrings={languageStrings} />
            }

            {
              !noFooter && rows.length > 0
              && footerGroups.map((group) => (
                <div
                  {...group.getFooterGroupProps()}
                  key={`footergroup-${group.id}`}
                  className="tc-table-desktop__tr tc-table-desktop__tr--footer"
                >
                  {group.headers.map((column) => (
                    <div
                      {...column.getFooterProps(headerProps)}
                      key={`footercolumn-${column.id}`}
                      className={`tc-table-desktop__td ${setActionCellClassname(column)}`}
                    >
                      {column.render(`Footer`)}
                    </div>
                  ))}
                </div>
              ))
            }
          </div>
        </div>
      </div>

      <DesktopPagination
        tableId={tableId}
        totalCount={totalCount || rows.length}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        pageCount={pageCount}
        gotoPage={gotoPage}
        nextPage={nextPage}
        previousPage={previousPage}
        setPageSize={setPageSize}
        pageIndex={pageIndex}
        pageSize={pageSize}
        languageStrings={languageStrings}
      />

      {
        !loading
        && (
          <div className="tc-table-desktop__loading-overlay">
            {loadingLabel}
          </div>
        )
      }
    </div>
  );
}
