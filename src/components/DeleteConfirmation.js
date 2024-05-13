import React from 'react'
import '../styles/DeleteConfirmation.css'


export default function DeleteConfirmation(props) {
  return (
    <div className='deleteConfirmationBox'>
        <div>
        <p><span>!</span></p>
        <h3>Are you sure ?</h3>
        <button  onClick={()=>{props.confirm(true);props.popUp(false)}} id='confirmDeleteBtn'>Yes Delete It</button>
        <button onClick={()=>{props.confirm(false);props.popUp(false)}} id="cancelDeleteBtn">Cancel</button>
        </div>
    </div>
  )
}
