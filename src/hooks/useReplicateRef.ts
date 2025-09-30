import {
  useEffect,
  useRef,
  type ForwardedRef,
} from 'react';

// eslint-disable-next-line unicorn/prevent-abbreviations
export const useReplicateRef = <T extends HTMLElement>(
  replicateReference: ForwardedRef<T>,
) => {
  const reference = useRef<T>(null);
  useEffect(
    () => {
      if (replicateReference && reference.current) {
        if (typeof replicateReference === 'function') {
          replicateReference(reference.current);
        } else {
          // eslint-disable-next-line no-param-reassign
          replicateReference.current = reference.current;
        }
      }
    },
    [reference],
  );
  return reference;
};
