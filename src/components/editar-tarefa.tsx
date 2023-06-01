import { useEffect, useState } from "react";
import { useTarefaContext } from "@/contexts/tarefa-context";
import { stringify } from "querystring";
import { TarefaInterface } from "@/types/data-types";

interface Props {
    tarefaId: string;
    mostrar?: boolean;
    onHidden?(mostrar: boolean): void;
}

export function EditarTarefa(props: Props) {
    const { tarefaId, mostrar, onHidden } = props;
    const { buscarTarefaPorId } = useTarefaContext();
    const [tarefa, setTarefa] = useState<TarefaInterface | null>(null)

    useEffect(() => {
        if (mostrar) {
            document.body.style.overflow = "hidden";

            (async () => {
                const _tarefa = await buscarTarefaPorId(tarefaId);
                setTarefa(_tarefa);
            })();
        } else {
            document.body.style.overflow = "";
        }
    }, [mostrar])

    return (
        <div
            onClick={() => onHidden && onHidden(false)}
            className={`${mostrar ? 'left-0' : 'hidden -left-100'} absolute z-50 top-0  h-screen w-full bg-black/70 flex justify-end transition duration-500 ease-in-out`}
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className="min-h-full w-[500px] bg-black shadow flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-black-light">
                    <h2 className="font-bold text-xl">Editar Tarefa</h2>
                </div>

                {/* Body */}
                <div className="h-full p-4">
                    <pre>
                        {JSON.stringify(tarefa, null, 4)}
                    </pre>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-black-light">
                    <button>Guardar</button>
                </div>
            </div>
        </div>
    );
}