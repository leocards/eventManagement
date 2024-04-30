<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidVirtualVenueUrl implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if((!request()->input('venue') || request()->input('venue') == "") && request()->input('platform') === 'Online Platform') {
            $fail('The URL field is required.');

        }else if(request()->input('platform') === 'Online Platform' && filter_var($value, FILTER_VALIDATE_URL) === false) {
            $fail('The URL field must be a valid URL.');
        }
    }
}
