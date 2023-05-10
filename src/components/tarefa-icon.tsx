import { BsCircle, BsFillCheckCircleFill } from 'react-icons/bs';

import { useTarefaContext } from "../contexts/tarefa-context";

interface Props {
    tarefaId?: string;
}

export function TarefaIcon(props: Props) {
    const { tarefaId } = props;
    const { tarefas } = useTarefaContext();

    const [tarefa] = tarefas.filter(({ id }) => id === tarefaId);

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
            <span className='ml-2 cursor-pointer'>{tarefa?.tarefa}</span>
        </div>
    );
}