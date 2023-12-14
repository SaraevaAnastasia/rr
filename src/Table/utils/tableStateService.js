import { cloneDeep } from 'lodash';

const tablesState = {};

export {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  saveFilters,
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  saveSortBy,
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  getDefaultFilters,
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  getDefaultSortBy,
};

// @ts-ignore
function saveFilters(tableId, filters) {
  saveTableStatePiece(tableId, `filters`, filters);
}

// @ts-ignore
function saveSortBy(tableId, sortBy) {
  saveTableStatePiece(tableId, `sortBy`, sortBy);
}

// @ts-ignore
function getDefaultFilters(tableId, initialState) {
  return getPieceOfTableState(tableId, `filters`, initialState);
}

// @ts-ignore
function getDefaultSortBy(tableId, initialState) {
  return getPieceOfTableState(tableId, `sortBy`, initialState);
}

// @ts-ignore
function saveTableStatePiece(tableId, propertyName, pieceOfState) {
  const prevTableState = getTableState(tableId);

  if (!prevTableState) {
    // @ts-ignore
    tablesState[tableId] = {};
  }

  getTableState(tableId)[propertyName] = cloneDeep(pieceOfState);
}

// @ts-ignore
function getPieceOfTableState(tableId, propertyName, initialState) {
  const tableState = getTableState(tableId);

  if (!tableState) {
    return initialState;
  }

  return tableState[propertyName] || initialState;
}

// @ts-ignore
function getTableState(tableId) {
  // @ts-ignore
  return tablesState[tableId];
}
