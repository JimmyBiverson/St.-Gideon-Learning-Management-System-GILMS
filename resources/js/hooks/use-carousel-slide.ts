import { useEffect, useState } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';

export function useCarouselSlide(api: CarouselApi | undefined): number {
   const [current, setCurrent] = useState(0);

   useEffect(() => {
      if (!api) {
         return;
      }

      const handleSelect = () => setCurrent(api.selectedScrollSnap());

      api.on('select', handleSelect);

      return () => {
         api.off('select', handleSelect);
      };
   }, [api]);

   return current;
}
