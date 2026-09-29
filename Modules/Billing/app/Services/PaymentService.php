<?php

namespace Modules\Billing\Services;

use App\Enums\UserType;
use App\Jobs\SendGoogleAnalyticsEvent;
use App\Jobs\SendMetaCapiEvent;
use App\Models\Instructor;
use App\Models\User;
use App\Services\GoogleAnalyticsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Modules\Billing\Models\PaymentHistory;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseCoupon;
use Modules\Course\Services\CourseCouponService;
use Modules\Course\Services\CourseEnrollmentService;
use Modules\Course\Services\CourseService;
use Modules\Exam\Models\Exam;
use Modules\Exam\Models\ExamCoupon;
use Modules\Exam\Services\ExamCouponService;
use Modules\Exam\Services\ExamEnrollmentService;
use Modules\Exam\Services\ExamService;
use Modules\Store\Models\Product;
use Modules\Store\Models\ProductCoupon;
use Modules\Store\Services\ProductCouponService;
use Modules\Store\Services\ProductOrderService;
use Modules\Store\Services\ProductService;

class PaymentService
{
    public function __construct(
        private ExamService $examService,
        private CourseService $courseService,
        private ProductService $productService,
        private CourseCouponService $courseCoupon,
        private CourseEnrollmentService $courseEnrollment,
        private ExamEnrollmentService $examEnrollment,
        private ExamCouponService $examCoupon,
        private ProductCouponService $productCoupon,
        private ProductOrderService $productOrderService,
        private GoogleAnalyticsService $googleAnalytics,
    ) {}

    public function getCheckoutItem(string $item_type, string $item_id, ?string $coupon_code)
    {
        $item = null;
        $coupon = null;

        if ($item_type === 'course') {
            $item = $this->courseService->getCheckoutCourse($item_id);

            if ($coupon_code) {
                $coupon = $this->courseCoupon->getCourseValidCoupon($item_id, $coupon_code);
            }
        } elseif ($item_type === 'product') {
            $item = $this->productService->getCheckoutProduct($item_id);

            if ($coupon_code) {
                $coupon = $this->productCoupon->getProductValidCoupon($item_id, $coupon_code);
            }
        } else {
            $item = $this->examService->getCheckoutExam($item_id);

            if ($coupon_code) {
                $coupon = $this->examCoupon->getExamValidCoupon($item_id, $coupon_code);
            }
        }

        $calculatedItemPrice = $this->calculateItemPrice($item, $coupon);

        return [
            'item' => $item,
            'coupon' => $coupon,
            ...$calculatedItemPrice,
        ];
    }

    public function validateExamCoupons(string $item_type, string $item_id)
    {
        if ($item_type === 'exam') {
            return $this->examCoupon->getExamValidCoupons($item_id);
        }

        if ($item_type === 'product') {
            return $this->productCoupon->getProductValidCoupons($item_id);
        }

        return $this->courseCoupon->getCourseValidCoupons($item_id);
    }

