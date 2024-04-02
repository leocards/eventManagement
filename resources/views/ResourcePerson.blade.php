<x-main-layout>
    <table>
        <x-report-header 
            label="Feedback Report Consolidation" 
            title="{{ ($event?->title) }}"
            date="{{ ($event?convertDate($event->dateStart, $event->dateEnd):'') }}"
            evaluationType="Quantitative Assessment of Resource Person"
            resourcePerson="{{ $rp->name }}"
        />

        <tr>
            <x-table-head-cell width="70px" styles="text-align: center;">No.</x-table-head-cell>
            <x-table-head-cell width="100px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">Sex</x-table-head-cell>
            <x-table-head-cell width="200px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">1. The resource person EXHIBITED KNOWLEDGE and MASTERY of the subject matter.</x-table-head-cell>
            <x-table-head-cell width="200px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">2. The presentation of CONTENT was EFFECTIVELY COMMUNICATED to the participants.</x-table-head-cell>
            <x-table-head-cell width="250px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">3. The CONCEPTS, PROCESSES, STRATEGIES, and TECHNIQUES presented were TIMELY and RELEVANT to the present context.</x-table-head-cell>
            <x-table-head-cell width="250px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">4. The METHOD OF DELIVERY used in the session was APPROPRIATE to the LEARNING STYLE of the participants.</x-table-head-cell>
            <x-table-head-cell width="200px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">5. The resource person was RESPONSIVE to participants' QUERIES.</x-table-head-cell>
            <x-table-head-cell width="200px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">6. The resource person GUIDED THE PARTICIPANTS in achieving their learning objectives.</x-table-head-cell>
            <x-table-head-cell width="200px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">7. Overall Rating of the Resource Person.</x-table-head-cell>
            <x-table-head-cell width="350px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">8. Please indicate your comment, affirmation, recommendation to help our Resource Person evaluate and assess his/her delivery of topic discussion.</x-table-head-cell>
        </tr>

        @if ($ratings)
            @foreach ($ratings as $key => $rate)
                <tr>
                    <x-table-cell> {{ ++$key }} </x-table-cell>
                    <x-table-cell styles="text-align: center;"> {{ $rate->gender->gender }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $rate->q1 }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $rate->q2 }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $rate->q3 }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $rate->q4 }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $rate->q5 }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $rate->q6 }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $rate->q7 }} </x-table-cell>
                    <x-table-cell styles="word-wrap: break-word;"> {{ $rate->comment }} </x-table-cell>
                </tr>
            @endforeach
        @endif


    </table>
</x-main-layout>