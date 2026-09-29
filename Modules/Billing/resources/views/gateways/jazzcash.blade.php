<!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>JazzCash Payment</title>
   <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="flex min-h-screen items-center justify-center bg-gray-100">
   <div class="w-full max-w-[400px] overflow-hidden rounded-lg bg-white shadow-lg">
      <div class="bg-green-600 p-6 text-white">
         <h2 class="text-lg font-bold">Redirecting to JazzCash</h2>
         <p class="mt-1 text-sm text-green-100">Please wait while we securely redirect you to JazzCash to complete your payment.</p>
      </div>

      <div class="p-6">
         <div class="flex items-center justify-center py-4">
            <svg class="h-10 w-10 animate-spin text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
               <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
         </div>
         <p class="text-center text-sm text-gray-500">Do not close or refresh this page.</p>
      </div>
   </div>

   <form id="jazzcash-form" action="{{ $actionUrl }}" method="POST" style="display:none">
      @foreach ($fields as $key => $value)
         <input type="hidden" name="{{ $key }}" value="{{ $value }}">
      @endforeach
   </form>

   <script>
      document.addEventListener('DOMContentLoaded', function () {
         setTimeout(function () {
            document.getElementById('jazzcash-form').submit();
         }, 1000);
      });
   </script>
</body>

</html>
