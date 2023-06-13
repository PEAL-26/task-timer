import { BsCircle, BsFillCheckCircleFill } from 'react-icons/bs';

import { useTarefaContext } from "../contexts/tarefa-context";
import { EstadoEnum } from '@/types/data-types';

interface Props {
    tarefaId?: string;
}

export function TarefaIcon(props: Props) {
    const { tarefaId } = props;
    const { tarefas, subTarefas : _subTarefas } = useTarefaContext();

    const [tarefa] = tarefas.filter(({ id }) => id === tarefaId);
    const subTarefas = _subTarefas.filter(({ tarefaPrincipalId }) => tarefaPrincipalId === tarefaId);

    const icon = () => {
        const estado = tarefa.estado;
        if (!estado || estado === 'INICIADA' || estado === 'PENDENTE' || estado === 'PAUSADA')
            return <BsCircle />

        return <div className='bg-white rounded-full'>
            <BsFillCheckCircleFill className='stroke-white fill-green' />
        </div>
    }
    return (
        <div className="flex items-center">
            {icon()}
            <div className="ml-2 flex flex-col cursor-pointer">
                <span className=''>{tarefa?.titulo}</span>
                {subTarefas.length > 0 && <span className='text-[9px] '>{
                    `Subtarefas: ${subTarefas.filter(pre => pre.estado === EstadoEnum.CONCLUIDA).length} de ${subTarefas.length}`
                }</span>}
            </div>
        </div>
    );
}