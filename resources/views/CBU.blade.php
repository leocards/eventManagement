<table>
    <thead>
        <tr>
            <x-table-head-cell :bordered="''" styles="text-align: center; font-weight: 700 !important; font-size: 24px; vertical-align: center;" height="40" colspan="{{(4+($events->count()))}}">CBU Training Monitoring</x-table-head-cell>
        </tr>
    </thead>
    <thead>
        <tr>
            <x-table-head-cell>No.</x-table-head-cell>
            <x-table-head-cell>Name</x-table-head-cell>
            <x-table-head-cell>Remarks</x-table-head-cell>
            <x-table-head-cell styles="width: 180px;">Total trainings attended</x-table-head-cell>
            @foreach ($events as $event)
                <x-table-head-cell>{{$event->title}}</x-table-head-cell>
            @endforeach
        </tr>
    </thead>
    <tbody>
        <tr>
            <x-table-cell colspan="3">Total</x-table-cell>
            <x-table-cell>{{$totalAttended}}</x-table-cell>
            @foreach ($events as $event)
                <x-table-cell>{{count($event->participant) > 0 ? $event->participant[0]->total : '0'}}</x-table-cell>
            @endforeach
        </tr>
        @foreach ($users as $key => $user)
            <tr>
                <x-table-cell>{{++$key}}</x-table-cell>
                <x-table-cell width="150px">{{$user->first_name." ".$user->last_name}}</x-table-cell>
                <x-table-cell>{{$user->status != "Active"? $user->status : "" }}</x-table-cell>
                <x-table-cell>{{count($user->trainings_attended??[]) > 0 ? $user->trainings_attended[0]->trainings : "0"}}</x-table-cell>
                @foreach ($events as $event)
                    <x-table-cell>{{in_array($event->id, $user->attended_event??[])?"1":"0"}}</x-table-cell>
                @endforeach
            </tr>
        @endforeach
    </tbody>
</table>