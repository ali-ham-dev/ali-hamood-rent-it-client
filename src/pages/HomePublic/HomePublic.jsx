import './HomePublic.scss';

const HomePublic = () => {
    return (
        <main>
            <div className='home-public'>
                <h1 className='home-public__heading-1'>Heading 1</h1>
                <h2 className='home-public__heading-2'>Heading 2</h2>
                <h3 className='home-public__heading-3'>Heading 3</h3>
                <p className='home-public__body-text'>Body text</p>
                <p className='home-public__footnote'>Footnote</p>
                <p className='home-public__button-label'>Button label</p>
                <h1 className='home-public__heading-1-mobile'>Heading 1</h1>
                <h2 className='home-public__heading-2-mobile'>Heading 2</h2>
                <h3 className='home-public__heading-3-mobile'>Heading 3</h3>
                <p className='home-public__body-text-mobile'>Body text</p>
                <p className='home-public__footnote-mobile'>Footnote</p>
                <p className='home-public__button-label-mobile'>Button label</p>
            </div>
        </main>
    )
}

export default HomePublic;