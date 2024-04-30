import React, { useEffect, useState } from 'react'
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';


const SearchPage = () => {
    const [newReleases, setNewReleases] = useState([]);
    const [showList, setShowList] = useState([]);
    const [browseSingle, setBrowseSingle] = useState([]);
    // const [{ token },dispatch] = useStateProvider();
    const token = 'BQCAfowAkKo95FseEM0gBblh4xyDAaDq0cHrHgk3pCbO06SURThVT8uau9rO219FFrccObLwrfMfv71VTbPHItfgKpeUy3KbzLTOlVAlqWJEbJQGp0R2tRBdbnGtYyILQ11EsvfzzTcO4kVtKRLHrAwi5afLQU1cSeshV-s9AjFsVE-nxZfm-IwbfCdVNVH9kYUTEoxiIc86RHxUEr7hMLz9iPr30oJYpd4saA';
    useEffect(() => {
        const getPlaybackState = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/browse/new-releases?offset=0&limit=6", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });

            setNewReleases(data);
        };

        const getshowlist = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/browse/categories?offset=0&limit=6", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            console.log(data)
            setShowList(data);
        };

        const getbrowsesingle = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/browse/featured-playlists?offset=0&limit=6", {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            console.log('browseSingle', data)
            setBrowseSingle(data);
        };
        getbrowsesingle();
        getPlaybackState();
        getshowlist();
    }, [token]);
    console.log(newReleases)
    return (
        <>
            <div className='flex flex-row  text-white  relative'>


                <div className='w-[20%] flex h-dvh sticky top-0 flex-col gap-3 '>

                    <Sidebar />
                </div>


                <div >



                    <div >
                        <Navbar />

                    </div>

                    <div className=' overflow-x-autoflex flex-col justify-end '>
                        <div>
                            <h1 className="text-2xl font-bold mx-7">New Releases</h1>
                        </div>
                        <div className='w-auto overflow-x-auto flex flex-row justify-end '>


                            {
                                showList?.categories?.items?.map((item) => (
                                    <div key={item.id} className='w-[160px] m-7' >
                                        <img src={item.icons[0].url} alt={item.name} className="w-full rounded-lg h-auto" />
                                        <p className="text-md font-bold mt-2">{item.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>


                    <div className='w-fit overflow-x-auto flex flex-col justify-end '>
                        <div>
                            <h1 className="text-2xl font-bold mx-7">New Releases</h1>
                        </div>
                        <div className='w-auto overflow-x-auto flex flex-row justify-end'>


                            {
                                browseSingle?.playlists?.items?.map((item) => (
                                    <div key={item.id} className='w-[160px] m-7' >
                                        <img src={item.images[0].url} alt={item.name} className="w-full rounded-lg h-auto" />
                                        <p className="text-md font-bold mt-2">{item.name}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>


                    <div className='w-fit overflow-x-auto flex flex-col justify-end'>
                        <div>
                            <h1 className="text-2xl font-bold mx-7">New Releases</h1>
                        </div>
                        <div className='w-auto overflow-x-auto flex flex-row justify-end'>


                            {newReleases?.albums?.items?.map((item) => (
                                <div key={item.id} className='w-[160px] m-7' >
                                    <img src={item.images[0].url} alt={item.name} className="w-full rounded-lg h-auto" />
                                    <p className="text-md font-bold mt-2">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.artists[0].name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                         
            </div>
            
        </>
    );
}

export default SearchPage



