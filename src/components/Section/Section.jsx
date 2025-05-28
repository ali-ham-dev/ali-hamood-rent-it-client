import './Section.scss';

const Section = ({ title, headingLevel, content }) => {

    
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

    return (
        <section className='section'>
            {renderHeading(title, headingLevel)}
            <div className='section__content'>
                {content}
            </div>
        </section>
    )
}

export default Section;