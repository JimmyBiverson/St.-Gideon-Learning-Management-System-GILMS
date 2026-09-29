import { useSyncExternalStore } from 'react';

export default function useMount(): boolean {
   return useSyncExternalStore(
      () => () => {},
      () => true,
      () => false,
   );
}
