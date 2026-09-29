import PayoutController from './PayoutController'
import PaypalController from './PaypalController'
import StripeController from './StripeController'
import MollieController from './MollieController'
import PaystackController from './PaystackController'
import RazorpayController from './RazorpayController'
import SslCommerzController from './SslCommerzController'
const Payout = {
    PayoutController: Object.assign(PayoutController, PayoutController),
PaypalController: Object.assign(PaypalController, PaypalController),
StripeController: Object.assign(StripeController, StripeController),
MollieController: Object.assign(MollieController, MollieController),
PaystackController: Object.assign(PaystackController, PaystackController),
RazorpayController: Object.assign(RazorpayController, RazorpayController),
SslCommerzController: Object.assign(SslCommerzController, SslCommerzController),
}

export default Payout