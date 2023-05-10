import Layout from "@/components/layout";
import { AdicionarTarefa } from "@/components/adicionar-tarefa";
import TabelaTarefas from "@/components/tabela-tarefas";

export default function MinhasTarefas() {
    return (
        <Layout title={'Minhas Tarefas'}>
            <AdicionarTarefa  />
            <TabelaTarefas />
        </Layout>
    );
}
