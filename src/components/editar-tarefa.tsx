import { ChangeEvent, ChangeEventHandler, KeyboardEvent, useEffect, useState } from "react";

import { IoCloseSharp } from 'react-icons/io5';
import { FaTrash } from 'react-icons/fa';

import { InputCheck } from "./input-check";
import { TarefaInterface } from "@/types/data-types";
import { useTarefaContext } from "@/contexts/tarefa-context";

interface Props {
    tarefaId: string;
    mostrar?: boolean;
    onHidden?(mostrar: boolean): void;
}

export function EditarTarefa(props: Props) {
    const { tarefaId, mostrar, onHidden } = props;
    const { buscarTarefaPorId, listarSubTarefasPorTarefa, adicionarSubTarefa, remover } = useTarefaContext();
    const [tarefa, setTarefa] = useState<TarefaInterface | null>(null);
    const [subTarefa, setSubTarefa] = useState('');
    const [subTarefas, setSubTarefas] = useState<TarefaInterface[]>([]);

    const adicionarSubMenu = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            adicionarSubTarefa(tarefaId, { titulo: subTarefa });

            await carregarListaSubTarefas();
            setSubTarefa('');
        }
    }

    const carregarListaSubTarefas = async () => {
        const _subTarefas = await listarSubTarefasPorTarefa(tarefaId);

        console.log(_subTarefas);
        setSubTarefas(_subTarefas);
    }

    const getTarefa = async () => {
        const _tarefa = await buscarTarefaPorId(tarefaId);
        setTarefa(_tarefa);
    }

    const handleClose = () => {
        onHidden && onHidden(false);
    }

    const handleDelete = () => {
        remover(tarefaId);
        handleClose();
    }

    const handleChangeNota = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
        setTarefa({ ...tarefa, titulo: tarefa?.titulo ?? '', notas: target.value });
    };

    useEffect(() => {
        if (mostrar) {
            document.body.style.overflow = "hidden";

            getTarefa();
            carregarListaSubTarefas();
            setSubTarefa('');
        } else {
            document.body.style.overflow = "";
        }
    }, [mostrar]);

    return (
        <div

            className={`${mostrar ? '' : 'hidden'} fixed top-0 left-0 right-0 bottom-0 z-50  h-screen w-full bg-black/70 flex justify-end group`}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className={`${mostrar ? 'right-0' : '-right-[1000px]'} transition-all duration-1000 ease-in-out absolute min-h-full w-[500px] bg-black shadow flex flex-col `}>
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3">
                    <button type="button" className="p-2 hover:bg-gray/20 rounded-md" onClick={handleDelete}>
                        <FaTrash className='fill-gray cursor-pointer ' />
                    </button>

                    <button type="button" className="p-2 hover:bg-gray/20 rounded-md" onClick={handleClose} >
                        <IoCloseSharp className='fill-white cursor-pointer' size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 h-full px-4 gap-4 ">
                    {/* Tarefas e Subtarefas */}
                    <div className="flex flex-col bg-black-light w-full rounded-md px-2 py-3">
                        <InputCheck classNameContainer='mb-3' value={tarefa?.titulo} size="text-xl" onValueChange={(value) => {
                            setTarefa({ ...tarefa, titulo: value });
                        }} />

                        {subTarefas.map(({ id, titulo }) =>
                        (<>
                            <InputCheck
                                key={id}
                                menu={true}
                                value={titulo}
                                classNameContainer='mb-1'
                                onValueChange={() => { }}
                            />
                            <hr className="border-gray/30 w-full mb-2" />
                        </>)
                        )}

                        {/* {subTarefas.length > 0 && <hr className="border-gray/30 w-full mb-2" />} */}

                        <InputCheck
                            type='add'
                            value={subTarefa}
                            onValueChange={setSubTarefa}
                            onKeyDown={adicionarSubMenu}
                            placeholder="Adicionar subtarefa"
                        />
                    </div>

                    {/* Outras Opções */}
                    <div className="flex flex-col bg-black-light w-full rounded-md px-2 py-3">
                        <p>Projecto</p>
                        <hr className="border-gray/30 w-full my-2" />
                        <p>Lembrete</p>
                        <hr className="border-gray/30 w-full my-2" />
                        <p>Metas</p>
                    </div>

                    {/* Cronómetro */}
                    <div className="flex flex-col bg-black-light w-full rounded-md px-2 py-3">
                        Cronómetro
                    </div>

                    {/* Notas */}
                    <div className="flex flex-col bg-black-light w-full rounded-md px-2 py-3">
                        <textarea
                            rows={4}
                            placeholder="Notas"
                            value={tarefa?.notas ?? ''}
                            onChange={handleChangeNota}
                            className="bg-black-light placeholder-gray text-white border-none outline-none"
                        ></textarea>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-black-light text-center">
                    <p>Estado: Data da criação da tarefa, ou conclusão</p>
                </div>
            </div>
        </div>
    );
}