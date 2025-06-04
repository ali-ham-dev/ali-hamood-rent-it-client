import './Section.scss';
import { useState } from 'react';

const Section = ({ title, headingLevel, content, isCollapsible = false }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const renderHeading = (_title, _headingLevel) => {
        _title = _title || 'Section Title';
        _headingLevel = _headingLevel || 'h2';

        if (_headingLevel === 'h2') {
            return <h2 className='section__title section__title-h2'>{_title}</h2>;
        } else if (_headingLevel === 'h3') {
            return <h3 className='section__title section__title-h3'>{_title}</h3>;
        } else {
            return <h4 className='section__title section__title-h4'>{_title}</h4>;
        }
    }

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    const renderCollapseButton = () => {
        if (!isCollapsible) return null;

        return (
            <button 
                className='section__collapse-button'
                onClick={toggleCollapse}>
                {isCollapsed ? (
                    <svg className='section__collapse-button-icon' xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 10L12 15L17 10H7Z"/>
                    </svg>
                ) : (
                    <svg className='section__collapse-button-icon' xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 14L12 9L17 14H7Z"/>
                    </svg>
                )}
            </button>
        );
    };

    return (
        <section className='section'>
            <div className='section__header'>
                {renderHeading(title, headingLevel)}
                {renderCollapseButton()}
            </div>
            <div className={`section__content ${isCollapsed ? 'section__content--collapsed' : ''}`}>
                {content}
            </div>
        </section>
    )
}

export default Section;