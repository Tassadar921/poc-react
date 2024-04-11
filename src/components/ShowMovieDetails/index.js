import CloseModalButton from "../CloseModalButton";
import {Fragment, useEffect, useRef, useState} from "react";
import Rating from "../Rating";
import MovieFavorite from "../MovieFavorite";
import axios from "axios";
import Comment from "../Comment";

export default function ShowMovieDetails({ db, movie, setShowDetails }) {
    const [favorite, setFavorite] = useState();
    const isMounted = useRef(false);
    useEffect(() => {
        const source = axios.CancelToken.source();

        if (isMounted.current) {
            try {
                fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/account/${process.env.REACT_APP_TMDB_ACCOUNT_ID}/favorite`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
                    },
                    body: JSON.stringify({
                        media_type: 'movie',
                        media_id: movie.id,
                        favorite: favorite
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        // toast success
                    })
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.warn('Request canceled', error.message);
                } else {
                    console.error('An error occurred:', error);
                }
                // toast error
            }
        } else {
            // Prevent posting to the api at loading
            isMounted.current = true;
        }

        return () => {
            source.cancel('Operation canceled by the user.');
        };

    }, [favorite]);
    return (
        <Fragment>
            <MovieFavorite favorite={favorite} setFavorite={setFavorite} />
            <div className={'flex-row'}>
                <img className={'max-half-width'} src={movie.poster_path ? `${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}` : '/default.png'} alt={movie.title} />
                <div className={'flex-column'}>
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <p>Release Date: {movie.release_date}</p>
                    <p>Rating: {movie.vote_average}</p>
                    <Rating item={movie} />
                </div>
            </div>
            <Comment db={db} id={movie.id} title={movie.title} />
            <CloseModalButton onClick={() => setShowDetails(false)} />
        </Fragment>
    );
}