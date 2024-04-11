import CloseModalButton from "../CloseModalButton";
import Rating from "../Rating";
import {Fragment} from "react";

export default function ShowTvShowDetails({ tvShow, setShowDetails }) {
    return (
        <Fragment>
            <div className={'flex-row'}>
                <img className={'max-half-width'} src={tvShow.poster_path ? `${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/w500${tvShow.poster_path}` : '/default.png'}
                    alt={tvShow.name}/>
                <div className={'flex-column'}>
                    <h2>{tvShow.name}</h2>
                    <p>{tvShow.overview}</p>
                    <p>First Air Date: {tvShow.first_air_date}</p>
                    <p>Rating: {tvShow.vote_average}</p>
                    <Rating item={tvShow} />
                </div>
            </div>
            <CloseModalButton onClick={() => setShowDetails(false)} />
        </Fragment>
    );
}