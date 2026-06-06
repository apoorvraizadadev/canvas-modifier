import { use } from 'react';
import { useState, useEffect } from 'react';
import { useChromeStorage } from './ChromeStorageHook';


export default function ColorModifier({ property })
{
    const [color, setColor] = useChromeStorage(property.variable, '#000000');

    return (
        <div class="property-flex-container">
            <p>{property.name + ": "}</p>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)}/>
        </div>
    );
}