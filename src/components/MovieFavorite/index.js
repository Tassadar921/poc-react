import {Icon} from "@iconify/react";
import {Fragment} from "react";

export default function MovieFavorite({ favorite, setFavorite }) {
    return (
        <Fragment>
            <Icon
                className={'cursor-pointer'}
                icon={'mdi:heart'}
                color={favorite ? 'red' : 'gray'}
                onClick={() => setFavorite(!favorite)}
            />
        </Fragment>
    );
}