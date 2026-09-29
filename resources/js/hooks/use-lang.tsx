import { usePage } from '@inertiajs/react';

export function useLang() {
   const { props } = usePage<SharedData>();

   return props.translate;
}
