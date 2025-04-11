import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

export const SignInButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className='w-full' variant='default'>
      {pending ? 'Signing In...' : 'Sign In'}
    </Button>
  );
};
