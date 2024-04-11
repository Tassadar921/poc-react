export default function Audio({src, label='', autoplay= false}) {
    return (
        <div className={'audio'}>
            {label ? <p>{label}</p> : ''}
            <audio src={src} controls {...(autoplay ? {autoPlay: true} : {})} />
        </div>
    );
}