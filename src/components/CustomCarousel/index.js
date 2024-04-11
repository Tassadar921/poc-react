import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import CustomCarouselItem from "./CustomCarouselItem";
import {Fragment, useState} from "react";
import ReactModal from "react-modal";
import ShowPersonDetails from "../ShowPersonDetails";
import ShowTvShowDetails from "../ShowTvShowDetails";
import ShowMovieDetails from "../ShowMovieDetails";

export default function CustomCarousel({ db, title = '', items }) {
    const [showDetails, setShowDetails] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const onItemClick = (item) => {
        setSelectedItem(item);
        setShowDetails(true);
    }
    return (
        <Fragment>
            <h2 className={items.length ? '' : 'hidden'}>{title}</h2>
            <Carousel infiniteLoop={items.length > 6} emulateTouch useKeyboardArrows>
                {items.map((item) => (
                    <CustomCarouselItem key={item.id} item={item} onClick={onItemClick} />
                ))}
            </Carousel>
            {selectedItem ?
                <ReactModal isOpen={showDetails} appElement={document.getElementById('root')}>
                    {selectedItem.type === 'person' ? <ShowPersonDetails person={selectedItem} setShowDetails={setShowDetails} />
                        : selectedItem.type === 'tv' ? <ShowTvShowDetails tvShow={selectedItem} setShowDetails={setShowDetails} />
                            : <ShowMovieDetails db={db} movie={selectedItem} setShowDetails={setShowDetails}/>
                    }
                </ReactModal>
                : null}

        </Fragment>
    );
}
