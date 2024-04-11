import CustomCarousel from "../../CustomCarousel";
import {Fragment} from "react";

export default function SearchResults({db, movies, tvShows, persons}) {
    return (
        <Fragment>
            <CustomCarousel db={db} title={'Movies'} items={movies.map((movie) => ({
                ...movie,
                type: 'movie',
            }))} />
            <CustomCarousel db={db} title={'Tv-shows'} items={tvShows.map((tvShow) => ({
                ...tvShow,
                type: 'tv',
            }))} />
            <CustomCarousel db={db} title={'Persons'} items={persons.map((person) => ({
                ...person,
                type: 'person',
            }))} />
        </Fragment>
    )
}