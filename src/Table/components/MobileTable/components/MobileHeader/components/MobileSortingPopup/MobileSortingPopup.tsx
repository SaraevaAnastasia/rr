import React, { useState, useMemo } from 'react';
// @ts-ignore
import { Modal } from '@tourmalinecore/react-tc-modal';
// @ts-ignore
import { CheckField } from '@tourmalinecore/react-tc-ui-kit';

import { ReactComponent as IconSort } from '../../../../../../assets/images/icon-sort.svg';

import './MobileSortingPopup.css';

export default function MobileSortingPopup({
  // @ts-ignore
  sortableColumns,
  // @ts-ignore
  toggleSortBy,
  // @ts-ignore
  sortByColumn,
  // @ts-ignore
  onClose,
  // @ts-ignore
  languageStrings,
}) {
  const [draftSortById, setDraftSortById] = useState(sortByColumn.id);
  const [draftSortByDesc, setSortByDesc] = useState(sortByColumn.desc.toString());

  // @ts-ignore
  const columnOptions = useMemo(() => sortableColumns.map((column) => ({
    label: column.render(`Header`),
    value: column.id,
  })), [sortableColumns]);

  const {
    titleLabel,
    ascLabel,
    descLabel,
  } = languageStrings.sorting;

  const directionOptions = useMemo(() => [
    {
      label: ascLabel,
      value: `false`,
    },
    {
      label: descLabel,
      value: `true`,
    },
  ], [languageStrings.langKey]);

  return (
    <Modal
      overlay
      title={titleLabel}
      icon={<IconSort />}
      content={(
        <div className="tc-table-mobile-sorting">
          <div className="tc-table-mobile-sorting__section">
            {
              // @ts-ignore
              columnOptions.map((option) => (
                <CheckField
                  key={option.value}
                  className="tc-table-mobile-sorting__checkfield"
                  viewType="radio"
                  label={option.label}
                  checked={draftSortById === option.value}
                  onChange={() => setDraftSortById(option.value)}
                />
              ))
            }
          </div>
          <div className="tc-table-mobile-sorting__section">
            {
              directionOptions.map((option) => (
                <CheckField
                  key={option.value}
                  className="tc-table-mobile-sorting__checkfield"
                  viewType="radio"
                  label={option.label}
                  checked={draftSortByDesc === option.value}
                  onChange={() => setSortByDesc(option.value)}
                />
              ))
            }
          </div>
        </div>
      )}
      onClose={onClose}
      showApply
      onApply={onApply}
      showCancel
      language={languageStrings.langKey}
    />
  );

  function onApply() {
    toggleSortBy(draftSortById, draftSortByDesc === `true`);
    onClose();
  }
}
