import { useState } from "react";
import Tippy from '@tippyjs/react';
import Calendar from 'react-calendar';
import { AiOutlineCalendar } from 'react-icons/ai';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';

function incrementNumberArray(number: number) {
    const array = [];
    for (let index = 0; index <= number; index++) {
        array.push(index);
    }

    return array;
}

export function DateTimePicker() {
    const [value, setValue] = useState('');
    const HORAS = incrementNumberArray(23)
    const MINUTOS = incrementNumberArray(60)


    const onChange = () => {

    }

    return (
        <span
            className="inline-flex items-center justify-between text-sm text-white w-full"
        >
            {value}
            <Tippy
                content={
                    <div className="bg-black-light rounded-md py-3 px-4 mb-2 border h-52 overflow-hidden">
                        {/* Calendar */}
                        <div className="flex flex-row gap-4">
                            <div>
                                <Calendar onChange={onChange} value={value} />
                            </div>

                            {/* Timer */}
                            <div className="flex flex-row justify-center gap-2">

                                <div className="flex flex-col relative">
                                    <MdArrowDropUp size={24} className="cursor-pointer text-white absolute top-0" />
                                    {HORAS.map((hora) => (
                                        <span
                                            key={hora}
                                            className="p-1 hover:bg-black cursor-pointer rounded-md text-center"
                                        >{hora}</span>
                                    ))}
                                    <MdArrowDropDown size={24} className="cursor-pointer text-white absolute bottom-0" />
                                </div>

                                <div className="flex flex-col relative">
                                    <MdArrowDropUp size={24} className="cursor-pointer text-white absolute top-0" />
                                    {MINUTOS.map((min) => (
                                        <span
                                            key={min}
                                            className="p-1 hover:bg-black cursor-pointer rounded-md text-center"
                                        >{min}</span>
                                    ))}
                                    <MdArrowDropDown size={24} className="cursor-pointer text-white absolute bottom-0" />
                                </div>
                            </div>
                        </div>
                        <div className="inline-flex items-center justify-center gap-2 w-full mt-2">
                            <button>Cancelar</button>
                            <button>Guardar</button>
                        </div>
                    </div>
                }
                allowHTML
                interactive
                duration={0}
                animation='perspective'
                trigger='click'
                placement='left'
            >
                <button type="button">
                    <AiOutlineCalendar size={16} className="cursor-pointer" />
                </button>
            </Tippy>
        </span>
    );
}