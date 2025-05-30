import './Search.scss';

const Search = () => {
    const handleInputChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit');
    };

    return (
        <form className='search' onSubmit={handleSubmit}>
            <input className='search__input' type='text' placeholder='Search' onChange={handleInputChange} />
            <button className='search__button' type="submit">Search</button>
        </form>
    )
 }

 export default Search;