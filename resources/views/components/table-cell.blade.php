@props(['styles' => ''])
<td style="border: 1px black solid; {{$styles}}" {{$attributes}}>
    {{ $slot }}
</td>