<?php

if (!function_exists('checkRemarkStatusOfTrainee')) {
    function checkRemarkStatusOfTrainee($log, $timeIn, $cutOff) {
        $timeLog = \Carbon\Carbon::parse($log);
        $eventTimeIn = \Carbon\Carbon::parse($timeIn);
        $eventCutoff = \Carbon\Carbon::parse($cutOff);

        if($timeLog->lt($eventTimeIn)) {
            return 'Early';
        } else if($timeLog->between($eventTimeIn, $eventCutoff)) {
            return 'On Time';
        } else return 'Late';
    }
}

if (!function_exists('getTime')) {
    function getTime($time) {
        return $time?\Carbon\Carbon::parse($time)->format('h:i a'):null;
    }
}

if (!function_exists('convertDate')) {
    function convertDate($startDate, $endDate) {
        $start = \Carbon\Carbon::parse($startDate);
        $end = \Carbon\Carbon::parse($endDate??$startDate);

        if($endDate) {
            if($start->isSameMonth($end))
                return $start->format('F d') . ' - ' . $end->format('d, Y');
            else 
                return $start->format('F d') . ' - ' . $end->format('F d, Y');
        } else {
            return $start->format('F d, Y');
        }
    }
}