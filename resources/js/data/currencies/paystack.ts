// Paystack supported currencies (6 currencies across 5 African countries)
// Source: https://support.paystack.com/en/articles/2130690
const paystackCurrencies = [
   { label: 'Nigerian Naira', value: 'NGN', symbol: '₦', locale: 'en-NG' },
   { label: 'U.S. Dollar', value: 'USD', symbol: '$', locale: 'en-US' },
   { label: 'Ghanaian Cedi', value: 'GHS', symbol: '₵', locale: 'en-GH' },
   { label: 'South African Rand', value: 'ZAR', symbol: 'R', locale: 'en-ZA' },
   { label: 'Kenyan Shilling', value: 'KES', symbol: 'KSh', locale: 'en-KE' },
   {
      label: 'West African CFA Franc',
      value: 'XOF',
      symbol: 'CFA',
      locale: 'fr-SN',
   },
];
export default paystackCurrencies;
