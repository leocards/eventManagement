@props(['label' => '', 'title' => '', 'date' => '', 'resourcePerson' => '', 'cols' => 14, 'evaluationType' => 'Training Evaluation'])

<thead>
    <tr>
        <x-table-head-cell 
            :bordered="''" 
            styles="text-align: center; font-weight: 700 !important; font-size: 24px; vertical-align: center;" 
            height="40" 
            colspan="14"
        >
            Feedback Report Consolidation
        </x-table-head-cell>
    </tr>
    <tr>
        <x-table-head-cell 
            styles="text-align: center; font-size: 12px; font-weight: 400 !important; vertical-align: center;" 
            colspan="14"
            height="60"
        >
            Department of Social Welfare and Development <br>
            Pantawid Pamilyang Pilipino Program Field Office XI
        </x-table-head-cell>
    </tr>
    <tr>
        <x-table-head-cell 
            styles="text-align: left; font-size: 12px; font-weight: 400 !important; vertical-align: center;" 
            colspan="2"
        >
            Training Activity Title:
        </x-table-head-cell>
        <x-table-head-cell 
            styles="text-align: left; font-size: 12px; font-weight: 400 !important; vertical-align: center;" 
            colspan="{{($cols - 2)}}"
        >
            {{ $title }}
        </x-table-head-cell>
    </tr>
    <tr>
        <x-table-head-cell 
            styles="text-align: left; font-size: 12px; font-weight: 400 !important; vertical-align: center;" 
            colspan="2"
        >
            Date of the Activity:
        </x-table-head-cell>
        <x-table-head-cell 
            styles="text-align: left; font-size: 12px; font-weight: 400 !important; vertical-align: center;" 
            colspan="{{($cols - 2)}}"
        >
            {{ $date }}
        </x-table-head-cell>
    </tr>
    @if ($resourcePerson)
    <tr>
        <x-table-head-cell 
            styles="text-align: left; font-size: 12px; font-weight: 400 !important; vertical-align: center;" 
            colspan="2"
        >
            Resource person:
        </x-table-head-cell>
        <x-table-head-cell 
            styles="text-align: left; font-size: 12px; font-weight: 400 !important; vertical-align: center;" 
            colspan="{{($cols - 2)}}"
        >
            {{ $resourcePerson }}
        </x-table-head-cell>
    </tr>
    @endif
    <tr>
        <x-table-head-cell colspan="{{$cols}}" height="40" styles="text-align: center; vertical-align: center;">
            {{ $evaluationType }}
        </x-table-head-cell>
    </tr>
</thead>