'use client';

import { HTMLProps, useEffect, useState } from "react";

import { BsTag } from 'react-icons/bs';
import { MdOutlineTimer } from 'react-icons/md';
import { AiOutlineSend, AiOutlineCalendar } from 'react-icons/ai';

import { useTarefaContext } from "@/contexts/tarefa-context";
import { TarefaInterface } from "../types/tarefa";

interface Props extends HTMLProps<HTMLInputElement> {

}

export function AdicionarTarefa(props: Props) {

    const { adicionar } = useTarefaContext();
    const [formData, setFormData] = useState<TarefaInterface | null>(null);

    const handleChangeTarefa = () => {
        // setFormData({ formData: value, projecto, tempo, dataConclusao })
    }

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        // processa os dados do formulário aqui
        console.log(formData);
        if (formData) adicionar(formData)

        setFormData(null);
    }


    return (
        <form className="flex bg-black-light rounded-md py-3 px-4 mb-6 relative" onSubmit={handleSubmit}>
            <input
                type="text"
                name=""
                id=""
                className="w-full bg-black-light placeholder-gray text-white border-none outline-none"
                placeholder="Adicione uma tarefa"
                value={formData?.tarefa ?? ''}
                onChange={(event) => {
                    setFormData({ tarefa: event.target.value })
                    handleChangeTarefa();
                }}
            />

            {formData?.tarefa && <div className="absolute top-0 right-0 h-full flex items-center justify-center p-3 gap-3">
                <button><BsTag size={24} /></button>
                <button><AiOutlineCalendar size={24} /></button>
                <button><MdOutlineTimer size={24} /></button>
                <button className="ml-2" type="submit">
                    <AiOutlineSend className="text-white" size={26} />
                </button>
            </div>}
        </form>
    );
}