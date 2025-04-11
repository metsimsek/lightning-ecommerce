import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import { updateOrderToPaidCOD } from '@/lib/actions/order.actions';

export const MarkAsPaidButton = ({ orderId }: { orderId: string }) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  return (
    <Button
      type='button'
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const res = await updateOrderToPaidCOD(orderId);
          toast({
            variant: res.success ? 'default' : 'destructive',
            description: res.message,
          });
        })
      }
    >
      {isPending ? 'processing...' : 'Mark As Paid'}
    </Button>
  );
};
