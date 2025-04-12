import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updateOrderToPaid } from '@/lib/actions/order.actions';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia',
});

export async function POST(req: NextRequest) {
  let event: Stripe.Event;

  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err: any) {
    console.error('Stripe webhook error:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Check for successful payment
  if (event.type === 'charge.succeeded') {
    const object = event.data.object;
    const orderId = object.metadata?.orderId;

    if (!orderId) {
      console.error('Missing orderId in metadata');
      return NextResponse.json({ error: 'Invalid metadata' }, { status: 400 });
    }

    try {
      await updateOrderToPaid({
        orderId,
        paymentResult: {
          id: object.id,
          status: 'COMPLETED',
          email_address: object.billing_details?.email ?? '',
          pricePaid: (object.amount / 100).toFixed(),
        },
      });

      return NextResponse.json({
        message: 'updateOrderToPaid was successful',
      });
    } catch (err) {
      console.error('Failed to update order:', err);
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: 'Unhandled event type' });
}
