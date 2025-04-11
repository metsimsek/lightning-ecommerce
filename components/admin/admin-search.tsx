'use client';

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Input } from '../ui/input';

const AdminSearch = () => {
  const pathname = usePathname();

  let formActionUrl: string;
  if (pathname.includes('/admin/orders')) {
    formActionUrl = '/admin/orders';
  } else if (pathname.includes('/admin/users')) {
    formActionUrl = '/admin/users';
  } else {
    formActionUrl = '/admin/products';
  }

  const searchParams = useSearchParams();
  const [queryValue, setQueryValue] = useState(searchParams.get('query') || '');

  useEffect(() => {
    setQueryValue(searchParams.get('query') || '');
  }, [searchParams]);

  return (
    <form action={formActionUrl} method='GET'>
      <Input
        type='search'
        placeholder='Search...'
        name='query'
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
        className='md:w-[100px] lg:w-[300px]'
      />
      <button className='sr-only' type='submit'>
        Search
      </button>
    </form>
  );
};

export default AdminSearch;
