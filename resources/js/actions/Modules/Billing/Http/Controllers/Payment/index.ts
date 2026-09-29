import PaymentController from './PaymentController'
import PaymentReportController from './PaymentReportController'
import PaypalController from './PaypalController'
import StripeController from './StripeController'
import MollieController from './MollieController'
import PaystackController from './PaystackController'
import RazorpayController from './RazorpayController'
import OfflineController from './OfflineController'
import FlutterwaveController from './FlutterwaveController'
import XenditController from './XenditController'
import SslCommerzController from './SslCommerzController'
import EpsController from './EpsController'
const Payment = {
    PaymentController: Object.assign(PaymentController, PaymentController),
PaymentReportController: Object.assign(PaymentReportController, PaymentReportController),
PaypalController: Object.assign(PaypalController, PaypalController),
StripeController: Object.assign(StripeController, StripeController),
MollieController: Object.assign(MollieController, MollieController),
PaystackController: Object.assign(PaystackController, PaystackController),
RazorpayController: Object.assign(RazorpayController, RazorpayController),
OfflineController: Object.assign(OfflineController, OfflineController),
FlutterwaveController: Object.assign(FlutterwaveController, FlutterwaveController),
XenditController: Object.assign(XenditController, XenditController),
SslCommerzController: Object.assign(SslCommerzController, SslCommerzController),
EpsController: Object.assign(EpsController, EpsController),
}

export default Payment