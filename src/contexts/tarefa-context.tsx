'use client';

import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { EstadoEnum, TarefaInterface } from '@/types/data-types';

interface TarefaContextData {
    tarefas: TarefaInterface[];
    adicionar(tarefa: TarefaInterface): void;
    editar(id: string, tarefa: TarefaInterface): void;
    remover(id: string): void;
    iniciar(id: string): void;
    pausar(id: string): void;
    concluir(id: string): void;
}

type Props = {
    children?: React.ReactNode;
};

const TarefaContext = createContext<TarefaContextData>({} as TarefaContextData);

export const TarefaProvider: React.FC<Props> = ({ children }) => {
    const [tarefas, setTarefas] = useState<TarefaInterface[]>([]);

    const adicionar = (tarefa: TarefaInterface) => {
        setTarefas([...tarefas, { ...tarefa, id: uuidv4() }]);
    }

    const editar = (id: string, tarefa: TarefaInterface) => {

    }

    const remover = (id: string) => {

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

    return (
        <TarefaContext.Provider
            value={{
                tarefas,
                adicionar,
                editar,
                remover,
                iniciar,
                pausar,
                concluir
            }}>
            {children}
        </TarefaContext.Provider>
    );
};

export const useTarefaContext = () => useContext(TarefaContext);