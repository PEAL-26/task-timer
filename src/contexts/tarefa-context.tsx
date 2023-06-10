'use client';

import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EstadoEnum, TarefaInterface } from '@/types/data-types';

interface TarefaContextData {
    tarefas: TarefaInterface[];
    adicionar(tarefa: TarefaInterface): void;
    adicionarSubTarefa(tarefaId: string, tarefa: TarefaInterface): void;
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
    }

    const adicionarSubTarefa = (tarefaId: string, tarefa: TarefaInterface) => {
        setSubTarefas([...subTarefas, { ...tarefa, id: uuidv4(), tarefaPrincipalId: tarefaId }]);
    }

    const editar = (id: string, tarefa: TarefaInterface) => {

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
                adicionar,
                adicionarSubTarefa,
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