
import { useEffect, useState } from 'react';

import { useTarefaContext } from "../contexts/tarefa-context";
import { EstadoEnum } from '../types/data-types';
import { EstadoIcon } from './estado-icon';

interface Props {
    tarefaId?: string;
    descricao?: string;
}

export function Temporizador(props: Props) {
    const { tarefaId, descricao } = props;

    const {
        tarefas,
        iniciar,
        pausar,
        adicinarCronometro
    } = useTarefaContext();

    const [tarefa] = tarefas.filter(({ id }) => id === tarefaId);

    const [play, setPlay] = useState(false);
    const [tempo, setTempo] = useState(0);
    const [dataInicio, setDataInicio] = useState<Date | null>(null);

    const handleEstadoToggle = () => {
        if (tarefa?.estado === EstadoEnum.INICIADA)
            pausar(tarefaId ?? '');
        else
            iniciar(tarefaId ?? '')
    }

    const formatTime = (tempo: number) => {
        const hours = Math.floor(tempo / 3600);
        const minutes = Math.floor((tempo % 3600) / 60);
        const seconds = tempo % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    useEffect(() => {
        if (tarefa?.estado === 'INICIADA')
            setPlay(true);
        else
            setPlay(false);
    }, [tarefa?.estado]);

    useEffect(() => {
        if (play) {
            setDataInicio(new Date());
            const intervalId = setInterval(() => {
                setTempo(prevTime => prevTime + 1);
            }, 1000);

            return () => clearInterval(intervalId);
        } else {

            if (tarefaId && dataInicio) {
                adicinarCronometro(tarefaId, { descricao: descricao ?? '', dataInicio, tempo });
                setTempo(0);
            }
        }
    }, [play]);

    return (
        <div className="flex items-center justify-between w-full">
            <span className='text-xs flex-1'>
                {play
                    ? formatTime(tempo)
                    : `${tarefa?.dataInicio}-${tarefa?.dataConclusao}`
                }
            </span>

            {tarefa?.estado !== EstadoEnum.CONCLUIDA
                ? <EstadoIcon play={play} onClick={handleEstadoToggle} />
                : null
            }
        </div>
    );
}