<?php

namespace App\Rules;

use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidateEventTimeInOut implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $currentTime = Carbon::now('Asia/Manila');
        $timeIn = request()->input('timeIn');
        $timeInCutoff = request()->input('timeInCutoff');
        $timeOut = request()->input('timeOut');
        $timeOutCutoff = request()->input('timeOutCutoff');
        //dd($timeIn);
        $eventDateTime = Carbon::createFromFormat('Y-m-d H:i', request()->input('date.start').' '.$timeIn);

        if(request()->route('event') && $attribute == 'timeIn' && request()->input('initialDate.withTimeChanges')) {
            if($eventDateTime->lte($currentTime->format('Y-m-d H:i'))) {
                $fail('Invalid :attribute, must be future time.');
            }
        }

        if($attribute == "timeInCutoff") {
            if($timeIn > $timeInCutoff) {
                $fail('Invalid :attribute, should not be before "time in".');
            } else if($timeIn == $timeInCutoff) {
                $fail('Invalid :attribute, should not be the same with "time in".');
            }
        }

        if($attribute == "timeOut") {
            if($timeIn > $timeOut) {
                $fail('Invalid :attribute, should not be before "time in".');
            } else if($timeIn == $timeOut) {
                $fail('Invalid :attribute, should not be the same with "time in".');
            }
        }

        if($attribute == "timeOutCutoff") {
            if($timeOut > $timeOutCutoff) {
                $fail('Invalid :attribute, should not be before "time off".');
            } else if($timeOut == $timeOutCutoff) {
                $fail('Invalid :attribute, should not be the same with "time off".');
            }
        }
    }
}
