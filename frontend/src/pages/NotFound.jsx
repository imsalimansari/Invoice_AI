import React from 'react'
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className=' min-h-screen flex items-center justify-center bg-white'>
            <div className=' text-center'>
                <h1 className=' text-4xl font-bold mb-2'>404 - Page Not Found</h1>
                <p className=' text-gray-800 mb-6'>The page you are looking for does not exist.</p>
                <Link to="/" className=' px-4 py-2 rounded-md bg-indigo-700 text-white'>
                    Go back to the homepage
                </Link>
            </div>
        </div>
    )
}

export default NotFound
