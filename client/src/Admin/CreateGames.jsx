import React, { useState, useEffect, useRef } from 'react';
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb';
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles';
import { Typography } from '@mui/material';
import theme from '../AtomicComponents/theme';
import { InputField } from '../AtomicComponents/Inputs/Input';
import ImageSelector from '../MoleculesComponents/Admin_components/ImageSelector';
import { cpuCores, cpuThreads, gpuAttributes, ramAttributes } from '../AtomicComponents/ForAdminForms/Category';
import { PrimaryButton } from '../AtomicComponents/Buttons/Buttons';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams, useNavigate } from "react-router-dom";
import FullScreenLoader from '../AtomicComponents/FullScreenLoader';

const CreateGames = () => {

    //Backend URL for the API
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const { id } = useParams();//Extracts the id from the URL if edit mode is true
    const isEditMode = !!id;

    const navigate = useNavigate();
    const imageSelectorRef = useRef();
    const [loading, setLoading] = useState(false);

    // Options for dropdowns (reusing existing ones from your product form) from category.js
    const ramTypeOptions = ramAttributes.type;
    const ramSpeedOptions = ramAttributes.speed;
    const ramSizeOptions = ramAttributes.size;
    const gpuVramOptions = gpuAttributes.gpuVram;

    // Initial state for a game
    const initialGameState = {
        name: "",
        description: "",
        image: "",
        cpu: {
            cores: "",
            threads: "",
            baseClock: "",
            boostClock: ""
        },
        gpu: {
            series: "",
            vramGB: "",
            boostClockMHz: "",
            cores: ""
        },
        ram: {
            sizeGB: "",
            speedMHz: "",
            type: ""
        }
    };

    const [game, setGame] = useState(initialGameState);//Stores the game data
    const [selectedImage, setSelectedImage] = useState(null);//Stores the selected image

    // Fetch game data if in edit mode using the id from the URL
    useEffect(() => {
        if (isEditMode) {
            const fetchGame = async () => {
                try {
                    const res = await axios.get(`${backendUrl}/api/game/games/${id}`);
                    if (res.data.success) {
                        const fetchedGame = res.data.game;
                        console.log("Fetched Game Successfully", fetchedGame);
                        setGame(fetchedGame);
                        
                        // Handle existing image
                        if (fetchedGame.image) {
                            // Create a file object from the image URL
                            try {
                                const response = await fetch(fetchedGame.image);
                                const blob = await response.blob();
                                const file = new File([blob], 'game-image.jpg', { type: 'image/jpeg' });
                                setSelectedImage(file);
                                
                                // Update the image selector
                                if (imageSelectorRef.current) {
                                    imageSelectorRef.current.setImages([{
                                        file: file,
                                        preview: fetchedGame.image
                                    }]);
                                }
                            } catch (error) {
                                console.error("Error loading existing image:", error);
                                toast.error("Failed to load existing image");
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error fetching game:", error);
                    toast.error("Failed to load game data");
                }
            };
            fetchGame();
        }
    }, [id]);

    // Handle input changes for top-level fields(name, description, image)
    const handleInputChange = (field, value) => {
        setGame((prevGame) => ({
            ...prevGame,
            [field]: value,
        }));
    };

    // Handle nested field changes (cpu, gpu, ram)
    const handleNestedInputChange = (category, field, value) => {
        setGame((prevGame) => ({
            ...prevGame,
            [category]: {
                ...prevGame[category],
                [field]: value,
            },
        }));
    };

    // Validate required fields
    const validateRequiredFields = (gameData, isEditMode = false) => {
        const requiredFields = [
            "name", "description",
            "cpu.cores", "cpu.threads", "cpu.baseClock", "cpu.boostClock",
            "gpu.series", "gpu.vramGB", "gpu.boostClockMHz", "gpu.cores",
            "ram.sizeGB", "ram.speedMHz", "ram.type"
        ];
        const missingFields = requiredFields.filter(field => {
            if (field.includes(".")) {
                const [category, subField] = field.split(".");
                return !gameData[category][subField] || gameData[category][subField] === "";
            }
            return !gameData[field] || gameData[field] === "";
        });


        // Special validation for image in add mode
        if (!isEditMode && !selectedImage) {
            missingFields.push("image");
        }

        // Enforce GHz for CPU clocks and MHz for GPU boost clock. Converts the values to strings, trims them, and converts them to lowercase
        const baseClock = gameData.cpu.baseClock.toString().trim().toLowerCase();
        const boostClock = gameData.cpu.boostClock.toString().trim().toLowerCase();
        const gpuBoostClock = gameData.gpu.boostClockMHz.toString().trim().toLowerCase();

        if (!baseClock.includes("ghz")) {
            setGame(prev => ({
                ...prev,
                cpu: { ...prev.cpu, baseClock: `${baseClock} GHz` }
            }));//Appends the GHz to the baseClock if it doesn't already include it
        }
        if (!boostClock.includes("ghz")) {
            setGame(prev => ({
                ...prev,
                cpu: { ...prev.cpu, boostClock: `${boostClock} GHz` }
            }));//Appends the GHz to the boostClock if it doesn't already include it
        }
        if (!gpuBoostClock.includes("mhz")) {
            setGame(prev => ({
                ...prev,
                gpu: { ...prev.gpu, boostClockMHz: `${gpuBoostClock} MHz` }
            }));//Appends the MHz to the boostClockMHz if it doesn't already include it
        }

        if (missingFields.length > 0) {
            throw new Error(`Please fill in all required fields: ${missingFields.join(", ")}. CPU clocks must include GHz, GPU boost clock must include MHz.`);
        }
    };

    // Handle form submission
    const onSubmitHandler = async (e) => {
        e.preventDefault();//Prevents the default behavior of the form
        setLoading(true);
        try {
            const formData = new FormData();//Creates a new FormData object to store the form data

            if (selectedImage) {
                formData.append("image", selectedImage);
            }

            // Validate fields
            validateRequiredFields(game, isEditMode);

            // Prepare game data for submission (remove image field since it's handled separately)
            const gameData = { ...game };
            delete gameData.image;
            delete gameData.imagePublicId;//Removes the image and imagePublicId from the game data because it's handled separately in the formData object

            formData.append("name", gameData.name);
            formData.append("description", gameData.description);
            formData.append("cpu", JSON.stringify(gameData.cpu));//Converts the cpu object to a string and appends it to the formData object
            formData.append("gpu", JSON.stringify(gameData.gpu));//Converts the gpu object to a string and appends it to the formData object
            formData.append("ram", JSON.stringify(gameData.ram));//Converts the ram object to a string and appends it to the formData object

            const endpoint = isEditMode
                ? `${backendUrl}/api/game/games/${id}`//If edit mode is true, the endpoint is the game ID
                : `${backendUrl}/api/game/games`;//If edit mode is false, the endpoint is the games endpoint

            const response = isEditMode
                ? await axios.put(endpoint, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                })//Updates the game using the PUT request
                : await axios.post(endpoint, formData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });//Adds a new game using the POST request

            if (response.data.success) {
                toast.success(isEditMode ? "Game updated successfully" : "Game added successfully");
                if (!isEditMode) {
                    setGame(initialGameState);//Resets the game state to the initial state
                    setSelectedImage(null);//Resets the selected image to null
                    if (imageSelectorRef.current) {
                        imageSelectorRef.current.deleteAllImages();//Deletes all images from the image selector
                    }
                } else {
                    navigate('/adminpanel/games/managegames');//Navigates to the manage games page if edit mode is true
                }
            } else {
                toast.error(isEditMode ? "Error updating game" : "Error adding game. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    //Render the component for the create games page
    return (
        <div>
            <FullScreenLoader open={loading} message={isEditMode ? "Updating game..." : "Creating game..."} />
            <div>
                <div className='mt-3 mb-5 ml-6 mr-6'>
                    <div><PageTitle value={isEditMode ? 'Edit Game' : 'Add New Game'}></PageTitle></div>
                    <CustomBreadcrumbs
                        paths={[
                            { label: 'Games', href: "/adminpanel/games/managegames" },
                            { label: isEditMode ? 'Edit Game' : 'New Game' },
                        ]}
                    />
                </div>
                <div>
                    {/* Form for the create games page */}
                    <form onSubmit={onSubmitHandler}>
                        <div className='grid-flow-* gap-20 pl-3 pr-3 grid gap-y-4 mb-4'>
                            <div className='Details border-2 border-gray-100 rounded-lg pt-4 pb-4'>
                                <div className='DetailsHeader ml-3 mr-3 h-fit mb-4'>
                                    <Typography variant='h5' fontWeight="bold">Details</Typography>
                                    <Typography variant='body1' fontWeight="bold" style={{ color: theme.palette.black700.main }}>Name, Description, Image</Typography>
                                </div>
                                <hr></hr>
                                {/* Details Body */}
                                <div className='DetailsBody ml-3 mr-3'>
                                    <div className='formTitle1 mt-2 mb-4'>
                                        <Typography variant='h6' fontWeight="bold" style={{ marginBottom: "6px" }}>Name</Typography>
                                        <InputField
                                            onChange={(value) => handleInputChange('name', value)}
                                            value={game.name}
                                            type='text'
                                            label="Game Name"
                                            width='100%'
                                        />
                                    </div>
                                    {/* Description Body for the create games page with a text area*/}
                                    <div className='formTitle2 mt-4 mb-4'>
                                        <Typography variant='h6' fontWeight="bold" style={{ marginBottom: "6px" }}>Description</Typography>
                                        <InputField
                                            onChange={(value) => handleInputChange('description', value)}
                                            value={game.description}
                                            type='text'
                                            label="Description"
                                            width='100%'
                                            rows={12}
                                        />
                                    </div>
                                    <div className='formTitle3 mt-4 mb-4'>
                                        <Typography variant='h6' fontWeight="bold" style={{ marginBottom: "6px" }}>Image</Typography>
                                        <ImageSelector
                                            ref={imageSelectorRef}
                                            onImagesSelect={(images) => {
                                                setSelectedImage(images[0]); // Only one image for games
                                                setGame((prevGame) => ({
                                                    ...prevGame,
                                                    image: images.length > 0 ? URL.createObjectURL(images[0]) : ""
                                                }));
                                            }}
                                            maxImages={1} // Limit to one image
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='Requirements border-2 border-gray-100 rounded-lg drop-shadow-2xl pt-4 pb-4'>
                                <div className='RequirementsHeader ml-3 mr-3 h-fit mb-4'>
                                    <Typography variant='h5' fontWeight="bold">System Requirements</Typography>
                                    <Typography variant='body1' fontWeight="bold" style={{ color: theme.palette.black700.main }}>CPU, GPU, RAM Specifications</Typography>
                                </div>
                                <hr></hr>
                                <div className='RequirementsBody ml-3 mr-3'>
                                    <div className='cpuRequirements grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <Typography variant='h6' fontWeight="bold">CPU Requirements</Typography>
                                        <div className='subCpuRequirements grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div>
                                                {/* CPU Cores Input Field */}
                                                <InputField
                                                    type='select'
                                                    label="Cores"
                                                    options={cpuCores}
                                                    width='100%'
                                                    value={game.cpu.cores}
                                                    onChange={(value) => handleNestedInputChange('cpu', 'cores', value)}
                                                />
                                            </div>
                                            <div>
                                                {/* CPU Threads Input Field */}
                                                <InputField
                                                    type='select'
                                                    label="Threads"
                                                    options={cpuThreads}
                                                    width='100%'
                                                    value={game.cpu.threads}
                                                    onChange={(value) => handleNestedInputChange('cpu', 'threads', value)}
                                                />
                                            </div>
                                            <div>
                                                {/* CPU Base Clock Input Field */}
                                                <InputField
                                                    type='text'
                                                    placeholder="e.g., 3.2 GHz"
                                                    label="Base Clock (GHz)"
                                                    width='100%'
                                                    value={game.cpu.baseClock}
                                                    onChange={(value) => handleNestedInputChange('cpu', 'baseClock', value)}
                                                />
                                            </div>
                                            <div>
                                                {/* CPU Boost Clock Input Field */}
                                                <InputField
                                                    type='text'
                                                    placeholder="e.g., 4.6 GHz"
                                                    label="Boost Clock (GHz)"
                                                    width='100%'
                                                    value={game.cpu.boostClock}
                                                    onChange={(value) => handleNestedInputChange('cpu', 'boostClock', value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='gpuRequirements grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <Typography variant='h6' fontWeight="bold">GPU Requirements</Typography>
                                        <div className='subGpuRequirements grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div>
                                                {/* GPU Series Input Field */}
                                                <InputField
                                                    type='select'
                                                    label="Series"
                                                    options={[
                                                        // NVIDIA RTX 40 Series
                                                        { value: 'RTX_4090', label: 'NVIDIA GeForce RTX 4090' },
                                                        { value: 'RTX_4080_Super', label: 'NVIDIA GeForce RTX 4080 Super' },
                                                        { value: 'RTX_4080', label: 'NVIDIA GeForce RTX 4080' },
                                                        { value: 'RTX_4070_Ti_Super', label: 'NVIDIA GeForce RTX 4070 Ti Super' },
                                                        { value: 'RTX_4070_Ti', label: 'NVIDIA GeForce RTX 4070 Ti' },
                                                        { value: 'RTX_4070_Super', label: 'NVIDIA GeForce RTX 4070 Super' },
                                                        { value: 'RTX_4070', label: 'NVIDIA GeForce RTX 4070' },
                                                        { value: 'RTX_4060_Ti', label: 'NVIDIA GeForce RTX 4060 Ti' },
                                                        { value: 'RTX_4060', label: 'NVIDIA GeForce RTX 4060' },
                                                        // NVIDIA RTX 30 Series
                                                        { value: 'RTX_3090_Ti', label: 'NVIDIA GeForce RTX 3090 Ti' },
                                                        { value: 'RTX_3090', label: 'NVIDIA GeForce RTX 3090' },
                                                        { value: 'RTX_3080_Ti', label: 'NVIDIA GeForce RTX 3080 Ti' },
                                                        { value: 'RTX_3080', label: 'NVIDIA GeForce RTX 3080' },
                                                        { value: 'RTX_3070_Ti', label: 'NVIDIA GeForce RTX 3070 Ti' },
                                                        { value: 'RTX_3070', label: 'NVIDIA GeForce RTX 3070' },
                                                        { value: 'RTX_3060_Ti', label: 'NVIDIA GeForce RTX 3060 Ti' },
                                                        { value: 'RTX_3060', label: 'NVIDIA GeForce RTX 3060' },
                                                        // AMD RX 7000 Series
                                                        { value: 'RX_7900_XTX', label: 'AMD Radeon RX 7900 XTX' },
                                                        { value: 'RX_7900_XT', label: 'AMD Radeon RX 7900 XT' },
                                                        { value: 'RX_7800_XT', label: 'AMD Radeon RX 7800 XT' },
                                                        { value: 'RX_7700_XT', label: 'AMD Radeon RX 7700 XT' },
                                                        { value: 'RX_7600_XT', label: 'AMD Radeon RX 7600 XT' },
                                                        { value: 'RX_7600', label: 'AMD Radeon RX 7600' },
                                                        // AMD RX 6000 Series
                                                        { value: 'RX_6950_XT', label: 'AMD Radeon RX 6950 XT' },
                                                        { value: 'RX_6900_XT', label: 'AMD Radeon RX 6900 XT' },
                                                        { value: 'RX_6800_XT', label: 'AMD Radeon RX 6800 XT' },
                                                        { value: 'RX_6800', label: 'AMD Radeon RX 6800' },
                                                        { value: 'RX_6750_XT', label: 'AMD Radeon RX 6750 XT' },
                                                        { value: 'RX_6700_XT', label: 'AMD Radeon RX 6700 XT' },
                                                        { value: 'RX_6650_XT', label: 'AMD Radeon RX 6650 XT' },
                                                        { value: 'RX_6600_XT', label: 'AMD Radeon RX 6600 XT' },
                                                        { value: 'RX_6600', label: 'AMD Radeon RX 6600' },
                                                        // Intel Arc Series
                                                        { value: 'Arc_B580', label: 'Intel Arc B580' },
                                                        { value: 'Arc_B570', label: 'Intel Arc B570' },
                                                        { value: 'Arc_A770', label: 'Intel Arc A770' },
                                                        { value: 'Arc_A750', label: 'Intel Arc A750' },
                                                        { value: 'Arc_A580', label: 'Intel Arc A580' },
                                                        { value: 'Arc_A380', label: 'Intel Arc A380' },
                                                        { value: 'Arc_A310', label: 'Intel Arc A310' }
                                                    ]}
                                                    width='100%'
                                                    value={game.gpu.series}
                                                    onChange={(value) => handleNestedInputChange('gpu', 'series', value)}
                                                />
                                            </div>
                                            <div>
                                                {/* GPU VRAM Input Field */}
                                                <InputField
                                                    type='select'
                                                    label="VRAM (GB)"
                                                    options={gpuVramOptions}
                                                    width='100%'
                                                    value={game.gpu.vramGB}
                                                    onChange={(value) => handleNestedInputChange('gpu', 'vramGB', value)}
                                                />
                                            </div>
                                            <div>
                                                {/* GPU Boost Clock Input Field */}
                                                <InputField
                                                    type='text'
                                                    placeholder="e.g., 2520 MHz"
                                                    label="Boost Clock (MHz)"
                                                    width='100%'
                                                    value={game.gpu.boostClockMHz}
                                                    onChange={(value) => handleNestedInputChange('gpu', 'boostClockMHz', value)}
                                                />
                                            </div>
                                            <div>
                                                {/* GPU Cores Input Field */}
                                                <InputField
                                                    type='text'
                                                    label="Cores"
                                                    width='100%'
                                                    value={game.gpu.cores}
                                                    onChange={(value) => handleNestedInputChange('gpu', 'cores', value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='ramRequirements grid gap-4 grid-cols-1 flex flex-row mt-4 mb-4'>
                                        <Typography variant='h6' fontWeight="bold">RAM Requirements</Typography>
                                        <div className='subRamRequirements grid gap-y-2 gap-x-4 grid-cols-4 flex flex-row'>
                                            <div>
                                                {/* RAM Size Input Field */}
                                                <InputField
                                                    type='select'
                                                    label="Size (GB)"
                                                    options={ramSizeOptions}
                                                    width='100%'
                                                    value={game.ram.sizeGB}
                                                    onChange={(value) => handleNestedInputChange('ram', 'sizeGB', value)}
                                                />
                                            </div>
                                            <div>
                                                {/* RAM Speed Input Field */}
                                                <InputField
                                                    type='select'
                                                    label="Speed (MHz)"
                                                    options={ramSpeedOptions}
                                                    width='100%'
                                                    value={game.ram.speedMHz}
                                                    onChange={(value) => handleNestedInputChange('ram', 'speedMHz', value)}
                                                />
                                            </div>
                                            <div>
                                                {/* RAM Type Input Field */}
                                                <InputField
                                                    type='select'
                                                    label="Type"
                                                    options={ramTypeOptions}
                                                    width='100%'
                                                    value={game.ram.type}
                                                    onChange={(value) => handleNestedInputChange('ram', 'type', value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='p-4'>
                                {/*Cancel Button */}
                                <div className='float-right flex flex-row gap-x-2'>
                                    {isEditMode && (
                                        <PrimaryButton
                                            fontSize="16px"
                                            name="Cancel"
                                            buttonSize="medium"
                                            isBold={1}
                                            color={"ternaryDark"}
                                            padding="50px"
                                            type="button"
                                            onClick={() => navigate('/adminpanel/games/managegames')}
                                        />
                                    )}
                                    {/* Submit Button */}
                                    <PrimaryButton
                                        fontSize="16px"
                                        name={isEditMode ? 'Update Game' : 'Add Game'}
                                        buttonSize="medium"
                                        isBold={1}
                                        type="submit"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateGames;//Exports the CreateGames component
