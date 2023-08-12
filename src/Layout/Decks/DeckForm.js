import React from 'react'

const DeckForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={{handleSubmit}}>
        <label htmlFor='name'>
            Name
            <br />
            <input
            type='text'
            id='name'
            name='name'
            value={formData.name}
            onChange={handleChange}
            />
        </label>
        <br />
        <label htmlFor='description'>
            Description
            <br />
            <textarea
            id='description'
            name='description'
            className='form-control'
            value={formData.description}
            onChange={handleChange}
            rows="4"
            style={{width: "100%"}}
            required
            />
        </label>
    </form>
  )
}

export default DeckForm