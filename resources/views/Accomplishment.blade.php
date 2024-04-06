<table>
    <thead>
        <tr>
            <x-table-head-cell 
                :bordered="''" 
                styles="text-align: center; font-weight: 700 !important; font-size: 16px; vertical-align: center;" 
                height="40" 
                colspan="10"
            >
                IDCB Accomplishment Report
            </x-table-head-cell>
        </tr>
        @if (true)
            <tr>
                <x-table-head-cell 
                    styles="text-align: center; font-size: 12px; font-weight: 400 !important; vertical-align: center;" 
                    colspan="10"
                    height="60"
                >
                    Institutional Development and Capability Building (IDCB) Accomplishment Report <br>
                    FY {{ $year }} | {{ $quarter }} <br>
                    Pantawid Pamilyang Pilipino Program Field Office XI
                </x-table-head-cell>
            </tr>
        @endif
    </thead>
    <thead>
        <tr>
            <x-table-head-cell withBackGround="true" width="190px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">TITLE OF ACTIVITY</x-table-head-cell>
            <x-table-head-cell withBackGround="true" width="260px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">OBJECTIVES OF THE ACTIVITY</x-table-head-cell>
            <x-table-head-cell withBackGround="true" width="130px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">DATE</x-table-head-cell>
            <x-table-head-cell withBackGround="true" width="120px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">
                PLATFORM (Face-to-face, Online, or Blended)
            </x-table-head-cell>
            <x-table-head-cell withBackGround="true" width="120px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">TARGET VENUE</x-table-head-cell>
            <x-table-head-cell withBackGround="true" width="120px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">NUMBER OF PARTICIPANTS</x-table-head-cell>
            <x-table-head-cell withBackGround="true" width="200px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">EVALUATION RESULTS</x-table-head-cell>
            <x-table-head-cell withBackGround="true" width="170px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">PROPOSED FUND ALLOCATION</x-table-head-cell>
            <x-table-head-cell withBackGround="true" width="170px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">FUND DISBURSED</x-table-head-cell>
            <x-table-head-cell withBackGround="true" width="140px" styles="text-align: center; word-wrap: break-word; vertical-align: center;">
                REMARKS (i.e. Changes in schedule, reason for conduct, etc.)
            </x-table-head-cell>
        </tr>
    </thead>
    <tbody>
        @forelse ($accomplishments as $acc)
            <tr>
                <x-table-cell> {{ $acc->title }} </x-table-cell>
                <x-table-cell> {{ $acc->objective }} </x-table-cell>
                <x-table-cell> {{ convertDate($acc->dateStart, $acc->dateEnd) }} </x-table-cell>
                <x-table-cell> {{ $acc->platform }} </x-table-cell>
                <x-table-cell> {{ $acc->platform == 'Face-to-face' ? $acc->venue : 'Online' }} </x-table-cell>
                <x-table-cell> {{ $acc->participant_count }} </x-table-cell>
                <x-table-cell> 
                    @if ($acc->evaluationRates)
                        @foreach ($acc->evaluationRates as $rates)
                            {{ $rates['level'] }}: {{ $rates['count'] }} ( {{ $rates['percent'] }} )
                        @endforeach    
                    @endif
                </x-table-cell>
                <x-table-cell> {{ $acc->fund }} </x-table-cell>
                <x-table-cell> {{ $acc->fund }} </x-table-cell>
                <x-table-cell> {{ $acc->remarks }} </x-table-cell>
            </tr>
        @empty
            <tr>
                <td colspan="10" style="text-align: center;">No data</td>
            </tr>
        @endforelse
    </tbody>
</table>

<table>
    <tbody>
        <tr></tr>
        <tr></tr>
        <tr>
            <td></td>
            <x-table-cell styles="font-weight: 400;"> Prepared by: </x-table-cell>
            <td></td>
            <x-table-cell colspan="2" styles="font-weight: 400;"> Reviewed by: </x-table-cell>
            <td></td>
            <x-table-cell colspan="2" styles="font-weight: 400;"> Prepared by: </x-table-cell>
        </tr>
        <tr></tr>
        <tr></tr>
        <tr>
            <td></td>
            <x-table-cell styles="font-weight: 600;"> 
                {{ $auth->name }}
            </x-table-cell>

            @if (!empty(get_object_vars($reviewedby)))
                <td></td>
                <x-table-cell colspan="2" styles="font-weight: 600;"> 
                    {{ $reviewedby->name }}
                </x-table-cell>
            @endif
            @if (!empty(get_object_vars($approvedby)))
                <td></td>
                <x-table-cell colspan="2" styles="font-weight: 600;"> 
                    {{ $approvedby->name }}
                </x-table-cell>
            @endif
        </tr>
        <tr>
            <td></td>
            <x-table-cell> 
                {{ $auth->position }}
            </x-table-cell>
            @if (!empty(get_object_vars($reviewedby)))
                <td></td>
                <x-table-cell colspan="2"> 
                    {{ $reviewedby->position }}
                </x-table-cell>
            @endif
            @if (!empty(get_object_vars($approvedby)))
                <td></td>
                <x-table-cell colspan="2"> 
                    {{ $approvedby->position }}
                </x-table-cell>
            @endif
        </tr>
        <tr>
            <td></td>
            <x-table-cell>
                {{ $auth->date }}
            </x-table-cell>
            @if (!empty(get_object_vars($reviewedby)))
                <td></td>
                <x-table-cell colspan="2"> 
                    {{ $reviewedby->date }}
                </x-table-cell>
            @endif
            @if (!empty(get_object_vars($approvedby)))
                <td></td>
                <x-table-cell colspan="2"> 
                    {{ $approvedby->date }}
                </x-table-cell>
            @endif

        </tr>
    </tbody>
</table>