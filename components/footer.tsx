import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t'>
      <div className='p-5 flex items-center justify-between '>
        <span>{currentYear}</span>
        <div className='relative w-32 sm:w-40 md:w-48 h-12'>
          <Image
            src='/images/logo-footer.png'
            alt={`${APP_NAME} logo`}
            fill
            sizes='(min-width: 768px) 12rem, (min-width: 640px) 10rem, 8rem'
            className='object-contain'
          />
        </div>
        <span>All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
