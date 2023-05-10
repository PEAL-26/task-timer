export enum EstadoEnum {
  PENDENTE = "PENDENTE",
  INICIADA = "INICIADA",
  PAUSADA = "PAUSADA",
  CONCLUIDA = "CONCLUIDA",
}

export interface TarefaInterface {
  id?: string;
  tarefa: string;
  projecto?: string | null;
  tempo?: string | null;
  dataConclusao?: string | null;
  estado?: EstadoEnum;
}
