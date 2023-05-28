import { CiPlay1, CiPause1 } from 'react-icons/ci';

interface Props {
    play?: boolean;
    onClick?(): void;
}

export function EstadoIcon(props: Props) {
    const { play, onClick } = props;

    return (
        <button className="flex items-center justify-center" onClick={onClick}>
            {play ? <CiPause1 className='fill-red' size={24} /> : <CiPlay1 size={24} />}
        </button>
    );
}