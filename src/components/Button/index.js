export default function Button({ onClick, content, className }) {
    return (
        <button className={`button ${className}`} onClick={onClick}>{ content }</button>
    );
}