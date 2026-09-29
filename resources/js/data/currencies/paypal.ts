// PayPal supported currencies (25 currencies)
// Source: https://developer.paypal.com/docs/reports/reference/paypal-supported-currencies/
const paypalCurrencies = [
   { label: 'Australian Dollar', value: 'AUD', symbol: 'A$', locale: 'en-AU' },
   { label: 'Brazilian Real', value: 'BRL', symbol: 'R$', locale: 'pt-BR' },
   { label: 'Canadian Dollar', value: 'CAD', symbol: 'C$', locale: 'en-CA' },
   { label: 'Chinese Yuan', value: 'CNY', symbol: '¥', locale: 'zh-CN' },
   { label: 'Czech Koruna', value: 'CZK', symbol: 'Kč', locale: 'cs-CZ' },
   { label: 'Danish Krone', value: 'DKK', symbol: 'kr', locale: 'da-DK' },
   { label: 'Euro', value: 'EUR', symbol: '€', locale: 'de-DE' },
   { label: 'Hong Kong Dollar', value: 'HKD', symbol: 'HK$', locale: 'zh-HK' },
   { label: 'Hungarian Forint', value: 'HUF', symbol: 'Ft', locale: 'hu-HU' },
   { label: 'Israeli Shekel', value: 'ILS', symbol: '₪', locale: 'he-IL' },
   { label: 'Japanese Yen', value: 'JPY', symbol: '¥', locale: 'ja-JP' },
   { label: 'Malaysian Ringgit', value: 'MYR', symbol: 'RM', locale: 'ms-MY' },
   { label: 'Mexican Peso', value: 'MXN', symbol: '$', locale: 'es-MX' },
   { label: 'Norwegian Krone', value: 'NOK', symbol: 'kr', locale: 'nb-NO' },
   {
      label: 'New Zealand Dollar',
      value: 'NZD',
      symbol: 'NZ$',
      locale: 'en-NZ',
   },
   { label: 'Philippine Peso', value: 'PHP', symbol: '₱', locale: 'en-PH' },
   { label: 'Polish Zloty', value: 'PLN', symbol: 'zł', locale: 'pl-PL' },
   { label: 'Pound Sterling', value: 'GBP', symbol: '£', locale: 'en-GB' },
   { label: 'Russian Ruble', value: 'RUB', symbol: '₽', locale: 'ru-RU' },
   { label: 'Singapore Dollar', value: 'SGD', symbol: 'S$', locale: 'en-SG' },
   { label: 'Swedish Krona', value: 'SEK', symbol: 'kr', locale: 'sv-SE' },
   { label: 'Swiss Franc', value: 'CHF', symbol: 'CHF', locale: 'de-CH' },
   { label: 'Taiwan New Dollar', value: 'TWD', symbol: 'NT$', locale: 'zh-TW' },
   { label: 'Thai Baht', value: 'THB', symbol: '฿', locale: 'th-TH' },
   { label: 'U.S. Dollar', value: 'USD', symbol: '$', locale: 'en-US' },
];

export default paypalCurrencies;
