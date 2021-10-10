import axios from 'axios'
import React, { useState } from 'react'

export default function UploadFileClound() {
  const [imageSelected, setImageSelected] = useState('')

  const onImageChange = (e) => {
    setImageSelected(e.target.files[0])
    console.log(imageSelected)
  }
  const uploadImage = (e) => {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    formData.append('upload_preset', 'loobnb2s')

    axios
      .post('https://api.cloudinary.com/v1_1/pumpo/image/upload', formData)
      .then((res) => {
        console.log(res.data.url)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <div className='container'>
      <form>
        <input type='file' name='upload_image' onChange={uploadImage}></input>
      </form>
      <button onClick={uploadImage}>Upload</button>
    </div>
  )
}
