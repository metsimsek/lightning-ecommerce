import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';

export const SignUpButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className='w-full' variant='default'>
      {pending ? 'Submitting...' : 'Sign Up'}
    </Button>
  );
};
