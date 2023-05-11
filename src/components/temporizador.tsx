
import { useEffect, useState } from 'react';
import { useTarefaContext } from "../contexts/tarefa-context";
import { EstadoEnum } from '../types/data-types';
import { EstadoIcon } from './estado-icon';

interface Props {
    tarefaId?: string;
}

export function Temporizador(props: Props) {
    const { tarefaId } = props;
    const { tarefas, iniciar, pausar } = useTarefaContext();
    const [tarefa] = tarefas.filter(({ id }) => id === tarefaId);

    const [play, setPlay] = useState(false);

    const handleEstadoToggle = () => {
        if (tarefa.estado === EstadoEnum.INICIADA)
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
            <span className='text-xs flex-1'>{`${tarefa.dataInicio}-${tarefa.dataConclusao}`}</span>
            {tarefa.estado !== EstadoEnum.CONCLUIDA
                ? <EstadoIcon play={play} onClick={handleEstadoToggle} />
                : null
            }
        </div>
    );
}