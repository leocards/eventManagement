<table>
    <thead>
        <tr>
            <x-table-head-cell 
                :bordered="''" 
                styles="text-align: center; font-weight: 700 !important; font-size: 24px; vertical-align: center;" 
                height="40" 
                colspan="7"
            >
                Attendance Summary Report
            </x-table-head-cell>
        </tr>
        @if ($event)
            <tr>
                <x-table-head-cell 
                    styles="text-align: center; font-size: 12px; font-weight: 400 !important; vertical-align: center;" 
                    colspan="7"
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
            <x-table-head-cell width="250px">Name</x-table-head-cell>
            <x-table-head-cell width="70px">Sex</x-table-head-cell>
            <x-table-head-cell width="300px">Position/Designation</x-table-head-cell>
            <x-table-head-cell width="150px" styles="text-align: center;">Area of Assignment</x-table-head-cell>
            <x-table-head-cell width="250px" styles="text-align: center;">Email</x-table-head-cell>
            <x-table-head-cell width="120px" styles="text-align: center;">Time In</x-table-head-cell>
            <x-table-head-cell width="120px" styles="text-align: center;">Time Out</x-table-head-cell>
        </tr>
    </thead>
    <tbody>
        @if ($attendances->count() > 0)
            @foreach ($attendances as $att)
                <tr>
                    <x-table-head-cell width="250px">{{ $att->participants['name'] }}</x-table-head-cell>
                    <x-table-head-cell width="70px">{{ $att->participants['gender'] }}</x-table-head-cell>
                    <x-table-head-cell width="300px">{{ $att->participants['position'] }}</x-table-head-cell>
                    <x-table-head-cell width="150px">{{ $att->participants['province'] }}</x-table-head-cell>
                    <x-table-head-cell width="250px">{{ $att->participants['email'] }}</x-table-head-cell>
                    <x-table-head-cell width="80px" styles="text-align: center;">
                        {{ getTime($att->time_in) }}
                    </x-table-head-cell>
                    <x-table-head-cell width="80px" styles="text-align: center;">
                        {{ getTime($att->time_out) }}
                    </x-table-head-cell>
                </tr>
            @endforeach
        @endif
    </tbody>
</table>