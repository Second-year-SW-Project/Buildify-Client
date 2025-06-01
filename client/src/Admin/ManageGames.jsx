import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { UserTable } from "../MoleculesComponents/Table";
import { ProductCard } from "../AtomicComponents/Cards/Productcard";
import TimeCard from "../AtomicComponents/Cards/TimeCard";
import CustomBreadcrumbs from '../AtomicComponents/Breadcrumb';
import { PageTitle } from '../AtomicComponents/Typographics/TextStyles';
import { AddButton } from "../AtomicComponents/Buttons/Buttons";
import { SearchBar } from "../AtomicComponents/Inputs/Searchbar";
import DialogAlert from "../AtomicComponents/Dialogs/Dialogs";

function ManageGames() {

    //Backend URL
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [games, setGames] = useState([]);//Stores the games
    const [filteredGames, setFilteredGames] = useState([]);//Stores the filtered games
    const [searchTerm, setSearchTerm] = useState('');//Stores the search term
    const [openDialog, setOpenDialog] = useState(false);//Stores the open dialog
    const [selectedGameId, setSelectedGameId] = useState(null);//Stores the selected game ID for the delete dialog

    const navigate = useNavigate();//Navigates to the next page

    useEffect(() => {
        fetchGames();
    }, []);//Fetches the games when the component is mounted

    useEffect(() => {
        applyFilters();
    }, [searchTerm, games]);//Applies the filters when the search term or games change. games is the dependency

    const fetchGames = async (searchTerm = "") => {
        try {
            const response = await axios.get(`${backendUrl}/api/game/games`, {
                params: searchTerm ? { search: searchTerm } : {}
            });//Fetches the games from the backend. accepts a search term as a parameter

            console.log("API Response:", response.data);

            if (response.data && Array.isArray(response.data.games)) {
                const allGames = response.data.games;
                setGames(allGames);//if the response is successful, the games are set to the allGames array
                applyFilters(allGames);//applies the filters to the games
            } else {
                console.error("Expected an array but got:", response.data);//if the response is not successful, the games are set to an empty array and the filtered games are set to an empty array
                setGames([]);
                setFilteredGames([]);
            }
        } catch (error) {
            console.error("Error fetching games:", error);//if the response is not successful, the games are set to an empty array and the filtered games are set to an empty array
            setGames([]);
            setFilteredGames([]);
            toast.error("Failed to fetch games");
        }
    };

    const applyFilters = (allGames = games) => {
        let filtered = allGames;

        if (searchTerm) {
            filtered = filtered.filter(game =>
                game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                game.description.toLowerCase().includes(searchTerm.toLowerCase())
            );//Checks if the game name or description includes the search term
        }

        setFilteredGames(filtered);
    };

    const handleEdit = (id) => {
        navigate(`/adminpanel/games/creategame/${id}`);
    };//Takes the game ID and navigates to the create game page for editing

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${backendUrl}/api/game/games/${selectedGameId}`);//Sends a delete request to the backend to delete the game
            if (response.data.success) {
                toast.success("Game deleted successfully");
                fetchGames();//Fetches the games after deleting the game
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("Failed to delete game");
        }
        setOpenDialog(false);
    };

    const openDeleteDialog = (_id) => {
        console.log("Delete game ID:", _id);
        setSelectedGameId(_id);
        setOpenDialog(true);
    };//Opens the delete dialog

    const gameColumns = [
        { id: "gameCard", label: "Game" },
        { id: "date", label: "Added On" },
        { id: "cpu", label: "CPU Requirements" },
        { id: "gpu", label: "GPU Requirements" },
        { id: "ram", label: "RAM Requirements" },
    ];//Defines the columns for the game table

    const gameData = Array.isArray(filteredGames)
        ? filteredGames.map(game => ({
            id: game._id,
            gameCard: <ProductCard name={game.name} type="Game" src={game.image} />,
            date: <TimeCard date={new Date(game.createdAt).toLocaleDateString()} time={new Date(game.createdAt).toLocaleTimeString()} />,
            cpu: `${game.cpu.cores} Cores, ${game.cpu.threads} Threads, ${game.cpu.baseClock} - ${game.cpu.boostClock}`,
            gpu: `${game.gpu.series}, ${game.gpu.vramGB} GB VRAM, ${game.gpu.boostClockMHz}`,
            ram: `${game.ram.sizeGB} GB, ${game.ram.speedMHz} MHz, ${game.ram.type}`,
        }))
        : [];//Maps the filtered games to the game data that will be displayed in the table

    const iconTypes = ["edit", "delete"];
    const iconActions = {
        edit: (_id) => handleEdit(_id),
        delete: (_id) => openDeleteDialog(_id),
    };//Defines the icon actions for the game table

    //Render the component for the manage games page
    return (
        <div>
            <div>
                <div className='pl-6'>
                    {/* Header Section */}
                    <div className='mt-3'>
                        <PageTitle value="Manage Games" />
                        <CustomBreadcrumbs
                            paths={[
                                { label: 'Games', href: "/adminpanel/games/managegames" },
                                { label: 'Manage Games' },
                            ]}
                        />
                    </div>

                    {/* Button Section */}
                    <div className="pb-4 mr-4 flex justify-end">
                        <AddButton
                            name="Add Game"
                            isBold={1}
                            buttonSize="medium"
                            fontSize="16px"
                            onClick={() => navigate('/adminpanel/games/creategame')}
                        />
                    </div>

                    {/* Table and Filter Section */}
                    <div className="mb-10 mr-4 border-2 border-black-200 rounded-md">
                        <div className='filterForm grid gap-4 grid-cols-1 p-4'>
                            <div className='filterFormProperty1 grid gap-y-4 gap-x-4 grid-cols-4'>
                                <div className="col-span-2">
                                    <SearchBar
                                        placeholder="Search games by name or description"
                                        width="100%"
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            fetchGames(e.target.value);//
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div sx={{ width: '100%', borderRadius: "20px" }}>
                            <UserTable
                                columns={gameColumns}
                                data={gameData}
                                iconTypes={iconTypes}
                                iconActions={iconActions}
                            />
                        </div>
                    </div>

                    {/* Delete Confirmation Dialog */}
                    <DialogAlert
                        name="Delete Game"
                        Title="Confirm Deletion"
                        message="Are you sure you want to delete this game? This action cannot be undone."
                        Disagree="Cancel"
                        Agree="Delete"
                        open={openDialog}
                        handleClose={() => setOpenDialog(false)}
                        handleAgree={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
}

export default ManageGames;//Exports the ManageGames component
