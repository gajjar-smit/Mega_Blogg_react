import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'
import authService from '../appwrite/auth'

const Postcard = ({
  $id, title, featuredimage,userid,createdAt
}) => {
   
  return (
    <Link to={`/post/${$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4 min-h-[23rem]'>
        <div className='w-full justify-center mb-4 min-h-60'>
          <img src={appwriteService.getFilePreview(featuredimage)} alt={title}
            className='rounded-xl ' />
        </div>
         
        <h2
          className='text-xl font-bold text-clip'
        >
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default Postcard