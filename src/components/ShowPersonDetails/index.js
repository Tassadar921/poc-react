import CloseModalButton from "../CloseModalButton";
import {Fragment} from "react";

export default function ShowPersonDetails({ person, setShowDetails }) {
    return (
        <Fragment>
            <div className={'flex-row'}>
                <img className={'max-half-width'} src={person.profile_path ? `${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/w500${person.profile_path}` : '/default.png'} alt={person.name} />
                <div className={'flex-column'}>
                    <h2>{person.name}</h2>
                    <p>Known For: {person.known_for_department}</p>
                    <p>Popularity: {person.popularity}</p>
                </div>
            </div>
            <CloseModalButton onClick={() => setShowDetails(false)} />
        </Fragment>
    );
}