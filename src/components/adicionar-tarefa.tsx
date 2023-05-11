'use client';

import { HTMLProps, useRef, useState } from "react";

import Tippy from '@tippyjs/react';
import { AiOutlineCalendar, AiOutlineSend } from 'react-icons/ai';
import { BsTag } from 'react-icons/bs';
import { MdOutlineTimer } from 'react-icons/md';

import { useTarefaContext } from "@/contexts/tarefa-context";
import { TarefaInterface } from "../types/data-types";

interface Props extends HTMLProps<HTMLInputElement> {

}

export function AdicionarTarefa(props: Props) {
    const { adicionar } = useTarefaContext();
    const [formData, setFormData] = useState<TarefaInterface | null>(null);
    const [openProjecto, setOpenProjecto] = useState(false);
    const refPopover = useRef<HTMLDivElement>(null);
    const refElement = useRef<HTMLButtonElement>(null);

    const handleChangeTarefa = () => {
        // setFormData({ formData: value, projecto, tempo, dataConclusao })
    }

    const handleToggleProjecto = () => {
        setOpenProjecto(!openProjecto);
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
                    setFormData({ ...formData, tarefa: event.target.value })
                    handleChangeTarefa();
                }}
            />

            {formData?.tarefa && <div className="absolute top-0 right-0 h-full flex items-center justify-center p-3 gap-3">

                {/* Projecto/Categoria */}
                <Tippy
                    content={
                        <div className="bg-black-light rounded-md py-3 px-4 mb-2 w-56">
                            <input
                                type="text"
                                name=""
                                id=""
                                className="w-full bg-black-light placeholder-gray text-white border-none outline-none"
                                placeholder="Projecto ou categoria"
                                value={formData?.projecto ?? ''}
                                onChange={(event) => {
                                    setFormData({ ...formData, projecto: event.target.value })
                                    handleChangeTarefa();
                                }}
                            />
                        </div>
                    }
                    allowHTML
                    interactive
                    duration={0}
                    animation='perspective'
                    trigger='click'
                    placement='top-end'
                >
                    <button type="button">
                        <BsTag size={24} />
                    </button>
                </Tippy>

                {/* Metas: {Inicio, Conclusão} */}
                <Tippy
                    content={
                        <div className="flex flex-col bg-black-light rounded-md py-3 px-4 mb-2 w-56 shadow-white">
                            <span className="text-base text-gray">Metas:</span>
                            <span className="text-xs">Data de Início</span>
                            <input
                                type="datetime-local"
                                name=""
                                id=""
                                className="w-full bg-black-light placeholder-gray text-white border-none outline-none"
                                placeholder="Projecto ou categoria"
                                value={formData?.projecto ?? ''}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        dataMeta: {
                                            ...formData.dataMeta,
                                            inicio: new Date(event.target.value)
                                        }
                                    })
                                    handleChangeTarefa();
                                }}
                            />
                            <span className="text-xs">Data de Conclusão</span>
                            <input
                                type="datetime-local"
                                name=""
                                id=""
                                className="w-full bg-black-light placeholder-gray text-white border-none outline-none"
                                placeholder="Projecto ou categoria"
                                value={formData?.projecto ?? ''}
                                onChange={(event) => {
                                    setFormData({
                                        ...formData,
                                        dataMeta: {
                                            ...formData.dataMeta,
                                            conclusao: new Date(event.target.value)
                                        }
                                    })
                                    handleChangeTarefa();
                                }}
                            />
                        </div>
                    }
                    allowHTML
                    interactive
                    duration={0}
                    animation={'perspective-subtle'}
                    trigger={'click'}
                >
                    <button type="button"><AiOutlineCalendar size={24} /></button>
                </Tippy>

                {/* Lembrete */}
                <Tippy
                    content={<span>Tooltip</span>}
                    allowHTML
                    interactive
                    duration={0}
                    animation={'perspective-subtle'}
                    trigger={'click'}
                >
                    <button type="button"><MdOutlineTimer size={24} /></button>
                </Tippy>

                {/* Adicionar tarefa */}
                <button className="ml-2" type="submit">
                    <AiOutlineSend className="text-white" size={26} />
                </button>
            </div>}
        </form >
    );
}