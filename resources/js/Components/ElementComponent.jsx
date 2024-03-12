import React from 'react';

export default function ElementComponent({ as: Element = 'div', ...props }) {
    return React.createElement(Element, props);
}