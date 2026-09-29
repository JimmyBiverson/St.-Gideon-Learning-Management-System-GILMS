<?php

namespace Modules\Billing\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property float $amount
 * @property string $status
 * @property string|null $payout_method
 * @property string|null $transaction_id
 * @property int|null $user_id
 */
class PayoutHistory extends Model
{
    protected $fillable = [
        'amount',
        'status',
        'payout_method',
        'transaction_id',
        'session_id',
        'user_id',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
