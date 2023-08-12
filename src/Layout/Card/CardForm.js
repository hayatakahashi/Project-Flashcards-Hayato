import React from 'react'


{/* 
User types in one of the text areas.
The onChange event fires, calling handleChange.
handleChange is expected to update the formData to reflect the new content.
React detects a change in formData and re-renders the component, displaying the new content in the text areas.
If a user submits the form (for example, by pressing Enter), the handleSubmit function is called. */}

const CardForm = ({ formData, handleChange, handleSubmit }) => {

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor='front'>
            Front
            <br />
            <textarea
                id='front'
                name='front'
                className='form-control'
                value={formData.front}   //When a user types into the "Front" input field (the textarea in this case), it updates the formData.front.
                onChange={handleChange}  //When the textarea's content changes (when someone types), the handleChange function is called. 
                placeholder='Front of Card'
                rows="4"
                style={{ width: "100%" }}
                required  // ensures that the textarea must be filled before the form can be submitted.
             />
        </label>
        <br />
        <label htmlFor='back'>
            Back
            <br />
            <textarea
                id='back'
                name='back'
                className='form-control'
                value={formData.back}   
                onChange={handleChange}  
                placeholder='Back of Card'
                rows="4"
                style={{ width: "100%" }}
                required  
             />
        </label>
    </form>
  )
}

export default CardForm