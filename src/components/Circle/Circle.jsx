import './Circle.scss';
import { useState, useEffect } from 'react';

const Circle = ({ selected = false, backgroundColor = 'black', selectedColor = 'white'}) => {

    const [isSelected, setIsSelected] = useState(selected);

    useEffect(() => {
        setIsSelected(selected);
    }, [selected]);

    return (
        <div 
            className='circle' 
            style={{ 
                backgroundColor: isSelected ? backgroundColor : selectedColor, 
                borderColor: isSelected ? selectedColor : backgroundColor }}>
        </div>
    );
}

export default Circle;