import React, { useState } from 'react';

// @ts-ignore
import { Modal } from '@tourmalinecore/react-tc-modal';

import { ReactComponent as IconFilter } from '../../../../../../assets/images/icon-filter.svg';

import './MobileFiltrationPopup.css';

export default function MobileFiltrationPopup({
  // @ts-ignore
  filterableColumns,
  // @ts-ignore
  setAllFilters,
  // @ts-ignore
  onClose,
  // @ts-ignore
  languageStrings,
}) {
  // @ts-ignore
  const [draftFilters, setDraftFilters] = useState(filterableColumns.map((column) => ({
    id: column.id,
    value: column.filterValue,
  })));

  const {
    titleLabel,
  } = languageStrings.filtration;

  return (
    <Modal
      overlay
      title={titleLabel}
      icon={<IconFilter />}
      content={(
        <div className="tc-table-mobile-filtration">
          {
            filterableColumns

            // @ts-ignore
              .map((column) => (
                <div
                  key={`filter-${column.id}`}
                  className="tc-table-mobile-filtration__column"
                >
                  <div className="tc-table-mobile-filtration__title">
                    {column.render(`Header`)}
                  </div>
                  <div className="tc-table-mobile-filtration__field">
                    {
                      column.render(`Filter`, {
                        filterValueOverride: draftFilters.find((draftFilter: { id: any }) => draftFilter.id === column.id).value,
                        setFilterOverride: onDraftFilterChange,
                      })
                    }
                  </div>
                </div>
              ))
          }
        </div>
      )}
      onClose={onClose}
      showApply
      onApply={onApply}
      showCancel
      language={languageStrings.langKey}
    />
  );

  function onDraftFilterChange(columnId: any, newFilterValue: any) {
    setDraftFilters(draftFilters.map((draftFilter: { id: any }) => (draftFilter.id === columnId
      ? {
        ...draftFilter,
        value: newFilterValue,
      }
      : draftFilter
    )));
  }

  function onApply() {
    setAllFilters(draftFilters);
    onClose();
  }
}
