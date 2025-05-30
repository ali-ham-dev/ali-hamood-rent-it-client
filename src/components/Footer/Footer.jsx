import './Footer.scss';
import { useState, useEffect } from 'react';
const Footer = () => {

    const [footerHeight, setFooterHeight] = useState(10);

    // const [isNearBottom, setIsNearBottom] = useState(false);
    
    // useEffect(() => {
    //     const handleScroll = (event) => {
    //         event.preventDefault();
            
    //         const scrollTop = window.scrollY || document.documentElement.scrollTop;
    //         const windowHeight = window.innerHeight;
    //         const fullHeight = document.documentElement.scrollHeight;
            
    //         const threshold = 1;
            
    //         if (scrollTop + windowHeight >= fullHeight - threshold) {
    //             setIsNearBottom(true);
    //         } else {
    //             setIsNearBottom(false);
    //         }
    //     }
        
    //     window.addEventListener('scroll', handleScroll);
        
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     }
        
    // }, []);
    
    const handleClick = (event) => {
        event.preventDefault();
        setFooterHeight(footerHeight + 1);
    }

    return (
        <footer className='footer'>
            <div className='footer__chat-box' 
                style={footerHeight ? { height: `${footerHeight}rem` } : {}}>
                <p className='footer__text'>Footer</p>
                <button className='footer__button' onClick={handleClick}>Hide</button>
            </div>
            <div className='footer__bottom-spacer'
                style={footerHeight ? { height: `${footerHeight}rem` } : {}}></div>
        </footer>
    )
}

export default Footer;
