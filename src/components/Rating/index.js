import {Icon} from "@iconify/react";
import {Fragment, useEffect, useRef, useState} from "react";
import axios from "axios";

export default function Rating({ item }) {
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const [rating, setRating] = useState(-1);

    const isMounted = useRef(false);

    const deleteRating = async () => {
        try {
            fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/${item.type}/${item.id}/rating`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    // toast success
                })
        } catch (error) {
            console.error('An error occurred:', error);
            // toast error
        }

    }

    useEffect(() => {
        const source = axios.CancelToken.source();

        const rate = async () => {
            if (isMounted.current) {
                try {
                    fetch(`${process.env.REACT_APP_TMDB_BASE_URL}/${item.type}/${item.id}/rating`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`
                        },
                        body: JSON.stringify({
                            value: rating,
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
        }

        rate();

        return () => {
            source.cancel('Component unmounted: Canceling request');
        };
    }, [rating]);

    return (
        <Fragment>
        <div className={'flex-row'}>
            {[...Array(10)].map((_, index) => (
                <Icon
                    onClick={() => setRating(index)}
                    className={'cursor-pointer'}
                    icon={'mdi:star'}
                    color={index <= Math.max(hoveredIndex, rating) ? 'gold' : 'gray'}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(-1)}
                    key={index}
                />
            ))}
        </div>
            {rating > 0 ?
                <div className={'flex-row'}>
                    <p className={'mr-5'}>Remove rating : </p>
                    <Icon
                        onClick={deleteRating}
                        className={'cursor-pointer'}
                        icon={'mdi:heart-broken'}
                        color={0 <= Math.max(hoveredIndex, rating) ? 'red' : 'gray'}
                        onMouseEnter={() => setHoveredIndex(0)}
                        onMouseLeave={() => setHoveredIndex(-1)}
                    />
                </div> : null
            }
        </Fragment>
    );
}