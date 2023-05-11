import { BiTask } from 'react-icons/bi';
import { useTarefaContext } from '../contexts/tarefa-context';
import { Temporizador } from './temporizador';
import { TarefaIcon } from './tarefa-icon';

export default function TabelaTarefas() {
    const { tarefas, concluir } = useTarefaContext();

    const handleConcluir = (event: { preventDefault: () => void; }, id: string) => {
        event.preventDefault();

        concluir(id)
    }

    return <>  {tarefas && tarefas?.length > 0 ?
        < table className="flex-1 flex flex-col " >
            <thead>
                <tr className="flex bg-black-light rounded-md  mb-3 ">
                    <th className="w-[48%] text-left py-3 px-4">Tarefa</th>
                    <th className="w-1/5 text-left border-l border-gray/20 py-3 px-4">Projeto</th>
                    <th className="w-2/12 text-left border-l border-gray/20 py-3 px-4">Cronómetro</th>
                    <th className="w-2/12 text-left border-l border-gray/20 py-3 px-4">Data Conclusão</th>
                </tr>
            </thead>

            <tbody className="flex-grow bg-black-light rounded-md pb-2">
                {tarefas?.map(({ id, projecto, dataConclusao }) => (
                    <tr key={id} className='flex w-full border-b border-gray/20 hover:bg-black/10'>
                        <td className="w-[48%] text-left py-2 px-4 flex items-center">{<TarefaIcon tarefaId={id} />}</td>
                        <td className="w-1/5 text-left border-l border-gray/20 py-2 px-4 flex items-center">
                            <span className='text-xs'>{projecto ?? 'Nenhum'}</span>
                        </td>
                        <td className="w-2/12 text-left border-l border-gray/20 py-2 px-4 flex items-center">
                            {<Temporizador tarefaId={id} />}
                        </td>
                        <td className="w-2/12 text-left border-l border-gray/20 py-2 px-4 flex items-center">
                            {dataConclusao
                                ? <span className='text-xs'>{dataConclusao.toDateString()}</span>
                                : <a
                                    className='text-blue cursor-pointer text-sm'
                                    onClick={(e) => handleConcluir(e, id ?? '')}
                                >
                                    Concluir
                                </a>
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table >
        :
        <div className="flex flex-col bg-black-light rounded-md items-center justify-center h-full py-4 px-3" >
            <BiTask size={100} />
            <span className="text-lg font-bold">Nenhuma tarefa adicionada</span>
        </div>
    } </>;
}