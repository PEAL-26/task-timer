# Task Timer

## Funcionalidades

- Agendar tarefas
- Iniciar, Pausar e Concluir Tarefa
- Repetir tarefa a cada (dia, semana, mês, ano), personalizado: ex.: todas 2ª Feiras
- Gerar um relatório de quanto tempo levou para concluir a tarefa
- Temporizador de tarefas
- Alarme de tarefa em andamento

## Modelagem

tarefas {
	id
	tarefa_principal_id
	tarefa
	nota
	grupo
	estado (pendente, iniciada, pausada, concluída)
	tipo_repeticao (diaria, semanal, mensal, anual, personalizada)
	data_inicial
	data_final
	tempo_repeticao
	importante
	data_conclusao
	created_at
	updated_at
}

repetir_tarefa_personalizada {
	tarefa_id
	dia_semana
	data_repetir
}

estado_tarefa {
	tarefa_id
	estado
	data
}