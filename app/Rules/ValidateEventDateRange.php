<?php

namespace App\Rules;

use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidateEventDateRange implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $event = request()->route('event');

        $startDate = request()->input('date.start');
        $endDate = request()->input('date.end');

        if(request()->input('date.isRange')) {

            if(Carbon::parse($event->dateEnd)->lt(Carbon::now()->format('Y-m-d')) && ($event->dateStart != $startDate || $event->dateEnd != $endDate)) {
                $fail('Cannot update event date when ended.');
            }

            if(!$startDate) {
                $fail('The "date from" field is required.');
            }else if(!$endDate) {
                $fail('The "date to" field is required.');
            }else if(Carbon::parse($startDate)->lt(Carbon::now()->format('Y-m-d')) && !$event) {
                $fail('The "date from" must be future dates.');
            }else if($startDate == $endDate) {
                $fail('The "date to" should not be equal to "date from"');
            } else if($startDate > $endDate) {
                $fail('The "date to" should not be before "date from"');
            } 
        } else {
            // if the date to be updated is now not a date range, notify user of the possible error
            /* if(Carbon::parse($startDate)->gte(now())) {
                $fail('');
            } */

            if(Carbon::parse($event->dateStart)->lt(Carbon::now()->format('Y-m-d')) && ($event->dateStart != $startDate)) {
                $fail('Cannot update event date when ended.');
            }

            if(!$startDate) {
                $fail('The date field is required.');
            }/* else if(Carbon::parse($startDate)->today() && Carbon::now()->gt($timeIn) && !$event) {
                $fail('The date time in must be later than the current time.');
            } */else if(Carbon::parse($startDate)->lt(Carbon::now()->format('Y-m-d')) && !$event) {
                $fail('The date must be future dates.');
            }
        }
    }
}
