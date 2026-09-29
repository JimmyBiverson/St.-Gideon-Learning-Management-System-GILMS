<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Payhere Payment</title>
   <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="flex min-h-screen items-center justify-center bg-gray-100">
   <div class="w-full max-w-[420px] overflow-hidden rounded-lg bg-white shadow-lg">
      <div class="bg-blue-600 p-6 text-white">
         <h2 class="text-lg font-bold">Redirecting to Payhere</h2>
         <p class="mt-1 text-sm text-blue-100">Please wait while we securely redirect you to Payhere to complete your payment.</p>
      </div>

      <div class="p-6">
         <div class="mb-4 space-y-2 rounded-lg border bg-gray-50 p-4 text-sm">
            <div class="flex justify-between">
               <span class="text-gray-500">Item</span>
               <span class="font-medium text-gray-900">{{ $itemName }}</span>
            </div>
            <div class="flex justify-between">
               <span class="text-gray-500">Amount</span>
               <span class="font-medium text-gray-900">{{ $currency }} {{ $amount }}</span>
            </div>
         </div>

         <div class="flex items-center justify-center py-2">
            <svg class="h-8 w-8 animate-spin text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
               <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="ml-2 text-sm text-gray-500">Redirecting...</span>
         </div>
      </div>
   </div>

   <form id="payhere-form" action="{{ $actionUrl }}" method="POST" style="display:none">
      <input type="hidden" name="merchant_id" value="{{ $merchantId }}">
      <input type="hidden" name="return_url" value="{{ $returnUrl }}">
      <input type="hidden" name="cancel_url" value="{{ $returnUrl }}">
      <input type="hidden" name="notify_url" value="{{ $notifyUrl }}">
      <input type="hidden" name="order_id" value="{{ $orderId }}">
      <input type="hidden" name="items" value="{{ $itemName }}">
      <input type="hidden" name="currency" value="{{ $currency }}">
      <input type="hidden" name="amount" value="{{ $amount }}">
      <input type="hidden" name="first_name" value="{{ $firstName }}">
      <input type="hidden" name="last_name" value="{{ $lastName }}">
      <input type="hidden" name="email" value="{{ $email }}">
      <input type="hidden" name="phone" value="0000000000">
      <input type="hidden" name="address" value=".">
      <input type="hidden" name="city" value="Colombo">
      <input type="hidden" name="country" value="Sri Lanka">
      <input type="hidden" name="hash" value="{{ $hash }}">
   </form>

   <script>
      document.addEventListener('DOMContentLoaded', function () {
         setTimeout(function () {
            document.getElementById('payhere-form').submit();
         }, 1200);
      });
   </script>
</body>

</html>
