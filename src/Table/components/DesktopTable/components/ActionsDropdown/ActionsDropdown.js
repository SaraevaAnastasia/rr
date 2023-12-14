import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';

import { getRelativePosition } from '../../../../utils/getRelativePosition';
import useOnClickOutside from '../../../../hooks/useOnClickOutside';

import './ActionsDropdown.css';

export default function ActionsDropdown({
  tableContainerRef,
  actions,
  rowWithValues,
}: {
  tableContainerRef: any;
  actions: any;
  rowWithValues: any;
}) {
  const dropdownContainer = useRef();
  const dropdownList = useRef();
  const [isOpened, setIsOpened] = useState(false);

  useOnClickOutside([dropdownContainer, dropdownList], () => setIsOpened(false));

  const listPosition = getRelativePosition(dropdownContainer.current, tableContainerRef.current);

  return (
    <div
      // @ts-ignore
      ref={dropdownContainer}
      className="tc-table-desktop-actions-dropdown"
    >
      <button
        type="button"
        className="tc-table-desktop-actions-dropdown__button"
        onClick={() => setIsOpened(!isOpened)}
      >
        <span />
      </button>

      {isOpened && ReactDOM.createPortal(
        <div
        // @ts-ignore
          ref={dropdownList}
          style={{
            // @ts-ignore
            top: listPosition.top + dropdownContainer.current.offsetHeight / 2,
          }}
          className="tc-table-desktop-actions-dropdown__list"
        >
          {
            actions
              .filter((action: { show: (arg0: any) => any }) => action.show(rowWithValues))
              // eslint-disable-next-line max-len
              .map((action: { name: any; onClick: (arg0: React.MouseEvent<HTMLButtonElement, MouseEvent>, arg1: any) => void; renderIcon: (arg0: any) => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; renderText: (arg0: any) => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined }) => (
                <button
                  key={`${action.name}-${rowWithValues.id}`}
                  type="button"
                  className="tc-table-desktop-actions-dropdown__action"
                  onClick={(e) => {
                    setIsOpened(!isOpened);

                    if (action.onClick) {
                      action.onClick(e, rowWithValues);
                    }
                  }}
                >
                  {
                    action.renderIcon && (
                      <span className="tc-table-desktop-actions-dropdown__action-icon">
                        {action.renderIcon(rowWithValues)}
                      </span>
                    )
                  }

                  {action.renderText(rowWithValues)}
                </button>
              ))
          }
        </div>,
        tableContainerRef.current,
      )}
    </div>
  );
}
