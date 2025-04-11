import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import Menu from '@/components/shared/header/menu';
import MainNav from './main-nav';
import AdminSearch from '@/components/admin/admin-search';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col'>
      <div className='border-b container mx-auto'>
        <div className='flex items-center h-16 px-4'>
          <Link href='/' className='w-22'>
            <Image
              src='/images/logo.png'
              height={192}
              width={192}
              alt={APP_NAME}
              className='w-16 h-auto sm:w-20 md:w-24'
            />
          </Link>
          <MainNav className='mx-6' />
          <div className='ml-auto items-center flex space-x-4'>
            <AdminSearch />
            <Menu />
          </div>
        </div>
      </div>

      <div className='flex-1 space-y-4 p-8 pt-6 container mx-auto'>
        {children}
      </div>
    </div>
  );
}
