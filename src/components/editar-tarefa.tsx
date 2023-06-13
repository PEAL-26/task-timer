import { ChangeEvent, ChangeEventHandler, KeyboardEvent, useEffect, useState } from "react";

import { BsTag } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import { IoCloseSharp } from 'react-icons/io5';
import { MdOutlineTimer } from 'react-icons/md';
import { AiOutlineCalendar } from 'react-icons/ai';

import { InputCheck } from "./input-check";
import { CronometroInterface, DataMetaInterface, EstadoEnum, LembreteInterface, TarefaInterface } from "@/types/data-types";
import { useTarefaContext } from "@/contexts/tarefa-context";
import { InputAutoComplete } from "./input-auto-complete";
import { DateTimePicker } from "./datetime-picker";

interface Props {
    tarefaId: string;
    mostrar?: boolean;
    onHidden?(mostrar: boolean): void;
}

export function EditarTarefa(props: Props) {
    const { tarefaId, mostrar, onHidden } = props;

    const {
        subTarefas: _subTarefas,
        projectos,
        buscarTarefaPorId,
        buscarSubTarefaPorId,
        adicionarSubTarefa,
        editar,
        editarSubtarefa,
        remover,
        removerSubtarefa,
        promoverSubTarefa
    } = useTarefaContext();

    const [tarefa, setTarefa] = useState<TarefaInterface | null>(null);
    const [subTarefa, setSubTarefa] = useState('');

    const subTarefas = _subTarefas.filter((sub) => sub.tarefaPrincipalId === tarefaId);

    const adicionarSubMenu = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            adicionarSubTarefa(tarefaId, { titulo: subTarefa });
            setSubTarefa('');
        }
    }

    const getTarefa = async () => {
        const _tarefa = await buscarTarefaPorId(tarefaId);
        setTarefa(_tarefa);
    }

    const handleClose = () => {
        onHidden && onHidden(false);
    }

    const handleTarefaDelete = () => {
        remover(tarefaId);
        handleClose();
    }

    const handleToggleEstadoTarefa = async (id: string, estado: EstadoEnum) => {
        const foundSubTarefa = await buscarTarefaPorId(id);

        if (foundSubTarefa) {
            foundSubTarefa.estado = estado
            editar(id, foundSubTarefa);
        }
    }

    // TODO handleChangeProjecto
    const handleChangeProjecto = (projecto: string) => {
        setTarefa({
            ...tarefa,
            titulo: tarefa?.titulo ?? '',
            projecto
        });
    };

    // TODO handleChangeMeta
    const handleChangeMetas = ({ inicio, conclusao }: DataMetaInterface) => {
        setTarefa({
            ...tarefa,
            titulo: tarefa?.titulo ?? '',
            dataMeta: { inicio, conclusao }
        });
    };

    // TODO handleChangeLembrete
    const handleChangeLembrete = ({ tipo, valor }: LembreteInterface) => {
        setTarefa({
            ...tarefa,
            titulo: tarefa?.titulo ?? '',
            lembrete: { tipo, valor }
        });
    };

    // TODO handleDeleteCronometro
    const handleDeleteCronometro = (id: string) => {
        const cronometro: CronometroInterface[] = [];
        tarefa?.cronometro?.forEach((item) => {
            item.id !== id && cronometro.push(item)
        });


        setTarefa({
            ...tarefa,
            titulo: tarefa?.titulo ?? '',
            cronometro
        });
    };

    const handleChangeNota = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
        setTarefa({ ...tarefa, titulo: tarefa?.titulo ?? '', notas: target.value });
    };

    // Handle Subtarefa
    const handleValueChangeSubtarefa = (id: string, value: string) => {
        if (id) editarSubtarefa(id, { titulo: value });
    }

    const handleDeleteSubtarefa = async (id: string) => {
        removerSubtarefa(id);
    }

    const handleToggleEstadoSubtarefa = async (id: string, estado: EstadoEnum) => {
        const foundSubTarefa = await buscarSubTarefaPorId(id);

        if (foundSubTarefa) {
            foundSubTarefa.estado = estado
            editarSubtarefa(id, foundSubTarefa);
        }
    }

    const handlePromoverSubTarefa = (id: string) => {
        promoverSubTarefa(id);
    }

    useEffect(() => {
        if (mostrar) {
            document.body.style.overflow = "hidden";

            getTarefa();
            setSubTarefa('');
        } else {
            document.body.style.overflow = "";
        }
    }, [mostrar]);

    useEffect(() => {
        if (tarefa)
            editar(tarefaId, tarefa);

    }, [tarefa]);

    return (
        <div

            className={`${mostrar ? '' : 'hidden'} fixed top-0 left-0 right-0 bottom-0 z-50  h-screen w-full bg-black/70 flex justify-end group`}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className={`${mostrar ? 'right-0' : '-right-[1000px]'} transition-all duration-1000 ease-in-out absolute min-h-full w-[500px] bg-black shadow flex flex-col `}>
                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3">
                    <button type="button" className="p-2 hover:bg-gray/20 rounded-md" onClick={handleTarefaDelete}>
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
                        <InputCheck
                            classNameContainer='mb-3'
                            size="text-xl"
                            value={tarefa?.titulo}
                            state={tarefa?.estado}
                            onChangeValue={(value) => {
                                setTarefa({ ...tarefa, titulo: value });
                            }}
                            onChangeState={(e) => handleToggleEstadoTarefa(tarefaId, e)}
                        />

                        {subTarefas.map(({ id, titulo, estado }) =>
                        (<>
                            <InputCheck
                                key={id}
                                menu={true}
                                tarefaId={id}
                                value={titulo}
                                state={estado}
                                descricao={titulo}
                                classNameContainer='mb-1'

                                onChangeValue={(value) => handleValueChangeSubtarefa(id ?? '', value)}
                                onDelete={() => handleDeleteSubtarefa(id ?? '')}
                                onPromotingTask={() => handlePromoverSubTarefa(id ?? '')}
                                onChangeState={(e) => handleToggleEstadoSubtarefa(id ?? '', e)}
                            />
                            <hr className="border-gray/30 w-full mb-2" />
                        </>)
                        )}

                        <InputCheck
                            type='add'
                            value={subTarefa}
                            onChangeValue={setSubTarefa}
                            onKeyDown={adicionarSubMenu}
                            placeholder="Adicionar subtarefa"
                        />
                    </div>

                    {/* Outras Opções */}
                    <div className="flex flex-col bg-black-light w-full rounded-md px-2 py-3">
                        <div className="flex items-center gap-2">
                            <BsTag size={20} />
                            <InputAutoComplete
                                value={tarefa?.projecto ?? ''}
                                onChangeValue={(value) => {
                                    setTarefa({ ...tarefa, titulo: tarefa?.titulo ?? '', projecto: value });
                                }}
                                items={projectos}
                            />
                        </div>
                        <hr className="border-gray/30 w-full my-2" />
                        <div className="flex items-center gap-2">
                            <DateTimePicker />
                            -
                            <DateTimePicker />
                        </div>
                        <hr className="border-gray/30 w-full my-2" />
                        <div className="flex items-center gap-2">
                            <MdOutlineTimer size={20} />
                            <p>Lembrete</p>
                        </div>
                    </div>

                    {/* Cronómetro */}
                    {/* TODO: Cronometro */}
                    <div className="flex flex-col bg-black-light w-full rounded-md px-2 py-3">
                        Cronómetro
                        {tarefa?.cronometro?.map(({ descricao, dataInicio, tempo }) => (
                            <div className="flex justify-between">
                                <p>{descricao}</p>

                                <div className="flex">
                                    <p>{dataInicio.toString()}</p>
                                    -
                                    <p>{tempo}</p>
                                </div>
                            </div>
                        ))}

                        {tarefa?.cronometro && tarefa.cronometro.length > 0 &&
                            (<>
                                <hr className="border-gray/30 w-full mb-2" />
                                <p className="text-xs text-center">
                                    Tempo total: 0
                                </p>
                            </>)}
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
                    {/* TODO: Data de ínicio e data de conclusão */}
                    <p>Estado: Data da criação da tarefa, ou conclusão</p>
                </div>
            </div>
        </div>
    );
}