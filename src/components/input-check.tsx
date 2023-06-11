import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react';

import { FaTrash } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { SlOptionsVertical } from 'react-icons/sl';
import { BsCircle, BsFillCheckCircleFill } from 'react-icons/bs';

import { EstadoEnum } from '@/types/data-types';
import { Temporizador } from './temporizador';

interface Props {
    size?: string;
    menu?: boolean;
    value?: string;
    tarefaId?: string;
    descricao?: string;
    state?: EstadoEnum;
    placeholder?: string;
    type?: 'normal' | 'add';
    classNameContainer?: string;

    onDelete?(): void;
    onPromotingTask?(): void;
    onChangeState?(state: EstadoEnum): void;
    onChangeValue?(value: string): void;
    onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;
}

export function InputCheck(props: Props) {
    const {
        size,
        menu,
        state,
        value,
        tarefaId,
        descricao,
        placeholder,
        type = 'normal',
        classNameContainer,

        onDelete,
        onKeyDown,
        onChangeState,
        onChangeValue,
        onPromotingTask,
    } = props;

    const [inputValue, setInputValue] = useState('');
    const [inputPlaceholder, setInputPlaceholder] = useState('');
    const [inputFocused, setInputFocused] = useState(false);
    const refInput = useRef<HTMLInputElement | null>(null);

    let inputIsEmpty = true;

    // Menu
    let isMenu = !!menu;
    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    const handleOnStateChange = () => {
        if (state && state === EstadoEnum.CONCLUIDA) {
            onChangeState && onChangeState(EstadoEnum.PENDENTE);
        } else {
            onChangeState && onChangeState(EstadoEnum.CONCLUIDA);
        }

        isMenu && hide();
    }

    const handleOnDelete = () => {
        onDelete && onDelete();
        isMenu && hide();
    }

    const handleOnPromotingTask = () => {
        onPromotingTask && onPromotingTask();
        isMenu && hide();
    }

    const handleOnValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onChangeValue && onChangeValue(e.target.value);
    }

    const icon = () => {
        if (type === 'add') {
            if (!inputFocused && inputIsEmpty)
                return <AiOutlinePlus className={`cursor-text ${size ?? ''}`} onClick={() => refInput?.current?.focus()} />

            if (inputFocused || !inputFocused && !inputIsEmpty)
                return <BsCircle className={`cursor-text ${size ?? ''}`} onClick={() => refInput?.current?.focus()} />
        } else {

            if (!state || state === EstadoEnum.INICIADA || state === EstadoEnum.PENDENTE || state === EstadoEnum.PAUSADA)
                return <BsCircle className={`cursor-pointer ${size ?? ''}`} onClick={handleOnStateChange} />

            return (
                <div className='bg-white rounded-full cursor-pointer' onClick={handleOnStateChange}>
                    <BsFillCheckCircleFill className={`stroke-white fill-green ${size ?? ''}`} />
                </div>
            );

        }

    }

    const onFocus = () => {
        setInputPlaceholder('');
        setInputFocused(true);
    }

    const onBlur = () => {
        setInputPlaceholder(placeholder ?? '');
        setInputFocused(false);
    }

    useEffect(() => {
        !inputFocused && setInputPlaceholder(placeholder ?? '');
        setInputValue(value ?? '');
    }, [placeholder, value]);

    useEffect(() => {
        inputIsEmpty = inputValue.trim().length === 0
        if (inputIsEmpty && inputFocused && type === 'add') setInputPlaceholder('');
    }, [inputValue]);

    return (
        <div className={`flex items-center gap-2 ${classNameContainer ?? ''}`}>
            {icon()}
            <input
                ref={refInput}
                type="text"
                className={`w-full bg-black-light placeholder-gray text-white border-none outline-none ${size ?? ''}`}
                value={inputValue}
                placeholder={inputPlaceholder}
                onChange={handleOnValueChange}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {isMenu &&
                <div className='flex items-center gap-2'>
                    <Temporizador tarefaId={tarefaId} descricao={descricao} />
                    <Tippy visible={visible} onClickOutside={hide}
                        content={
                            <div className="bg-black rounded-sm w-56 flex flex-col">
                                <button className='p-2 hover:bg-gray/20 rounded-t-sm text-left flex items-center gap-2' onClick={handleOnStateChange}>
                                    {state === EstadoEnum.CONCLUIDA
                                        ? <> <BsCircle />Marcar como não concluída </>
                                        : <>
                                            <div className='bg-white rounded-full'>
                                                <BsFillCheckCircleFill className={`stroke-white fill-green`} />
                                            </div>Marcar como concluída
                                        </>}
                                </button>


                                {state !== EstadoEnum.CONCLUIDA && <button className='p-2 hover:bg-gray/20 text-left flex items-center gap-2' onClick={handleOnPromotingTask}>
                                    <AiOutlinePlus className={`cursor-text ${size ?? ''}`} onClick={() => refInput?.current?.focus()} />
                                    Promover para tarefa
                                </button>}

                                <hr className="border-gray/30 w-full" />

                                <button className='p-2 hover:bg-gray/20 rounded-b-sm text-red/75 text-left flex items-center gap-2' onClick={handleOnDelete}>
                                    <FaTrash />Remover Subtarefa
                                </button>
                            </div>
                        }
                        allowHTML
                        interactive
                        duration={0}
                        animation='perspective'
                        trigger='click'
                        placement='bottom-end'
                    >
                        <button onClick={visible ? hide : show}>
                            <SlOptionsVertical className='fill-white cursor-pointer' />
                        </button>
                    </Tippy>
                </div>}
        </div>
    );
}