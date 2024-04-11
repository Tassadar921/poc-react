import React from 'react';

export default function Selector({ options, callback }) {
    const handleChange = (event) => {
        const selectedOption = options.find(option => option.id === parseInt(event.target.value));
        callback(selectedOption);
    };

    return (
        <select onChange={handleChange}>
            {options.map(option => (
                <option key={option.id} value={option.id}>{option.name}</option>
            ))}
        </select>
    );
}
