import CustomCarousel from "../CustomCarousel";
import {Fragment, useEffect, useState} from "react";
import axios from "axios";

export default function Popular ({ db }) {
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                return await axios.get(`${process.env.REACT_APP_TMDB_BASE_URL}/account/${process.env.REACT_APP_TMDB_ACCOUNT_ID}/favorite/movies`, {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`,
                    },
                    params: {
                        language: 'en-US',
                        page: 1
                    },
                });
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.warn('Request canceled', error.message);
                } else {
                    console.error('An error occurred:', error);
                }
            }
        };

        fetchData().then((response) => {
            if (response) {
                setFavorites(response.data.results);
            }
        });

        return () => {
            source.cancel('Component unmounted: Canceling request');
        };
    }, []);

    return (
        <Fragment>
            <CustomCarousel db={db} title={'Favorites'} items={favorites.map((movie) => (
                {
                    ...movie,
                    type: 'movie',
                }
            ))} />
        </Fragment>
    );

}