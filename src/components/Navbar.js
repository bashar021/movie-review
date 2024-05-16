import React, { useState, useRef } from 'react'
import '../styles/Navbar.css'
import '../styles/responsive/HomepageNavbar.css'
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
      <div className='searchCont' id="searchCont">
        <form id='searchCont-form' onSubmit={handleSearchSubmit}>
          <select id='genre-select-field-on-homepage' value={searchOption} onChange={(event) => { setSearchOption(event.target.value); }}>
            <option value="name">By Name</option>
            <option value="genre">By Genre</option>
            {/* <option value="rating">Search by Rating</option> */}
          </select>
          <div id='searchInputCancelBtnCont' className='searchInputCancelBtnCont' style={{ display: 'flex' }}>
            <input type="text" value={searchQuery} onChange={(event) => { setSearchQuery(event.target.value); }} placeholder="search" />
            {searchQuery !== '' ? <button type='button' onClick={() => { props.cancelSearch(); setSearchQuery('') }} className='clearSearchQuery'>X</button> : ''
            }
          </div>
          <button id='searchQueryBtn' className='searchQueryBtn' type="submit">Search</button>
        </form>
      </div>
      <div id="login_signup_btn_box"><Link to="/login">Login</Link> <Link to='/signup'>SignUp</Link></div>
    </div>
  )
}
