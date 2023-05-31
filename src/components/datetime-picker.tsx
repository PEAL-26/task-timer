import { useState } from "react";
import Tippy from "@tippyjs/react";
import Calendar from "react-calendar";
import { AiOutlineCalendar } from "react-icons/ai";
import NumeroRelogio from "./numero-relogio";
import Relogio from "./relogio";

export function DateTimePicker() {
  const [value, setValue] = useState("");

  const onChange = () => {};

  return (
    <span className="inline-flex items-center justify-between text-sm text-white w-full">
      {value}
      <Tippy
        content={
          <div className="bg-black-light rounded-md py-3 px-4 mb-2 border  ">
            {/* Calendar */}
            <div
            // className="flex flex-row gap-4"
            >
              <div>{/* <Calendar onChange={onChange} value={value} /> */}</div>

              {/* Timer */}
              <Relogio />
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
        animation="perspective"
        trigger="click"
        placement="left"
      >
        <button type="button">
          <AiOutlineCalendar size={16} className="cursor-pointer" />
        </button>
      </Tippy>
    </span>
  );
}
