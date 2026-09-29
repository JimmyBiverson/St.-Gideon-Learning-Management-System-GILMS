<?php

namespace App\Enums;

enum SystemType: string
{
    case ADMINISTRATIVE = 'administrative';
    case COLLABORATIVE = 'collaborative';

    public function getLabel(): string
    {
        return match ($this) {
            self::ADMINISTRATIVE => 'Administrative',
            self::COLLABORATIVE => 'Collaborative',
        };
    }
}
