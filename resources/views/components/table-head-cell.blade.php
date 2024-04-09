@props(['withBackGround' => false, 'styles' => '', 'bordered' => 'border: 3px solid black;'])

<td style="text: right; font-weight: 500; {{$styles}} {{ $withBackGround?'background-color: #475569; color:white;':'' }} {{$bordered}}" {{$attributes}} >
    {{ $slot }}
</td>