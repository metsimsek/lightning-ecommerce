import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import { deliverOrder } from '@/lib/actions/order.actions';

// Button to mark order as delivered
export const MarkAsDeliveredButton = ({ orderId }: { orderId: string }) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  return (
    <Button
      type='button'
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const res = await deliverOrder(orderId);
          toast({
            variant: res.success ? 'default' : 'destructive',
            description: res.message,
          });
        })
      }
    >
      {isPending ? 'processing...' : 'Mark As Delivered'}
    </Button>
  );
};
