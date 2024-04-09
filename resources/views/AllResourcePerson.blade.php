<table>
    <x-report-header 
        label="Feedback Report Consolidation" 
        title="{{ ($event?->title) }}"
        date="{{ ($event?convertDate($event->dateStart, $event->dateEnd):'') }}"
        evaluationType="Quantitative Assessment of Resource Person"
        cols="{{ (8*$rps->count())+2 }}"
    />
    <tr>
        <x-table-head-cell width="70px" styles="text-align: center;" rowspan="2">No.</x-table-head-cell>
        <x-table-head-cell width="60px" styles="text-align: center; word-wrap: break-word; vertical-align: center;" rowspan="2">Sex</x-table-head-cell>
        @if ($rps)
            @foreach ($rps as $key => $item)
                <x-table-head-cell height="20" styles="text-align: center; background-color: {{$randomColors($key)}}; vertical-align: center; color: white;" row="1" col="3" colspan="8"> Resource Person: {{ $item->name }}</x-table-head-cell>
            @endforeach
        @endif
    </tr>
    <tr>
        @if ($rps)
            @foreach ($rps as $item)
                <x-table-head-cell width="60px" styles="text-align: center; word-wrap: break-word; vertical-align: center;" row="2">1.</x-table-head-cell>
                <x-table-head-cell width="60px" styles="text-align: center; word-wrap: break-word; vertical-align: center;" row="2">2.</x-table-head-cell>
                <x-table-head-cell width="60px" styles="text-align: center; word-wrap: break-word; vertical-align: center;" row="2">3.</x-table-head-cell>
                <x-table-head-cell width="60px" styles="text-align: center; word-wrap: break-word; vertical-align: center;" row="2">4.</x-table-head-cell>
                <x-table-head-cell width="60px" styles="text-align: center; word-wrap: break-word; vertical-align: center;" row="2">5.</x-table-head-cell>
                <x-table-head-cell width="60px" styles="text-align: center; word-wrap: break-word; vertical-align: center;" row="2">6.</x-table-head-cell>
                <x-table-head-cell width="60px" styles="text-align: center; word-wrap: break-word; vertical-align: center;" row="2">7.</x-table-head-cell>
                <x-table-head-cell width="200px" styles="text-align: center; word-wrap: break-word; vertical-align: center;" row="2">Comment</x-table-head-cell>
            @endforeach
        @endif
    </tr>

    @if ($ratings)
        @foreach ($ratings as $key => $rate)
            <tr>
                @foreach ($rate as $key2 => $item)
                    @if ($key2 === 0)
                        <x-table-cell> {{ ++$key }} </x-table-cell>
                        <x-table-cell styles="text-align: center;"> {{$item['gender']['gender']}} </x-table-cell>
                    @endif
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $item['q1'] }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $item['q2'] }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $item['q3'] }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $item['q4'] }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $item['q5'] }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $item['q6'] }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $item['q7'] }} </x-table-cell>
                    <x-table-cell styles="word-wrap: break-word;"> {{ $item['comment'] }} </x-table-cell>
                @endforeach
            </tr>
        @endforeach
    @endif

</table>