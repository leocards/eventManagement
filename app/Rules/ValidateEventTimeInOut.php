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
        $event = request()->route('event');

        $currentTime = Carbon::now();
        $timeIn = request()->input('timeIn');
        $timeInCutoff = request()->input('timeInCutoff');
        $timeOut = request()->input('timeOut');
        $timeOutCutoff = request()->input('timeOutCutoff');
        //dd($timeIn);
        $eventDateTime = Carbon::createFromFormat('Y-m-d H:i', request()->input('date.start').' '.$timeIn);
        $formattedCurrent = Carbon::createFromFormat('Y-m-d H:i', $currentTime->format('Y-m-d H:i'));

        //dd($formattedCurrent->gte($eventDateTime));

        // check if the validation is from update request by checking if event is not null
        if($event) {
            $eventTimeIn = $event->eventCode->first();
            $timeInEvent = Carbon::parse($eventTimeIn->time_in)->format('H:i');

            //dd($formattedCurrent->gt($eventDateTime));
            if($timeInEvent != $timeIn && $attribute == 'timeIn' && $formattedCurrent->gte($eventDateTime)) {
                $fail('Cannot update time in when event is ongoing.');
            }else if($formattedCurrent->lt($eventDateTime) && $attribute == 'timeIn' && $timeInEvent != $timeIn) {
                $fail('Invalid time in, must be future time.');
            }
        } else {
            if($attribute == 'timeIn' && $eventDateTime->isToday()) {
                if(Carbon::parse($timeIn)->lt($currentTime)) {
                    $fail('Invalid time in, must be future time.');
                }
            }
        }

        /* if(!request()->route('event') && $attribute == 'timeIn' && request()->input('initialDate.withTimeChanges')) {
            if($eventDateTime->lte($currentTime->format('Y-m-d H:i'))) {
                $fail('Invalid :attribute, must be future time.');
            }
        } */

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
