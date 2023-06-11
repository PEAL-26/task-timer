import { ChangeEvent, FocusEvent, MouseEvent, MouseEventHandler, useEffect, useRef, useState } from "react";
import Tippy, { TippyProps } from '@tippyjs/react';

interface Props {
    value?: string;
    placeholder?: string;
    items?: string[];

    onChangeValue?(value: string): void;
}

export function InputAutoComplete(props: Props) {
    const {
        value,
        items,
        placeholder = 'Nenhum',

        onChangeValue
    } = props;

    const ref = useRef<HTMLInputElement>(null);
    const refTippy = useRef<HTMLElement>(null);

    const [visible, setVisible] = useState(false);
    const show = () => setVisible(true);
    const hide = () => setVisible(false);


    const itemsFiltered = items?.filter(item => {
        // const regex = new RegExp(value ?? '', 'i');

        return item.toLowerCase().includes(value?.toLowerCase() ?? '');
    })

    const handleOnChangeValue = ({ target }: ChangeEvent<HTMLInputElement>) => {
        onChangeValue && onChangeValue(target.value);
    }

    const handleChooseItem = (item: string) => {
        onChangeValue && onChangeValue(item);
        hide();
    }

    const handleOnFocus = ({ target }: FocusEvent<HTMLInputElement>) => {
        show();
    }

    // const handleOnBlur = ({ target }: FocusEvent<HTMLInputElement>) => {
    //     hide();
    // }

    const handleOnClickBackdrop = ({ target }: MouseEvent<HTMLInputElement>) => {

    }

    return (
        <div className="" onClick={handleOnClickBackdrop}>
            <input
                type="text"
                ref={ref}
                value={value}
                placeholder={placeholder}
                className="w-full bg-black-light placeholder-gray text-white border-none outline-none"

                onChange={handleOnChangeValue}
                onFocus={handleOnFocus}
            // onBlur={handleOnBlur}
            />

            <Tippy visible={visible} reference={ref} 
                content={
                    <div className="bg-black rounded-sm" >
                        <ul>
                            {itemsFiltered?.map((item, index) => (
                                <li
                                    key={index}
                                    className="w-full p-2 hover:bg-gray/20 cursor-pointer"
                                    onClick={() => handleChooseItem(item)}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                }
                allowHTML
                interactive
                duration={0}
                animation='perspective'
                trigger='click'
                placement='bottom-start'
            />
        </div>
    );
}
