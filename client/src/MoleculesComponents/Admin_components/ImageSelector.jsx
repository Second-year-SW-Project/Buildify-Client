import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import Iconset from '../../AtomicComponents/Icons/Iconset';
import { Typography } from '@mui/material';
import { toast } from 'sonner';

// Use forwardRef to allow the parent to access internal methods
const ImageSelector = forwardRef(({ onImagesSelect }, ref) => {
    const [images, setImages] = useState([])
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef()

    // Expose the deleteAllImages method to the parent
    useImperativeHandle(ref, () => ({
        deleteAllImages
    }));

    function selectFiles() {
        fileInputRef.current.click();
    }
    function onFileSelect(event) {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        //Image validation limits
        const maxSize = 1 * 1024 * 1024;
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxWidth = 1600;
        const maxHeight = 1600;

        const validationPromises = Array.from(files).map((file) => {
            return new Promise((resolve) => {
                const isValidType = allowedTypes.includes(file.type);
                const isValidSize = file.size <= maxSize;

                //Validate Type
                if (!isValidType) {
                    toast.error(`${file.name} is not a supported image type.`, {
                        style: {
                            background: '#fe0132',
                            color: '#fff',
                        },
                    });
                    return resolve(null);
                }

                //Validate Size
                if (!isValidSize) {
                    toast.error(`${file.name} is larger than 1MB.`, {
                        style: {
                            background: '#fe0132',
                            color: '#fff',
                        },
                    });
                    return resolve(null);
                }

                //Check image dimensions
                const img = new Image();
                const objectUrl = URL.createObjectURL(file);
                img.src = objectUrl;

                //Image dimention Validation
                img.onload = () => {
                    if (img.width > maxWidth || img.height > maxHeight) {
                        toast.error(`${file.name} exceeds ${maxWidth}x${maxHeight}px.`, {
                            style: {
                                background: '#fe0132',
                                color: '#fff',
                            },
                        });
                        URL.revokeObjectURL(objectUrl);
                        return resolve(null);
                    }

                    resolve({
                        name: file.name,
                        src: objectUrl,
                        file: file,
                    });
                };

                //Image Load Validation
                img.onerror = () => {
                    toast.error(`Could not load ${file.name}.`, {
                        style: {
                            background: '#fe0132',
                            color: '#fff',
                        },
                    });
                    URL.revokeObjectURL(objectUrl);
                    resolve(null);
                };
            });
        });

        Promise.all(validationPromises).then((validImages) => {
            const filtered = validImages
                .filter((img) => {
                    //Filter out null values
                    if (img === null) {
                        return false;
                    }
                    //Check if image already exists
                    if (images.some((e) => e.name === img.name)) {
                        toast.error(`${img.name} is already added.`, {
                            style: {
                                background: '#fe0132',
                                color: '#fff',
                            },
                        });
                        return false;
                    }
                    return true;
                });

            //Set Image Limit
            const updatedImages = [...images, ...filtered].slice(0, 4);
            //Update State
            setImages(updatedImages);
            onImagesSelect(updatedImages.map((img) => img.file));
        });
    }

    function deleteImage(index) {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        onImagesSelect(updatedImages.map((img) => img.file));
    }
    function deleteAllImages() {
        setImages([]);
        onImagesSelect([]);
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
                className='drag-area rounded-md bg-gray-100 flex-auto justify-center text-center h-60 select-none text-md'>
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
    );
});
export default ImageSelector;
