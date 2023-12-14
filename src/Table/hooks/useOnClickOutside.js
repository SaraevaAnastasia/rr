import { useEffect } from 'react';

// @ts-ignore
export default function useOnClickOutside(refs, handler) {
  useEffect(
    () => {
      // @ts-ignore
      const listener = (event) => {
        // @ts-ignore
        if (refs.some((ref) => !ref.current)) {
          return;
        }

        // Do nothing if clicking ref's element or descendent elements
        // @ts-ignore
        if (refs.some((ref) => ref.current.contains(event.target))) {
          return;
        }

        handler(event);
      };

      document.addEventListener(`mousedown`, listener);
      document.addEventListener(`touchstart`, listener);

      return () => {
        document.removeEventListener(`mousedown`, listener);
        document.removeEventListener(`touchstart`, listener);
      };
    },

    [refs, handler],
  );
}
