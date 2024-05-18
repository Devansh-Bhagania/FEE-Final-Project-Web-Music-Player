import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateProvider } from '../utils/StateProvider';

const Modal = () => {
    const [playlistName, setPlaylistName] = useState('');
    const [description, setDescription] = useState('');
    const [isOpen, setIsOpen] = useState(true); 
    const [{ token, userInfo }] = useStateProvider();
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        setPlaylistName(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to create the playlist here using Spotify API
        // Example code:
        fetch(`
        https://api.spotify.com/v1/users/${userInfo.userId}/playlists`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            body: JSON.stringify({
            name: playlistName,
            description: description
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Playlist created:', data);
            // Close the modal or perform any other actions
        })
        .catch(error => {
            console.error('Error creating playlist:', error);
            // Handle the error or display an error message
        });
        // Add your logic to create the playlist here
        console.log('Creating playlist:', playlistName);
        // Close the modal or perform any other actions
    };

    const closeModal = () => {
        setIsOpen(false);
        navigate('/');
    };

    const modalStyle = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    };

    return (
        <div className="modal w-[400px] h-auto z-[100]" style={modalStyle}>
            <div className='flex flex-row justify-between'>
                <h2>Create Playlist</h2>
                <button onClick={closeModal}>X</button>
            </div>
            
            <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
                <label htmlFor="playlistName">Playlist Name:</label>
                <input
                    type="text"
                    id="playlistName"
                    value={playlistName}
                    onChange={handleInputChange}
                />
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default Modal;
