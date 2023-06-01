import Layout from "@/components/layout";
import TabelaTarefas from "@/components/tabela-tarefas";
import { EditarTarefa } from "@/components/editar-tarefa";
import { AdicionarTarefa } from "@/components/adicionar-tarefa";
import { useState } from "react";

export default function MinhasTarefas() {
    const [tarefaId, setTarefaId] = useState('');
    const [mostrarEditor, setMostrarEditor] = useState(false);

    return (
        <Layout title={'Minhas Tarefas'}>
            <AdicionarTarefa />

            <TabelaTarefas onEdit={(tarefaId: string, mostrar: boolean) => {
                setTarefaId(tarefaId);
                setMostrarEditor(mostrar);
            }} />

            <EditarTarefa
                tarefaId={tarefaId}
                mostrar={mostrarEditor}
                onHidden={setMostrarEditor}
            />
        </Layout>
    );
}
