import { BsCircle, BsFillCheckCircleFill } from 'react-icons/bs';

import { useTarefaContext } from "../contexts/tarefa-context";
import { EstadoIcon } from './estado-icon';
import { useEffect, useState } from 'react';

interface Props {
    tarefaId?: string;
}

export function Temporizador(props: Props) {
    const { tarefaId } = props;
    const { tarefas, iniciar, pausar } = useTarefaContext();
    const [tarefa] = tarefas.filter(({ id }) => id === tarefaId);

    const [play, setPlay] = useState(false);

    const handleEstadoToggle = () => {
        if (tarefa.estado === 'INICIADA')
            pausar(tarefaId ?? '');
        else
            iniciar(tarefaId ?? '')
    }

    useEffect(() => {
        if (tarefa.estado === 'INICIADA')
            setPlay(false);
        else
            setPlay(true);

    }, [tarefa.estado])

    return (
        <div className="flex items-center justify-between w-full">
            <span className='text-xs flex-1'>{tarefa.tempo}</span>
            <EstadoIcon play={play} onClick={handleEstadoToggle} />
        </div>
    );
}