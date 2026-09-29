import {
   Carousel,
   CarouselContent,
   CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const TopSponsorsCarousel1 = ({ data }: { data: Collection<any> }) => {
   return (
      <Carousel
         opts={{ align: 'start', loop: true }}
         plugins={[Autoplay({ delay: 2000 })]}
      >
         <CarouselContent>
            {data &&
               data.ids.map((partner, index) => (
                  <CarouselItem
                     key={`item-${index}`}
                     className="basis-full md:basis-1/2 lg:basis-1/5"
                  >
                     <div className="flex items-center justify-center">
                        <img
                           src={partner.image}
                           alt=""
                           className="h-7 w-auto"
                        />
                     </div>
                  </CarouselItem>
               ))}
         </CarouselContent>
      </Carousel>
   );
};

export default TopSponsorsCarousel1;
