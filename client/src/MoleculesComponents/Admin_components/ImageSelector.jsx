import React, { useState, useRef } from 'react'
import Iconset from '../../AtomicComponents/Icons/Iconset';
import { Typography } from '@mui/material';

function ImageSelector() {
    const [images, setImages] = useState([])
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef()

    function selectFiles() {
        fileInputRef.current.click();
    }
    function onFileSelect(event) {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const newImages = Array.from(files)
            .filter((file) => file.type.startsWith('image/'))
            .filter((file) => !images.some((e) => e.name === file.name)) // Avoid duplicates
            .map((file) => ({
                name: file.name,
                src: URL.createObjectURL(file),
            }));

        setImages((prevImages) => [...prevImages, ...newImages]);
    }
    function deleteImage(index) {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
    function onDragOver(event) {
        event.preventDefault()
        setIsDragging(true)
        event.dataTransfer.dropEffect = 'copy'
    }
    function onDragLeave(event) {
        event.preventDefault()
        setIsDragging(false)
    }
    function onDrop(event) {
        event.preventDefault();
        setIsDragging(false);
        onFileSelect({ target: { files: event.dataTransfer.files } });
    }
    return (
        <div class='card w-auto rounded-md border bg-white border-gray-300 hover:border-gray-500'>
            <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className='drag-area rounded-md bg-gray-50 flex-auto justify-center text-center h-60 select-none text-md'>
                {isDragging ? (
                    <div className='select justify-center items-center text-center text-violet-900 pt-14 pb-14 cursor-pointer duration-500 hover:opacity-60 border-2 border-purple-600 rounded-md'>
                        <Iconset type='photo' fontSize='100px' color="primary800" />
                        <Typography color='primaryDark'>Drag your images here</Typography>
                    </div>

                ) : (
                    <>
                        <div className='flex justify-center items-center font-bold text-lg pt-8 pb-4' onClick={selectFiles}><Iconset type='image' fontSize='100px' color="primary800" /></div>
                        <div className='flex justify-center items-center font-bold text-lg pt-2 pb-2'>Drop or select file</div>
                        Drag file here or click to {''}
                        <span role='button' onClick={selectFiles} className='select text-violet-600 cursor-pointer duration-500 hover:opacity-60'>
                            browse
                        </span>
                        {' '} through your device
                    </>
                )}
                <input type='file' name='file' className='hidden' multiple ref={fileInputRef} onChange={onFileSelect} />
            </div>
            <div className='container w-full h-30 max-h-50 flex justify-start items-start overflow-y-auto relative justify-center'>
                {Array.isArray(images) && images.map((image, index) => (
                    <div key={index} className="image w-28 h-28 mb-4 ml-4 relative mt-4">
                        <div
                            onClick={() => deleteImage(index)}
                            className="delete z-999 text-violet-700 cursor-pointer text-xl absolute -top-1 right-1"
                        >
                            &times;
                        </div>
                        <div className='w-full h-full rounded-lg'>
                            <img className="w-full h-full p-1" src={image.src} alt={image.name} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default ImageSelector;
