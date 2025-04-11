import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useTheme } from 'next-themes';
import { StripeForm } from './stripe-form';

const StripePayment = ({
  priceInCents,
  orderId,
  clientSecret,
}: {
  priceInCents: number;
  orderId: string;
  clientSecret: string;
}) => {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
  );

  const { theme, systemTheme } = useTheme();

  let themeMode: 'stripe' | 'night' | 'flat' | undefined;
  if (theme === 'dark' || systemTheme === 'dark') {
    themeMode = 'night';
  } else if (theme === 'light' || systemTheme === 'light') {
    themeMode = 'stripe';
  } else {
    themeMode = undefined;
  }

  return (
    <Elements
      options={{
        clientSecret,
        appearance: {
          theme: themeMode,
        },
      }}
      stripe={stripePromise}
    >
      <StripeForm orderId={orderId} priceInCents={priceInCents} />
    </Elements>
  );
};

export default StripePayment;
