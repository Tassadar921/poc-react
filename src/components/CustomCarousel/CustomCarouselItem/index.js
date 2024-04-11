export default function CustomCarouselItem({ item, onClick }) {
    const imageUrl = item.type !== 'person' ?
        item.poster_path ?
            `${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/w500${item.poster_path}`
            : '/default.png'
        : item.profile_path ?
            `${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/w500${item.profile_path}`
            : '/default.png';
    const legend = item.type === 'movie' ? item.title : item.name;

    return (
        <div onClick={() => onClick(item)} className="carousel-item-container cursor-pointer">
            <img src={imageUrl} alt={item.title} className="carousel-picture" loading="lazy"/>
            <p className="legend">{legend}</p>
        </div>
    );
}