    public function coursesBuy(
        string $paymentMethod,
        string $item_type,
        string $item_id,
        string $transactionId,
        float $taxAmount,
        float $totalPrice,
        ?string $couponCode,
        ?string $user_id = null
    ) {
        $user_id = $user_id ?? Auth::user()->id;
        $invoice_no = random_int(10000000, 99999999);
        $instructorRevenue = app('system')->fields['instructor_revenue'];

        // Initialize variables to avoid undefined errors
        $instructor = null;
        $historyData = [];
        $contentName = null;

        // Handle course purchase
        if ($item_type === 'course') {
            $course = Course::findOrFail($item_id);
            $instructor = Instructor::with('user')
                ->where('id', $course->instructor_id)
                ->first();

            $historyData = [
                'purchase_type' => Course::class,
                'purchase_id' => $course->id,
            ];
            $contentName = $course->title;

            if ($paymentMethod !== 'offline') {
                $this->courseEnrollment->createCourseEnroll([
                    'user_id' => $user_id,
                    'course_id' => $course->id,
                    'enrollment_type' => 'paid',
                ]);
            }

            // $this->cartService->clearCart($user_id);
        }

        // Handle exam purchase
        if ($item_type === 'exam') {
            $exam = Exam::findOrFail($item_id);
            $instructor = Instructor::with('user')
                ->where('id', $exam->instructor_id)
                ->first();

            $historyData = [
                'purchase_type' => Exam::class,
                'purchase_id' => $exam->id,
            ];
            $contentName = $exam->title;

            if ($paymentMethod !== 'offline') {
                $this->examEnrollment->createExamEnroll([
                    'user_id' => $user_id,
                    'exam_id' => $exam->id,
                    'enrollment_type' => 'paid',
                ]);
            }
        }

        // Handle product purchase
        if ($item_type === 'product') {
            $product = Product::findOrFail($item_id);
            $instructor = Instructor::with('user')
                ->where('id', $product->instructor_id)
                ->first();

            $historyData = [
                'purchase_type' => Product::class,
                'purchase_id' => $product->id,
            ];
            $contentName = $product->title;

            if ($paymentMethod !== 'offline') {
                $this->productOrderService->createOrder([
                    'user_id' => $user_id,
                    'product_id' => $product->id,
                    'instructor_id' => $product->instructor_id,
                    'quantity' => 1,
                    'unit_price' => $product->price ?? 0,
                    'subtotal' => round($totalPrice - $taxAmount, 2),
                    'discount' => 0,
                    'tax' => $taxAmount,
                    'total' => $totalPrice,
                    'coupon_code' => $couponCode,
                ]);

                if (! $product->unlimited_inventory && $product->inventory !== null) {
                    $product->decrement('inventory');
                }
            }
        }

        // Calculate revenue split
        if ($instructor->user->role == UserType::ADMIN->value) {
            $historyData['admin_revenue'] = $totalPrice;
        } else {
            $instructorRevenueAmount = $totalPrice * ($instructorRevenue / 100);
            $historyData['instructor_revenue'] = $instructorRevenueAmount - $taxAmount;
            $historyData['admin_revenue'] = ($totalPrice - $instructorRevenueAmount) + $taxAmount;
        }

        // Create payment history
        PaymentHistory::create([
            'user_id' => $user_id,
            'amount' => $totalPrice,
            'tax' => $taxAmount,
            'payment_type' => $paymentMethod,
            'coupon' => $couponCode,
            'transaction_id' => $transactionId,
            'invoice' => $invoice_no,
            ...$historyData,
        ]);

        $this->trackPurchase($user_id, $transactionId, $item_type, $totalPrice, $contentName);
    }

    /**
     * Fire the Meta Pixel/CAPI "Purchase" event: flashes the event to the
     * browser pixel and dispatches the server-side Conversions API job
     * with the same event_id so Meta de-duplicates the two.
     */
    private function trackPurchase(string $user_id, string $transactionId, string $item_type, float $totalPrice, ?string $contentName): void
    {
        $buyer = User::find($user_id);

        if (! $buyer) {
            return;
        }

        $eventId = 'purchase_'.$transactionId;
        $currency = app('system')->fields['selling_currency'] ?? 'USD';
        $request = request();

        session()->flash('metaPixelEvent', [
            'event' => 'Purchase',
            'event_id' => $eventId,
            'value' => $totalPrice,
            'currency' => $currency,
            'content_name' => $contentName,
        ]);

        SendMetaCapiEvent::dispatch(
            'Purchase',
            $eventId,
            [
                'email' => $buyer->email,
                'external_id' => (string) $buyer->id,
                'ip' => $request?->ip(),
                'user_agent' => $request?->userAgent(),
                'fbc' => $request?->cookie('_fbc'),
                'fbp' => $request?->cookie('_fbp'),
            ],
            array_filter([
                'value' => $totalPrice,
                'currency' => $currency,
                'content_type' => 'product',
                'content_name' => $contentName,
                'content_category' => $item_type,
            ]),
            $request?->headers->get('referer'),
        );

        $this->trackGooglePurchase($buyer, $transactionId, $item_type, $totalPrice, $currency, $contentName, $request);
    }

