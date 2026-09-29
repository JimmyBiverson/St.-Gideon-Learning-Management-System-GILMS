import Breadcrumbs from '@/components/breadcrumbs';
import Tabs from '@/components/tabs';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/dashboard/layout';
import { getQueryParams } from '@/lib/route';
import { index } from '@/routes/payment-gateways';
import { router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import Mollie from '@/billing/components/mollie';
import Offline from '@/billing/components/offline';
import Paypal from '@/billing/components/paypal';
import Paystack from '@/billing/components/paystack';
import Razorpay from '@/billing/components/razorpay';
import SSLCommerz from '@/billing/components/sslcommerz';
import Stripe from '@/billing/components/stripe';
import Bkash from '../components/bkash';
import Braintree from '../components/braintree';
import Eps from '../components/eps';
import Flutterwave from '../components/flutterwave';
import JazzCash from '../components/jazzcash';
import Mercadopago from '../components/mercadopago';
import Payhere from '../components/payhere';
import Paytabs from '../components/paytabs';
import Payu from '../components/payu';
import Toyyibpay from '../components/toyyibpay';
import Xendit from '../components/xendit';

interface Props {
   payments: Settings<
      | PaypalFields
      | StripeFields
      | MollieFields
      | PaystackFields
      | RazorpayFields
      | any
   >[];
}

const Payment = ({ payments }: Props) => {
   const page = usePage();
   const params = getQueryParams(page.url);

   const tabs = payments.map((payment) => {
      let Component;

      switch (payment.sub_type) {
         case 'paypal':
            Component = Paypal;
            break;

         case 'stripe':
            Component = Stripe;
            break;

         case 'mollie':
            Component = Mollie;
            break;

         case 'paystack':
            Component = Paystack;
            break;

         case 'sslcommerz':
            Component = SSLCommerz;
            break;

         case 'razorpay':
            Component = Razorpay;
            break;

         case 'offline':
            Component = Offline;
            break;

         case 'flutterwave':
            Component = Flutterwave;
            break;

         case 'xendit':
            Component = Xendit;
            break;

         case 'bkash':
            Component = Bkash;
            break;

         case 'jazzcash':
            Component = JazzCash;
            break;

         case 'payhere':
            Component = Payhere;
            break;

         case 'toyyibpay':
            Component = Toyyibpay;
            break;

         case 'paytabs':
            Component = Paytabs;
            break;

         case 'mercadopago':
            Component = Mercadopago;
            break;

         case 'payu':
            Component = Payu;
            break;

         case 'braintree':
            Component = Braintree;
            break;

         case 'eps':
            Component = Eps;
            break;

         default:
            Component = null;
            break;
      }

      return {
         ...payment,
         Component,
      };
   });

   return (
      <>
         <Breadcrumbs
            title="Payment Gateways"
            breadcrumbs={[
               { title: 'Dashboard', href: '/dashboard' },
               { title: 'Payment Gateways' },
            ]}
            className="mb-4"
         />

         <Tabs
            value={params['tab'] ?? tabs[0].sub_type}
            className="grid grid-rows-1 gap-5 md:grid-cols-4"
         >
            <div>
               <TabsList className="horizontal-tabs-list">
                  {tabs.map(({ id, title, sub_type, Component }) => {
                     if (!Component) {
                        return null;
                     }

                     return (
                        <TabsTrigger
                           key={id}
                           value={sub_type}
                           className="horizontal-tabs-trigger"
                           onClick={() =>
                              router.get(index(), { tab: sub_type })
                           }
                        >
                           {title}
                        </TabsTrigger>
                     );
                  })}
               </TabsList>
            </div>

            <div className="md:col-span-3">
               {tabs.map((payment) => (
                  <TabsContent
                     key={payment.id}
                     value={payment.sub_type}
                     className="m-0"
                  >
                     <payment.Component payment={payment} type="payment" />
                  </TabsContent>
               ))}
            </div>
         </Tabs>
      </>
   );
};

Payment.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Payment;
