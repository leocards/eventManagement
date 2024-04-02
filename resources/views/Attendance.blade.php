<x-main-layout>
    <table>
        <thead>
            <tr>
                <x-table-head-cell 
                    :bordered="''" 
                    styles="text-align: center; font-weight: 700 !important; font-size: 24px; vertical-align: center;" 
                    height="40" 
                    colspan="6"
                >
                    Attendance Summary Report
                </x-table-head-cell>
            </tr>
            @if ($event)
                <tr>
                    <x-table-head-cell 
                        styles="text-align: center; font-size: 12px; font-weight: 400 !important; vertical-align: center;" 
                        colspan="6"
                        height="60"
                    >
                        {{$event->title}} <br>
                        {{convertDate($event->dateStart, $event->dateEnd)}} | {{ getTime($event->time_in) }} - {{ getTime($event->time_out) }} <br>
                        {{ $event->platform == 'Face-to-face' ? '@ '. $event->venue : 'Online' }} 
                    </x-table-head-cell>
                </tr>
            @endif
        </thead>
        <thead>
            <tr>
                <x-table-head-cell width="150px">Date</x-table-head-cell>
                <x-table-head-cell width="250px">Trainee</x-table-head-cell>
                <x-table-head-cell width="500px">Event</x-table-head-cell>
                <x-table-head-cell width="80px" styles="text-align: center;">In</x-table-head-cell>
                <x-table-head-cell width="80px" styles="text-align: center;">Out</x-table-head-cell>
                <x-table-head-cell width="120px" styles="text-align: center;">Remarks</x-table-head-cell>
            </tr>
        </thead>
        <tbody>
            @if ($attendances->count() > 1)
                @foreach ($attendances as $att)
                    <tr>
                        <x-table-head-cell width="150px">{{ \Carbon\Carbon::now()->format('M. d Y') }}</x-table-head-cell>
                        <x-table-head-cell width="250px">{{ $att->participants['name'] }}</x-table-head-cell>
                        <x-table-head-cell width="500px">{{ $att->event['title'] }}</x-table-head-cell>
                        <x-table-head-cell width="80px" styles="text-align: center;">
                            {{ getTime($att->time_in) }}
                        </x-table-head-cell>
                        <x-table-head-cell width="80px" styles="text-align: center;">
                            {{ getTime($att->time_out) }}
                        </x-table-head-cell>
                        <x-table-head-cell width="120px" styles="text-align: center;">
                            {{ checkRemarkStatusOfTrainee($att->time_in, $att->event_time_in, $att->time_in_cutoff) }}
                        </x-table-head-cell>
                    </tr>
                @endforeach
            @endif
        </tbody>
    </table>
</x-main-layout>