    /**
     * Fire the Google Analytics "purchase" event. GA4 dedups purchase by
     * transaction_id when the browser and Measurement Protocol both send
     * it, but that isn't guaranteed for web streams — so when MP is
     * enabled we send it server-side only and skip the browser fallback.
     */
    private function trackGooglePurchase(
        User $buyer,
        string $transactionId,
        string $item_type,
        float $totalPrice,
        string $currency,
        ?string $contentName,
        ?Request $request,
    ): void {
        if ($this->googleAnalytics->isMpEnabled()) {
            SendGoogleAnalyticsEvent::dispatch(
                'purchase',
                $this->googleAnalytics->extractClientIdFromCookie($request?->cookie('_ga')),
                (string) $buyer->id,
                array_filter([
                    'transaction_id' => $transactionId,
                    'value' => $totalPrice,
                    'currency' => $currency,
                    'content_name' => $contentName,
                    'item_category' => $item_type,
                ]),
            );

            return;
        }

        if ($this->googleAnalytics->isAnalyticsEnabled()) {
            session()->flash('googleAnalyticsEvent', [
                'event' => 'purchase',
                'transaction_id' => $transactionId,
                'value' => $totalPrice,
                'currency' => $currency,
                'content_name' => $contentName,
            ]);
        }
    }

    public function calculateItemPrice(Exam|Course|Product $item, ExamCoupon|CourseCoupon|ProductCoupon|null $coupon): array
    {
        $originalPrice = round($item->price, 2);
        $regularDiscount = round($item->discount ? ($item->price - $item->discount_price) : 0, 2);
        $subtotal = round($item->discount ? $item->discount_price : $item->price, 2);
        $sellingTax = app('system')->fields['selling_tax'];

        // Calculate coupon discount based on discount type
        $couponDiscount = 0;
        if ($coupon) {
            if ($coupon->discount_type === 'percentage') {
                // Calculate percentage discount from subtotal
                $couponDiscount = round(($subtotal * $coupon->discount) / 100, 2);
            } else {
                // Fixed discount amount
                $couponDiscount = round($coupon->discount, 2);
            }
        }

        $discountedPrice = round($subtotal - $couponDiscount, 2);
        $taxAmount = round(($discountedPrice * $sellingTax) / 100, 2);
        $finalPrice = round($discountedPrice + $taxAmount, 2);

        return [
            'originalPrice' => $originalPrice,
            'regularDiscount' => $regularDiscount,
            'subtotal' => $subtotal,
            'taxAmount' => $taxAmount,
            'couponDiscount' => $couponDiscount,
            'discountedPrice' => $discountedPrice,
            'finalPrice' => $finalPrice,
        ];
    }

    /**
     * Convert currency using external API (Optional upgrade)
     * Uncomment the API call in convertCurrency() to use this
     *
     * @param  float  $amount
     * @param  string  $fromCurrency
     * @param  string  $toCurrency
     * @return float|null
     */
    private function convertCurrencyWithAPI($amount, $fromCurrency, $toCurrency)
    {
        try {
            // Using free ExchangeRate-API (no API key required)
            $response = Http::timeout(5)->get("https://api.exchangerate-api.com/v4/latest/{$fromCurrency}");

            if ($response->successful()) {
                $data = $response->json();
                $rate = $data['rates'][$toCurrency] ?? null;

                if ($rate) {
                    return round($amount * $rate, 2);
                }
            }
        } catch (\Exception $e) {
            // API failed, fall back to fixed rates
        }

        return null;
    }
}
