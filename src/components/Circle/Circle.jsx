import './Circle.scss';
import { useState, useEffect } from 'react';

const Circle = ({ selected = false, defaultClass = '', selectedClass = ''}) => {

    const [isSelected, setIsSelected] = useState(selected);

    useEffect(() => {
        setIsSelected(selected);
    }, [selected]);

    return (
        <div className={`circle ${defaultClass} ${isSelected ? selectedClass : ''}`} >
        </div>
    );
}

export default Circle;