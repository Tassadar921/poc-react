import {Fragment, useEffect, useState} from "react";
import axios from "axios";
import Searchbar from "./Searchbar";
import ReactModal from 'react-modal';
import SearchResults from "./SearchResults";
import Button from "../Button";
import Genre from "../Genres";
import CloseModalButton from "../CloseModalButton";

export default function Search( {db}) {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [query, setQuery] = useState('');
    const [resultMovies, setResultMovies] = useState([]);
    const [resultTvShows, setResultTvShows] = useState([]);
    const [resultPersons, setResultPersons] = useState([]);
    useEffect(() => {
        const fetchData = () => {
            try {
                return [
                    axios.get(`${process.env.REACT_APP_TMDB_BASE_URL}/search/movie`, {
                        params: {
                            language: 'en-US',
                            page: 1,
                            query: query
                        },
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
                        }

                    }),
                    axios.get(`${process.env.REACT_APP_TMDB_BASE_URL}/search/tv`, {
                        params: {
                            language: 'en-US',
                            page: 1,
                            query: query
                        },
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
                        }

                    }),
                    axios.get(`${process.env.REACT_APP_TMDB_BASE_URL}/search/person`, {
                        params: {
                            language: 'en-US',
                            page: 1,
                            query: query
                        },
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
                        }

                    })
                ]
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        Promise.all(fetchData()).then((response) => {
            setResultMovies(response[0].data.results);
            setResultTvShows(response[1].data.results);
            setResultPersons(response[2].data.results);
        });
    }, [query]);
    return (
        <Fragment>
            <Button onClick={() => setModalIsOpen(true)} content="Search" />
            <Genre db={db}/>
            <ReactModal isOpen={modalIsOpen} appElement={document.getElementById('root')}>
                <Searchbar setQuery={setQuery} />
                <SearchResults db={db} movies={resultMovies ?? []} tvShows={resultTvShows ?? []} persons={resultPersons ?? []} />
                <CloseModalButton onClick={() => setModalIsOpen(false)} />
            </ReactModal>
        </Fragment>
    );
}
