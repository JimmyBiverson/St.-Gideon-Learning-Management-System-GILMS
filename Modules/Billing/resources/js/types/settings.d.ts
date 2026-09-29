// Start Payment Gateway Fields
interface MollieFields extends PaymentFields {
   test_api_key: string;
   live_api_key: string;
}

interface PaypalFields extends PaymentFields {
   sandbox_client_id: string;
   sandbox_secret_key: string;
   production_client_id: string;
   production_secret_key: string;
}

interface PaystackFields extends PaymentFields {
   test_public_key: string;
   test_secret_key: string;
   live_public_key: string;
   live_secret_key: string;
}

interface RazorpayFields extends PaymentFields {
   api_key: string;
   api_secret: string;
}

interface SSLCommerzFields extends PaymentFields {
   store_id: string;
   store_password: string;
}

interface EpsFields extends PaymentFields {
   username: string;
   password: string;
   hashkey: string;
   merchant_id: string;
   store_id: string;
   device_type_id: string;
}

interface StripeFields extends PaymentFields {
   webhook_secret: string;
   live_public_key: string;
   live_secret_key: string;
   test_public_key: string;
   test_secret_key: string;
}

interface PaytmFields extends PaymentFields {
   public_key: string;
   secret_key: string;
}

interface FlutterwaveFields extends PaymentFields {
   test_public_key: string;
   test_secret_key: string;
   test_encryption_key: string;
   live_public_key: string;
   live_secret_key: string;
   live_encryption_key: string;
}

interface BkashFields extends PaymentFields {
   test_app_key: string;
   test_app_secret: string;
   test_username: string;
   test_password: string;
   live_app_key: string;
   live_app_secret: string;
   live_username: string;
   live_password: string;
}

interface JazzCashFields extends PaymentFields {
   test_merchant_id: string;
   test_password: string;
   test_integrity_salt: string;
   live_merchant_id: string;
   live_password: string;
   live_integrity_salt: string;
}

interface PayhereFields extends PaymentFields {
   test_merchant_id: string;
   test_secret: string;
   live_merchant_id: string;
   live_secret: string;
}

interface ToyyibpayFields extends PaymentFields {
   test_user_secret_key: string;
   test_category_code: string;
   live_user_secret_key: string;
   live_category_code: string;
}

interface XenditFields extends PaymentFields {
   test_secret_key: string;
   live_secret_key: string;
}

interface PaytabsFields extends PaymentFields {
   region: string;
   profile_id: string;
   test_server_key: string;
   live_server_key: string;
}

interface MercadopagoFields extends PaymentFields {
   test_access_token: string;
   test_public_key: string;
   live_access_token: string;
   live_public_key: string;
}

interface PayuFields extends PaymentFields {
   test_merchant_pos_id: string;
   test_signature_key: string;
   live_merchant_pos_id: string;
   live_signature_key: string;
}

interface BraintreeFields extends PaymentFields {
   test_merchant_id: string;
   test_public_key: string;
   test_private_key: string;
   live_merchant_id: string;
   live_public_key: string;
   live_private_key: string;
}
