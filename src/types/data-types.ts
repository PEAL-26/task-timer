export enum EstadoEnum {
  PENDENTE = "PENDENTE",
  INICIADA = "INICIADA",
  PAUSADA = "PAUSADA",
  CONCLUIDA = "CONCLUÍDA",
}

export enum ImportanciaEnum {
  NORMAL = "NORMAL",
  URGENTE = "URGENTE",
}

export interface CronometroInterface {
  id?: string;
  descricao: string;
  dataInicio: Date;
  tempo: number;
}

export enum LembreteTipoEnum {
  DIARIO = "DIÁRIO",
  SEMANAL = "SEMANAL",
  MENSAL = "MENSAL",
  ANUAL = "ANUAL",
  PERSONALIZADO = "PERSONALIZADO",
}

export enum LembretePersonalizadoEnum {
  DIAS = "DIAS",
  SEMANAS = "SEMANAS",
  MESES = "MESES",
  ANOS = "ANOS",
}

export interface LembretePersonalizadoInterface {
  tipo: LembretePersonalizadoEnum;
  valor: JSON;
}

export interface LembreteInterface {
  tipo: LembreteTipoEnum;
  valor: LembretePersonalizadoInterface | JSON;
}

export interface DataMetaInterface {
  inicio?: Date;
  conclusao?: Date;
}

export interface EstadoTarefaInterface {
  tarefaId: string;
  estado?: EstadoEnum;
  data: Date;
}

export interface TarefaInterface {
  id?: string;
  tarefaPrincipalId?: string | null;
  titulo: string;
  notas?: string;
  projecto?: string | null;
  cronometro?: CronometroInterface[] | null;
  dataInicio?: Date | null;
  dataConclusao?: Date | null;
  dataMeta?: DataMetaInterface | null;
  lembrete?: LembreteInterface | null;
  importancia?: ImportanciaEnum | null;
  estado?: EstadoEnum;
  estados?: EstadoTarefaInterface[];
  createdAt?: Date;
  updatedAt?: Date;
}
