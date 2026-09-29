<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Braintree Payment</title>
   <script src="https://cdn.tailwindcss.com"></script>
   <script src="https://js.braintreegateway.com/web/dropin/1.43.0/js/dropin.min.js"></script>
</head>

<body class="flex min-h-screen items-center justify-center bg-gray-100">
   <div class="w-full max-w-[480px] overflow-hidden rounded-lg bg-white shadow-lg">
      <div class="p-6">
         <h2 class="mb-1 text-xl font-bold text-gray-900">Complete Payment</h2>
         <p class="mb-5 text-sm text-gray-500">{{ $item->title }}</p>

         <div class="mb-4 flex items-center justify-between rounded-lg border bg-gray-50 px-4 py-3">
            <span class="text-sm text-gray-600">Total Amount</span>
            <span class="text-xl font-bold text-blue-600">{{ $currency }} {{ number_format($amount, 2) }}</span>
         </div>

         <form id="payment-form" action="{{ $action }}" method="POST">
            @csrf
            <div id="dropin-container"></div>

            <div id="error-message" class="mb-3 hidden rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"></div>

            <button
               id="submit-button"
               type="submit"
               class="mt-4 flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
               <svg id="btn-icon" class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
               </svg>
               Pay {{ $currency }} {{ number_format($amount, 2) }}
            </button>
         </form>

         <a href="{{ $cancelUrl }}" class="mt-3 block text-center text-sm text-gray-500 underline hover:text-gray-700">
            Cancel and go back
         </a>
      </div>
   </div>

   <script>
      braintree.dropin.create({
         authorization: '{{ $clientToken }}',
         container: '#dropin-container',
         paypal: {
            flow: 'vault'
         }
      }, function (createErr, instance) {
         if (createErr) {
            document.getElementById('error-message').textContent = 'Failed to load payment form. Please refresh the page.';
            document.getElementById('error-message').classList.remove('hidden');
            return;
         }

         var form = document.getElementById('payment-form');
         var submitButton = document.getElementById('submit-button');

         form.addEventListener('submit', function (event) {
            event.preventDefault();
            submitButton.disabled = true;
            submitButton.innerHTML = '<svg class="mr-2 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...';

            instance.requestPaymentMethod(function (requestErr, payload) {
               if (requestErr) {
                  submitButton.disabled = false;
                  submitButton.innerHTML = 'Pay {{ $currency }} {{ number_format($amount, 2) }}';
                  document.getElementById('error-message').textContent = requestErr.message;
                  document.getElementById('error-message').classList.remove('hidden');
                  return;
               }

               var nonceInput = document.createElement('input');
               nonceInput.type = 'hidden';
               nonceInput.name = 'payment_method_nonce';
               nonceInput.value = payload.nonce;
               form.appendChild(nonceInput);

               form.submit();
            });
         });
      });
   </script>
</body>

</html>
