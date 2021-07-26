import React, {useState, useEffect} from 'react'

function Search(props) {
  const [searchValue, setSearchValue] = useState('');
  
  useEffect(() => {
    props.handleSearch(searchValue);
  }, [searchValue])

  return (
    <div className='mb-4'>
      <input onChange={(e) => setSearchValue(e.target.value)} type="text" placeholder='Live search' />
    </div>
  )
}

export default Search
