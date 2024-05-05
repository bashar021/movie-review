import React from 'react'
import '../styles/Homepage.css'
import img from '../images/MV5BNGZiMzBkZjMtNjE3Mi00MWNlLWIyYjItYTk3MjY0Yjg5ODZkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg'
import imdb from '../icons/imdb.png'
import download_icon from '../icons/download.png'
import like_icon from '../icons/like.png'
import save_icon from '../icons/save.png'
export default function Homepage_body() {
  return (
    
    <div className='movie_review_box'>
      <div className='movie_review_box_child'>
        <img src={img} alt="avengers" height='180px' />

        <div className='movie_details_box'>
          <div className='movie_ref_box'>
            <img src={imdb} alt="imdb" />
            <img src={download_icon} alt="download" />
            <img src={like_icon} alt="like" />
            <span>25</span>
            
          </div>

          <p>movies name</p>
          <div className='tags_cont'>
            <span>xyz</span>
            <span>xyz</span>
            <span>xyz</span>
            <span>xyz</span>
          </div>
          <p>description</p>
          <p>7.8</p>
        </div>
        <button><img src={save_icon} alt="save" /></button>
      </div>

      <div className='movie_review_box_child2'>
        <div>
        <span>Username</span>
        <span>Comment</span>
        </div>
       
        <span>Date</span>
      </div>
    </div>
  )
}
