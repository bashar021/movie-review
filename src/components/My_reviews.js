import React, { useState, useEffect } from 'react'
import '../styles/My_reviews.css'
import movieImg from '../images/MV5BNGZiMzBkZjMtNjE3Mi00MWNlLWIyYjItYTk3MjY0Yjg5ODZkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_SX300.jpg'
import spidermanImg from '../images/spiderman.jpeg'
import imdb from '../icons/imdb.png'
import download_icon from '../icons/download.png'
import like_icon from '../icons/like.png'
import edit_icon from '../icons/edit.png'
import delete_icon from '../icons/delete-icon.png'
import Post from '../controllers/Post.js'
import Get from '../controllers/Get.js'
import Cookies from 'js-cookie'
import { getMovieDetails } from '../controllers/TmdbApi.js'
import UserNav from './UserNav.js'
export default function My_reviews(props) {
  const [myReviewsList, setMyReviewsList] = useState([])
  const [displayMyReviewForm, setDisplayMyReviewForm] = useState(false)
  const [movieList, setMovieList] = useState([])
  // const movieList = [1, 2, , 3, 4, 4,4,4,4,4,4,4,,4,4]
  const options = [
    'Horror',
    'Action',
    'Thriller',
    'Western',
    'Comedy',
    'Adventure',
    'Historical drama',
    'Drama',
    'Fantasy',
    'Romantic comedy',
    'Humor',
    'Science fiction',
    'Satire',
    'Fiction',
    'Mystery',
    'Narrative',
    'Slapstick',
    'Dark comedy',
    'Romance',
    'Film criticism',
    'History',
    'Historical Fiction',
    'Farce',
    'Adventure fiction',
    'Adventure',
    'Espionage',
    'Melodrama',
    'Suspense',
    'Hybrid genre',
    'Fairy tale',
    'Fantasy',
    'Coming-of-age story',
    'Magical Realism',
    'High fantasy',
    'Mystery',
    'Comedy horror',
    'Superhero fiction',
    'Tragedy',
    'Screenplay',
    'Review',
    'Biography',
    'Police procedural',
    'Detective fiction',
    "other"
  ];
  const [myReviewTags, setMyReviewTags] = useState([])
  const [selectTagOption, setSelectTagOption] = useState('')
  const [tagOptionAlert, setTagOptionAlert] = useState('')

  const [myReviewMovieName, setMyReviewMovieName] = useState('')
  const [myReviewDownloadLink, setMyReviewDownloadLink] = useState('')
  const [myReviewDescription, setMyReviewDescription] = useState('')
  const [selectedMoviePosterUrl, setSelectedMoviePosterUrl] = useState('')
  const [selectedMovieRating, setSelectedMovieRating] = useState('')
  const [movieReleaseDate, setMovieReleaseDate] = useState('')
  const [movieTmdbReference, setMovieTmdbReference] = useState('')

  const [editReviewId, setEditReviewId] = useState('')

  function selectFormReviewTags(value) {
    setSelectTagOption(value)
    if (!myReviewTags.includes(value)) {
      if (myReviewTags.length < 6) {
        const newMyReviewTags = [...myReviewTags, value]
        setMyReviewTags(newMyReviewTags)
      } else {
        console.log('you can not select more then 6 tags')
        setTagOptionAlert('you can not select more then 6 tags')
        setTimeout(() => setTagOptionAlert(""), 5000)
      }
    }
  }


  function clearMyReviewForm() {
    setMyReviewTags([])
    setMyReviewMovieName('')
    setMyReviewDownloadLink('')
    setMyReviewDescription('')
    setSelectedMoviePosterUrl('')
    setSelectedMovieRating('')
    setMovieReleaseDate('')
    setMovieTmdbReference('')
  }
  function removeTagFromTagList(index) {
    let option = [...myReviewTags];
    option.splice(index, 1);
    setMyReviewTags(option);
  }
  async function saveMyReviewToDB() {
    console.log('review save function is calling')
    const data = {
      myReviewTags: myReviewTags,
      myReviewMovieName: myReviewMovieName,
      myReviewDownloadLink: myReviewDownloadLink,
      myReviewDescription: myReviewDescription,
      moviePosterUrl: selectedMoviePosterUrl,
      movieRating: selectedMovieRating,
      movieReleaseDate: movieReleaseDate,
      movieTmdbReference: movieTmdbReference

    }
    const review = await Post(`${process.env.REACT_APP_SERVER_URL}/upload-review`, data, Cookies.get('jwt'))
    const jsonData = await review.json()
    if (review.status === 201) {
      console.log('review has been saved to db')
      console.log(jsonData.data.ReviewList)
      setMyReviewsList(jsonData.data.ReviewList)
      clearMyReviewForm()
      setDisplayMyReviewForm(false)
    } else {
      console.log(jsonData.error)

    }
  }
  async function deleteMyReview(reviewId) {
    // console.log(reviewId)
    const updatedReviews = await Post(`${process.env.REACT_APP_SERVER_URL}/user/reviews/delete`, { reviewId: reviewId }, Cookies.get('jwt'))
    const jsonData = await updatedReviews.json()
    if (updatedReviews.ok) {
      // console.log(jsonData.data.ReviewList)
      setMyReviewsList(jsonData.data.ReviewList)

    } else {
      console.log('unable to delete ')
    }

  }
  async function fetchMyReviews() {
    console.log('fetching my reviews funciton ')
  const myReviews = await Get(`${process.env.REACT_APP_SERVER_URL}/user-reviews`, Cookies.get('jwt'))
    const jsonData = await myReviews.json()
    if (myReviews.ok) {
      console.log('my review data has been fetched ')
      // console.log(jsonData.data.ReviewList)
      setMyReviewsList(jsonData.data.ReviewList)
    } else {
      console.log('can not fetch the user revies ')
    }
  }
  function editMyReview(review) {
    // console.log(review)
    setMyReviewMovieName(review.movieName)
    setMyReviewDownloadLink(review.downloadLink)
    setMyReviewDescription(review.description)
    setMyReviewTags(review.tags)
    setSelectedMoviePosterUrl(review.moviePosterUrl)
    setSelectedMovieRating(review.movieRating)
    setMovieReleaseDate(movieReleaseDate)
    setMovieTmdbReference(movieTmdbReference)



    setDisplayMyReviewForm(true)
    setEditReviewId(review._id)
  }
  async function updateEditedReview() {
    // const data = { 
    //   movieName: myReviewMovieName, 
    //   downloadLink: myReviewDownloadLink, 
    //   description: myReviewDescription, 
    //   tags: myReviewTags, 
    //   reviewId: editReviewId 
    // }
    const data = {
      reviewId: editReviewId ,
      myReviewTags: myReviewTags,
      myReviewMovieName: myReviewMovieName,
      myReviewDownloadLink: myReviewDownloadLink,
      myReviewDescription: myReviewDescription,
      moviePosterUrl: selectedMoviePosterUrl,
      movieRating: selectedMovieRating,
      movieReleaseDate: movieReleaseDate,
      movieTmdbReference: movieTmdbReference

    }
    const updatedReviews = await Post(`${process.env.REACT_APP_SERVER_URL}/user/reviews/update`, data, Cookies.get('jwt'))
    const jsonData = await updatedReviews.json()
    if (updatedReviews.ok) {
      console.log('review has been updated')
      // console.log(jsonData.data.ReviewList)
      setMyReviewsList(jsonData.data.ReviewList)
      clearMyReviewForm()
      setDisplayMyReviewForm(false)
      setEditReviewId('')
    } else {
      console.log(jsonData.error)

    }

  }
  async function handleMovieQuery() {
    if (myReviewMovieName !== '') {
      const data = await getMovieDetails(myReviewMovieName)
      if (data !== null) {
        console.log(data)
        setMovieList([...data])
      } else {
        console.log('no movie found')
      }


    }
  }
  function handleMovieSelect(movie) {
    setMovieList([])
    setMyReviewMovieName(movie.movieName)
    setSelectedMoviePosterUrl(movie.moviePosterUrl)
    setSelectedMovieRating(movie.movieRating)
    setMyReviewDescription(movie.movieDescription)
    setMovieReleaseDate(movie.movieReleaseDate)
    setMovieTmdbReference(movie.tmdbUrl)

  }
  useEffect(() => {
    fetchMyReviews()
    // getMovieDetails()

  }, [])

  return (

    <>
      <UserNav></UserNav>
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
                  <img onClick={() => { editMyReview(item) }} src={edit_icon} alt="" />
                  <img onClick={() => { deleteMyReview(item._id) }} src={delete_icon} alt="" />
                </div>
                <div>
                  <h6>{item.movieName}<span>(8.5)</span></h6>
                  <div className='tags_cont'>
                    {
                      item.tags.map((tag, key) => {
                        return <span key={key} >{tag} </span>
                      })
                    }

                  </div>
                  <p className='myReviewDiscription'>{item.description}</p>
                </div>
              </div>
            </div>)


        })}
        <button onClick={() => { setDisplayMyReviewForm(true) }} id='myReviewAddBtn'>Add</button>

        {
          displayMyReviewForm ?
            <div id='my_review_adding_form'>
              <form onSubmit={(event) => { event.preventDefault() }}>
                <div className="movieSearchBox">
                  <div>
                    <input className="myReviewFormInput" type="text" value={myReviewMovieName} placeholder='Movie Name' onChange={(event) => { setMyReviewMovieName(event.target.value) }} />
                    <button onClick={() => { handleMovieQuery() }} className="movieSearchBtn">&#128269;</button>
                  </div>

                  <div className='movieQueryListBox'>
                    {/* {myReviewMovieName !== ''?  */}
                    {movieList.map((item, index) => {
                      return (
                        <div key={index} onClick={() => { handleMovieSelect(item) }} className="movieBox">
                          <img src={item.moviePosterUrl} alt={item.movieName} />
                          <div>
                            <p><strong>{item.movieName}</strong></p>
                            <p> <span>{item.movieRating.toFixed(1)}</span>   <span>{item.movieReleaseDate}</span></p>
                            <p>{item.movieDescription}</p>

                          </div>

                        </div>
                      )
                    })}
                    {/* :''} */}

                  </div>

                </div>




                <select className="myReviewFormInput" value={selectTagOption} onChange={(event) => { selectFormReviewTags(event.target.value) }} placeholder="select tags">
                  <option value="" >Genre</option>
                  {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
                <div className='my_review_tags_cont'>
                  {
                    myReviewTags.map((item, index) => {
                      return <span onMouseEnter={(event) => { console.log('hii'); const newSpan = document.createElement('span'); newSpan.textContent = 'X'; event.target.append(newSpan) }} onClick={() => { removeTagFromTagList(index) }} onMouseLeave={(event) => { event.target.innerHTML = item }} key={index}>{item} </span>
                    })
                  }
                </div>
                <input className="myReviewFormInput" type="text" value={myReviewDownloadLink} onChange={(event) => { setMyReviewDownloadLink(event.target.value) }} placeholder='Download link'/>
                <input className="myReviewFormInput" type="text" value={myReviewDescription} onChange={(event) => { setMyReviewDescription(event.target.value) }} placeholder='Description' required/>
                <input className="myReviewFormInput" type="text" value={selectedMovieRating} onChange={(event)=>{setSelectedMovieRating(event.target.value)}} placeholder="Rating" required/>

                <div stye={{ display: 'flex' }}>
                  {editReviewId === '' ? <button className="reviewFormBtn" onClick={() => { saveMyReviewToDB() }} >save</button> : <button className="reviewFormBtn" onClick={() => { updateEditedReview() }} >Update</button>}

                  <button className="reviewFormBtn" onClick={() => { setDisplayMyReviewForm(false); clearMyReviewForm() }} >cancel</button>
                </div>
                <p style={{ color: 'red' }} >{tagOptionAlert}</p>
              </form>
            </div> : ''
        }
      </div>



    </>

  )
}
