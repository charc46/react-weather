import React from 'react'

const Search = ({ setSearch }) => {

  // Prevent default behaviour of form submit and call the searchWeather function with searchTerm as an argument
  const onSubmit = e => {
    e.preventDefault();
    setSearch(term);
  }

  let term = null
  const setTerm = (searchTerm) => {
    term = searchTerm
  }

  // As user types input the searchTerm state will be updated and submitted to the searchWeather function on submit
  return (
    <div className='ui form search-bar'>
      <form className='input' onSubmit={onSubmit}>
        <input type="text" placeholder='Search a City..' onChange={e => setTerm(e.target.value)}/>
      </form>
    </div>
  )
}

export default Search
