
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react';

import { useTarefaContext } from "../contexts/tarefa-context";
import { EstadoEnum } from '../types/data-types';
import { EstadoIcon } from './estado-icon';


interface Props {
    id?: string;
    descricao?: string;
}

interface DataTotalProps {
    inicio?: Date;
    conclusao?: Date;
}

export function Temporizador(props: Props) {
    const { id, descricao } = props;

    const {
        tarefas,
        subTarefas,
        iniciar,
        pausar,
        adicinarCronometro,
        buscarTarefaPorId,
        buscarSubTarefaPorId,
    } = useTarefaContext();

    const getTarefa = async () => await buscarTarefaPorId(id ?? '');
    const getSubTarefa = async () => await buscarSubTarefaPorId(id ?? '');

    const [start, setStart] = useState(false);
    const [estado, setEstado] = useState<EstadoEnum>(EstadoEnum.PENDENTE);
    const [tempo, setTempo] = useState(0);
    const [dataInicio, setDataInicio] = useState<Date | null>(null);
    const [dataTotal, setDataTotal] = useState<DataTotalProps | null>(null);
    const [tempoTotal, setTempoTotal] = useState(0);

    const handleEstadoToggle = async () => {
        const tarefa = await getTarefa();
        const subTarefa = await getSubTarefa();

        if (tarefa?.estado === EstadoEnum.INICIADA || subTarefa?.estado === EstadoEnum.INICIADA)
            id && pausar(id);
        else
            id && iniciar(id);
    }

    const formatTime = (tempo: number) => {
        /* TODO Formatar tempo Total do tempo 
            
        00:00:00 => ao clicar sobre abrir um popover com o tempo :
            Mostrar o total em segundos
            >= 60seg    => Mostrar o total em minutos
            >= 60min    => Mostrar o total em horas
            >= 24h      => Mostrar o total em dias
            >= 7dias    => Mostrar o total em semanas
            >= 4semanas => Mostrar o total em meses
            >= 12anos   => Mostrar o total em anos
        */

        const hours = Math.floor(tempo / 3600);
        const minutes = Math.floor((tempo % 3600) / 60);
        const seconds = tempo % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');


        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    /**
     *TODO: Formatar a data
     *Se for um dia anteroir a data atual, formatar para ontem às 00:00
     *Se for um dia apos a data actual, formatar para amanhã às 00:00
     *Caso contrário, formatar com data ano-mes-dia às 00:00
     */

    // useEffect(() => {
    //     if (tarefa?.estado === 'INICIADA')
    //         setStart(true);
    //     else
    //         setStart(false);
    // }, [tarefa?.estado]);

    useEffect(() => {
        if (start) {
            setDataInicio(new Date());
            const intervalId = setInterval(() => {
                setTempo(prevTime => prevTime + 1);
            }, 1000);

            return () => clearInterval(intervalId);
        } else {

            if (id && dataInicio) {
                adicinarCronometro(id, { descricao: descricao ?? '', dataInicio, tempo });
                setTempo(0);
            }
        }
    }, [start]);

    return (
        <div className="flex items-center justify-between w-full">
            <span className='text-xs flex-1'>
                {start
                    ? formatTime(tempo)
                    : (
                        <Tippy 
                        content={<span className='bg-black rounded-sm p-1'>...</span>} >
                            <span>{formatTime(tempoTotal)}</span>
                        </Tippy>
                    )
                }
            </span>

            {estado !== EstadoEnum.CONCLUIDA
                ? <EstadoIcon play={start} onClick={handleEstadoToggle} />
                : null
            }
        </div>
    );
}