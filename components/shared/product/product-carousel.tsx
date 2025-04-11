'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Product } from '@/types';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import Image from 'next/image';

const ProductCarousel = ({ data }: { data: Product[] }) => {
  return (
    <Carousel
      className='w-full mb-12'
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 10000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((product: Product) => (
          <CarouselItem key={product.id}>
            <Link
              href={`/product/${product.slug}`}
              aria-label={`View details for ${product.name}`}
            >
              <div className='relative mx-auto max-w-[640px] w-full px-4 transition-transform duration-300 hover:scale-[1.02] aspect-[16/9]'>
                <Image
                  src={product.banner!}
                  alt={product.name}
                  height={0}
                  width={0}
                  sizes='100vw'
                  className='w-full h-auto rounded-lg shadow-md'
                />
                <div className='absolute inset-0 flex items-end justify-center'>
                  <h2 className='bg-gray-900/60 backdrop-blur-sm text-xl font-bold px-2 text-white'>
                    {product.name}
                  </h2>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ProductCarousel;
