import Button from "../Button";

export default function CloseModalButton({ onClick }) {
    return (
        <div className={'flex-row mt-10'}>
            <Button onClick={onClick} content={'Close'} className={'w-full'}>X</Button>
        </div>
    );
}