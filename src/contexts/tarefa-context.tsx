'use client';

import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { CronometroInterface, EstadoEnum, TarefaInterface } from '@/types/data-types';

interface TarefaContextData {
    tarefas: TarefaInterface[];
    subTarefas: TarefaInterface[];
    projectos: string[];
    adicionar(tarefa: TarefaInterface): void;
    adicionarSubTarefa(tarefaId: string, tarefa: TarefaInterface): void;
    editarSubTarefa(id: string, tarefa: TarefaInterface): void;
    adicinarCronometro(tarefaId: string, props: CronometroInterface): void;
    editar(id: string, tarefa: TarefaInterface): void;
    remover(id: string): void;
    iniciar(id: string): void;
    pausar(id: string): void;
    concluir(id: string): void;
    actualizarTempoInicio(id: string, tempo: number): void;
    actualizarTempoFim(id: string, tempo: number): void;
    buscarTarefaPorId(id: string): Promise<TarefaInterface | null>;
    listarSubTarefasPorTarefa(tarefaId: string): Promise<TarefaInterface[]>;
}

type Props = {
    children?: React.ReactNode;
};

const TarefaContext = createContext<TarefaContextData>({} as TarefaContextData);

export const TarefaProvider: React.FC<Props> = ({ children }) => {
    const [tarefas, setTarefas] = useState<TarefaInterface[]>([]);
    const [subTarefas, setSubTarefas] = useState<TarefaInterface[]>([]);
    const [projectos, setProjectos] = useState<string[]>([]);

    const buscarTarefaPorId = async (id: string) => {
        const promise = new Promise<TarefaInterface | null>((resolve) => {
            const tarefa = tarefas.find(value => value.id === id);

            resolve(tarefa ?? null);
        })

        return promise;
    }

    const listarSubTarefasPorTarefa = async (tarefaId: string) => {
        const promise = new Promise<TarefaInterface[]>((resolve) => {
            const _subTarefas = subTarefas.filter(tarefa => tarefa.tarefaPrincipalId === tarefaId);

            resolve(_subTarefas);
        })

        return promise;
    }

    const adicionar = (tarefa: TarefaInterface) => {
        setTarefas([...tarefas, { ...tarefa, id: uuidv4() }]);

        // const projecto = tarefa.projecto?.trim() ?? '';
        // const projectIsNotEmpty = projecto.length !== 0;
        // const projectIsNotExist = !!!projectos.find(proj => proj === projecto);

        // if (projectIsNotEmpty && projectIsNotExist) {
        //     setProjectos([...projectos, projecto]);
        // }

        const projecto = tarefa.projecto?.trim() ?? '';

        if (projecto && !projectos.includes(projecto)) {
            setProjectos([...projectos, projecto]);
        }
    }

    const adicionarSubTarefa = (tarefaId: string, tarefa: TarefaInterface) => {
        setSubTarefas([...subTarefas, { ...tarefa, id: uuidv4(), tarefaPrincipalId: tarefaId }]);
    }

    const adicinarCronometro = (tarefaId: string, props: CronometroInterface) => {
        const { descricao, dataInicio, tempo } = props;

        const updatedItems = tarefas.map((item) => {
            if (item.id === tarefaId) {
                item.cronometro?.push({ descricao, dataInicio, tempo })
            }

            return item;
        });

        setTarefas(updatedItems);
    }

    const editar = (id: string, tarefa: TarefaInterface) => {
        const updatedItems = tarefas.map((item) =>
            item.id === id ? tarefa : item
        );

        setTarefas(updatedItems);
    }

    const editarSubTarefa = (id: string, tarefa: TarefaInterface) => {
        const updatedItems = subTarefas.map((item) =>
            item.id === id ? tarefa : item
        );

        setSubTarefas(updatedItems);
    }

    const remover = (id: string) => {
        setTarefas(prevItems => prevItems.filter(prevItem => prevItem.id !== id));
    }

    const iniciar = (id: string) => {
        const novaListaTarefas = tarefas.map(tarefa => {
            if (tarefa.id === id) {
                return {
                    ...tarefa,
                    estado: EstadoEnum.INICIADA
                };
            } else {
                return tarefa;
            }
        });

        setTarefas(novaListaTarefas);
    }

    const pausar = (id: string) => {
        const novaListaTarefas = tarefas.map(tarefa => {
            if (tarefa.id === id) {
                return {
                    ...tarefa,
                    estado: EstadoEnum.PAUSADA
                };
            } else {
                return tarefa;
            }
        });

        setTarefas(novaListaTarefas);
    }

    const concluir = (id: string) => {
        const novaListaTarefas = tarefas.map(tarefa => {
            if (tarefa.id === id) {
                return {
                    ...tarefa,
                    dataConclusao: new Date(),
                    estado: EstadoEnum.CONCLUIDA
                };
            } else {
                return tarefa;
            }
        });

        setTarefas(novaListaTarefas);
    }

    const actualizarTempoInicio = (id: string, tempo: number) => {
        // const novaListaTarefas = tarefas.map(tarefa => {
        //     if (tarefa.id === id) {
        //         return {
        //             ...tarefa,
        //             dataConclusao: new Date(tempo),
        //             cronometro: [...tarefa.cronometro ?? [], { inicio: tempo }],
        //         };
        //     } else {
        //         return tarefa;
        //     }
        // });

        // setTarefas(novaListaTarefas);
    }

    const actualizarTempoFim = (id: string, tempo: number) => {
        // const novaListaTarefas = tarefas.map(tarefa => {
        //     if (tarefa.id === id) {
        //         return {
        //             ...tarefa,
        //             dataConclusao: new Date(tempo),
        //             cronometro: [...tarefa.cronometro, {}],
        //         };
        //     } else {
        //         return tarefa;
        //     }
        // });

        // setTarefas(novaListaTarefas);
    }

    return (
        <TarefaContext.Provider
            value={{
                tarefas,
                subTarefas,
                projectos,
                adicionar,
                adicionarSubTarefa,
                editarSubTarefa,
                adicinarCronometro,
                editar,
                remover,
                iniciar,
                pausar,
                concluir,
                actualizarTempoInicio,
                actualizarTempoFim,
                buscarTarefaPorId,
                listarSubTarefasPorTarefa
            }}>
            {children}
        </TarefaContext.Provider>
    );
};

export const useTarefaContext = () => useContext(TarefaContext);