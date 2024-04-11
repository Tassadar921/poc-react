import CustomCarousel from "../CustomCarousel";
import {Fragment, useEffect, useState} from "react";
import axios from "axios";

export default function Popular ({ db }) {
    const [popular, setPopular] = useState([]);
    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            try {
                return await axios.get(`${process.env.REACT_APP_TMDB_BASE_URL}/movie/popular`, {
                    params: {
                        api_key: process.env.REACT_APP_TMDB_API_KEY,
                        page: 1,
                        language: 'en-US',
                    }
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
                setPopular(response.data.results);
            }
        });

        return () => {
            source.cancel('Component unmounted: Canceling request');
        };
    }, []);

    return (
        <Fragment>
            <CustomCarousel db={db} title={'Popular'} items={popular.map((movie) => (
                {
                    ...movie,
                    type: 'movie',
                }
            ))} />
        </Fragment>
    );

}