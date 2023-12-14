export {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  saveTablePageSize,
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  getDefaultTablePageSize,
};

function saveTablePageSize(tableId: any, pageSize: string) {
  localStorage.setItem(`${tableId}-page-size`, pageSize);
}

function getDefaultTablePageSize(tableId: any) {
  const defaultTablePageSize = localStorage.getItem(`${tableId}-page-size`);

  return defaultTablePageSize
    ? Number(defaultTablePageSize)
    : 10;
}
