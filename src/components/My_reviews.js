import React, { useState } from 'react'
import '../styles/My_reviews.css'
import movieImg from '../images/MV5BNGZiMzBkZjMtNjE3Mi00MWNlLWIyYjItYTk3MjY0Yjg5ODZkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg'
import spidermanImg from '../images/spiderman.jpeg'
import imdb from '../icons/imdb.png'
import download_icon from '../icons/download.png'
import like_icon from '../icons/like.png'
import edit_icon from '../icons/edit.png'
import delete_icon from '../icons/delete-icon.png'
export default function My_reviews() {
  const [myReviewsList, setMyReviewsList] = useState([1, 2,3,4,5])
  return (

    <>

      <div id='myReviewsCont' style={{ color: 'white' }}>

        {myReviewsList.map((item, key) => {
          return (
          <div key={key} className='myReviewBoxes'>
            <img className='myReviewBoxesImg' src={spidermanImg} alt="" />
            <div className='myReviewBoxesDetailsCont' >
              <div className='myReviewOptions'>
                <img src={imdb} alt="" />
                <img src={download_icon} alt="" />
                <img src={like_icon} alt="" />
                {/* <button>delete</button> */}
                <img src={edit_icon} alt="" />
                <img src={delete_icon} alt="" />
              </div>

              {/* <button></button> */}
              <div>
                <h6>SpiderMan <span>(8.5)</span></h6>
                <div className='tags_cont'>
                  <span>xyz</span>
                  <span>xyz</span>
                  <span>xyz</span>
                  <span>xyz</span>
                </div>
                <p className='myReviewDiscription'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>
          </div>)


        })}





      </div>


    </>

  )
}
