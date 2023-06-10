import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react';

import { AiOutlinePlus } from 'react-icons/ai';
import { SlOptionsVertical } from 'react-icons/sl';
import { BsCircle, BsFillCheckCircleFill } from 'react-icons/bs';

import { EstadoEnum } from '@/types/data-types';

interface Props {
    value?: string;
    state?: EstadoEnum;
    size?: string;
    placeholder?: string;
    classNameContainer?: string;
    type?: 'normal' | 'add';
    menu?: boolean;
    onChecked?(state: boolean): void;
    onValueChange?(value: string): void;
    onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;
}

export function InputCheck(props: Props) {
    const { value, state, size, placeholder, type = 'normal', classNameContainer, onChecked, onValueChange, onKeyDown, menu } = props;

    const [inputValue, setInputValue] = useState('');
    const [inputPlaceholder, setInputPlaceholder] = useState('');
    const [inputFocused, setInputFocused] = useState(false);
    const refInput = useRef<HTMLInputElement | null>(null);

    let inputIsEmpty = true;
    let isMenu = !!menu;

    console.log({ isMenu });

    const handleOnChecked = () => {
        onChecked && onChecked(true);
    }

    const handleOnValueChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        onValueChange && onValueChange(e.target.value);
    }

    const icon = () => {
        if (type === 'add') {
            if (!inputFocused && inputIsEmpty)
                return <AiOutlinePlus className={`cursor-text ${size ?? ''}`} onClick={() => refInput?.current?.focus()} />

            if (inputFocused || !inputFocused && !inputIsEmpty)
                return <BsCircle className={`cursor-text ${size ?? ''}`} onClick={() => refInput?.current?.focus()} />
        } else {

            if (!state || state === 'INICIADA' || state === 'PENDENTE' || state === 'PAUSADA')
                return <BsCircle className={`cursor-pointer ${size ?? ''}`} onClick={handleOnChecked} />

            return (
                <div className='bg-white rounded-full'>
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
        <div className={`relative flex items-center gap-2 ${classNameContainer ?? ''}`}>
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
            <Tippy
                content={
                    <div className="bg-black rounded-md py-3 px-4 mb-2 w-56">
                        <h1>Bla bla</h1>
                    </div>
                }
                allowHTML
                interactive
                duration={0}
                animation='perspective'
                trigger='click'
                placement='bottom-end'
            >
                <>{isMenu && (
                    <button type="button">
                        <SlOptionsVertical className='fill-white cursor-pointer' />
                    </button>)
                }</>
            </Tippy>
        </div>
    );
}