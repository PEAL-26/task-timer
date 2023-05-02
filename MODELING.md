# TaskTimer | Modelagem

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