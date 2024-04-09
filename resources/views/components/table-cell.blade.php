@props(['styles' => '', 'bordered' => true])
<td style="{{$bordered ? 'border: 3px solid black;': ''}} {{$styles}}" {{$attributes}}>
    {{ $slot }}
</td>