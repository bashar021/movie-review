import React, { useState, useRef } from 'react'
import '../styles/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
export default function Navbar(props) {
  const [searchOption, setSearchOption] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    props.search(searchOption, searchQuery)
  };
  return (
    <div id='navbar_cont'>
      <div id='website_name' className="cursor-pointer"><span>Website Name</span></div>
      <div id="searchCont">
        <form onSubmit={handleSearchSubmit}>
          <select value={searchOption} onChange={(event) => { setSearchOption(event.target.value); }}>
            <option value="name">Search by Name</option>
            <option value="genre">Search by Genre</option>
            {/* <option value="rating">Search by Rating</option> */}
          </select>
          <div className='searchInputCancelBtnCont' style={{ display: 'flex' }}>
            <input type="text" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); }} placeholder="Enter search query" />
            {searchQuery !== '' ? <button onClick={() => { props.cancelSearch(); setSearchQuery('') }} className='clearSearchQuery'>X</button> : ''
            }
          </div>
          <button className='searchQueryBtn' type="submit">Search</button>
        </form>
      </div>
      <div id="login_signup_btn_box"><Link to="/login">Login</Link> <Link to='/signup'>SignUp</Link></div>
    </div>
  )
}
