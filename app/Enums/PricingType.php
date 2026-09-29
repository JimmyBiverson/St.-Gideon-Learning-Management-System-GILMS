<?php

namespace App\Enums;

enum PricingType: string
{
    case FREE = 'free';
    case PAID = 'paid';

    public function getLabel(): string
    {
        return match ($this) {
            self::FREE => 'Free',
            self::PAID => 'Paid',
        };
    }
}
