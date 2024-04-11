import {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import Selector from '../Selector';
import CustomCarousel from "../CustomCarousel";

export default function Genre({db}) {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const source = axios.CancelToken.source();
        const fetchGenres = async () => {
            try {
                return await axios.get(`${process.env.REACT_APP_TMDB_BASE_URL}/genre/movie/list`, {
                    params: {
                        api_key: process.env.REACT_APP_TMDB_API_KEY,
                        language: 'en-US',
                    },
                });
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres().then((response) => {
            if (response) {
                setGenres([
                    {id: -1, name: 'All'},
                    ...response.data.genres
                ]);
            }
        });

        return () => {
            source.cancel('Component unmounted: Canceling request');
        };
    }, []);
    useEffect(() => {
        const fetchMovies = async () => {
            const params = {
                api_key: process.env.REACT_APP_TMDB_API_KEY,
                language: 'en-US',
                sort_by: 'popularity.desc',
                include_adult: false,
                include_video: false,
            };
            try {
                const response = await axios.get(`${process.env.REACT_APP_TMDB_BASE_URL}/discover/movie`, {
                    params: selectedGenre.id === -1 ? params : {
                        ...params,
                        with_genres: selectedGenre.id,
                    }
                });

                if (response) {
                    setMovies(response.data.results);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };
        fetchMovies();
    }, [selectedGenre]);
    return (
        <Fragment>
            <Selector options={genres} callback={setSelectedGenre}/>
            <CustomCarousel db={db} items={movies.map((movie) => ({
                ...movie,
                type: 'movie',
            }))} />
        </Fragment>
    )
}