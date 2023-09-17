import React, { useState, useEffect } from 'react';

function ImageDisplay({ filename }) {
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        // Ganti URL dengan URL server Go Anda yang mengembalikan gambar
        const imageURL = `http://localhost:8081/images/${filename}`;
        setImageURL(imageURL);
    }, [filename]);

    return (
        <div className='w-full flex justify-center'>
            <img src={imageURL} alt="Image"  className='w-[30%]'/>
        </div>
    );
}

export default ImageDisplay;