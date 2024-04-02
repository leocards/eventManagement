<x-main-layout>
    <table>
        <x-report-header 
            label="Feedback Report Consolidation" 
            title="{{($event?->title)}}" 
            date="{{($event?convertDate($event->dateStart, $event->dateEnd):'')}}" 
        />

        <thead>
            <tr>
                <x-table-head-cell width="70px" styles="text-align: center;">No.</x-table-head-cell>
                <x-table-head-cell width="100px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">Sex</x-table-head-cell>
                <x-table-head-cell width="100px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">1. How well the activity objectives were met.</x-table-head-cell>
                <x-table-head-cell width="100px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">2. Extent the activity has met your needs so far.</x-table-head-cell>
                <x-table-head-cell width="100px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">3. Relevance of activity to improve job.</x-table-head-cell>
                <x-table-head-cell width="100px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">4. Appropriateness of training methodologies.</x-table-head-cell>
                <x-table-head-cell width="100px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">5. Opportunities to participate in discussions.</x-table-head-cell>
                <x-table-head-cell width="100px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">6. Schedule of Acivities.</x-table-head-cell>
                <x-table-head-cell width="100px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">7. Effectiveness of Training Management.</x-table-head-cell>
                <x-table-head-cell width="100px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">8a. Logistics: Meals.</x-table-head-cell>
                <x-table-head-cell width="100px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">8b. Logistics: Accommodation.</x-table-head-cell>
                <x-table-head-cell width="100px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">8c. Logistics: Function Hall.</x-table-head-cell>
                <x-table-head-cell width="100px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">8d. Logistics: Event and Logistic Support.</x-table-head-cell>
                <x-table-head-cell width="100px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">Overall evaluation of this training.</x-table-head-cell>
            </tr>
        </thead>
        <tbody>
            @if ($consolidated)
                @foreach ($consolidated as $key => $consol)
                    <tr>
                        <x-table-cell styles="text-align: center;"> {{ ++$key }} </x-table-cell>
                        <x-table-cell styles="text-align: center;"> {{ $consol->gender->gender }} </x-table-cell>
                        <x-table-cell styles="text-align: center;"> {{ $consol->q1 }} </x-table-cell>
                        <x-table-cell styles="text-align: center;"> {{ $consol->q2 }} </x-table-cell>
                        <x-table-cell styles="text-align: center;"> {{ $consol->q3 }} </x-table-cell>
                        <x-table-cell styles="text-align: center;"> {{ $consol->q4 }} </x-table-cell>
                        <x-table-cell styles="text-align: center;"> {{ $consol->q5 }} </x-table-cell>
                        <x-table-cell styles="text-align: center;"> {{ $consol->q6 }} </x-table-cell>
                        <x-table-cell styles="text-align: center;"> {{ $consol->q7 }} </x-table-cell>
                        <x-table-cell styles="text-align: center;"> {{ $consol->q8 }} </x-table-cell>
                        <x-table-cell styles="text-align: center;"> {{ $consol->q9 }} </x-table-cell>
                        <x-table-cell styles="text-align: center;"> {{ $consol->q10 }} </x-table-cell>
                        <x-table-cell styles="text-align: center;"> {{ $consol->q11 }} </x-table-cell>
                        <x-table-cell styles="text-align: center;"> {{ $consol->q12 }} </x-table-cell>
                    </tr>
                @endforeach
            @endif
        </tbody>
    </table>
</x-main-layout>