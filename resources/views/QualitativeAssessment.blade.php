<x-main-layout>
    <table>
        <x-report-header 
            label="Feedback Report Consolidation" 
            title="{{ ($event?->title) }}" 
            date="{{ ($event?convertDate($event->dateStart, $event->dateEnd):'') }}" 
            evaluationType="Qualitative Assessment of the Traing Activity"
            cols="{{10}}"
        />

        <tr>
            <x-table-head-cell width="70px" styles="text-align: center;">No.</x-table-head-cell>
            <x-table-head-cell width="100px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">Sex</x-table-head-cell>
            <x-table-head-cell width="200px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">1. How do you feel about the sessions?</x-table-head-cell>
            <x-table-head-cell width="200px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">2. What did you enjoy most? What was the most valuable thing you learned (insights) from the activities and sessions?</x-table-head-cell>
            <x-table-head-cell width="200px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">3. What did you find challenging and difficult? Why? Please give specific examples or cases.</x-table-head-cell>
            <x-table-head-cell width="200px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">4. Based on the learning and insights you gained, what will you do differently at work after this workshop/training?</x-table-head-cell>
            <x-table-head-cell width="200px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">5. What are the facilitating factors that contributed to the success of the training activity?</x-table-head-cell>
            <x-table-head-cell width="200px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">6. What are the hindering factors in the conduct of this activity?</x-table-head-cell>
            <x-table-head-cell width="200px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">7. What are your suggestions to improve the conduct of similar activities in the future?</x-table-head-cell>
            <x-table-head-cell width="200px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">8. What other Capability Building interventions or support do you need to enhance your work performance?</x-table-head-cell>
        </tr>
        @if ($assessment)
            @foreach ($assessment as $key => $asses)
                <tr>
                    <x-table-cell styles="text-align: center; vertical-align: center;"> {{ ++$key }} </x-table-cell>
                    <x-table-cell styles="text-align: center; vertical-align: center;"> {{ $asses->gender->gender }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $asses->q1 }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $asses->q2 }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $asses->q3 }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $asses->q4 }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $asses->q5 }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $asses->q6 }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $asses->q7 }} </x-table-cell>
                    <x-table-cell styles="text-align: center; word-wrap: break-word;"> {{ $asses->q8 }} </x-table-cell>
                </tr>
            @endforeach
        @endif
    </table>
</x-main-layout>