import { useRef, useState } from "react";

import NumeroRelogio from "./numero-relogio";
import { incrementNumberArray } from "../../helpers/number-helper";
import SetasRelogio from "./setas-relogio";

export default function Relogio() {
  const HORAS = incrementNumberArray(23);
  const MINUTOS = incrementNumberArray(60);

  const horasRef = useRef(null);
  const minutosRef = useRef(null);
  const [horasFocus, setHorasFocus] = useState(false);
  const [minutosFocus, setMinutosFocus] = useState(false);
  const [horasSetaFocus, setHorasSetaFocus] = useState(false);
  const [minutosSetaFocus, setMinutosSetaFocus] = useState(false);

  return (
    <div className="relative flex flex-row justify-center h-[252px] w-[192px] group">
      <div className="absolute bg-black/70 w-full h-[36px] rounded-md top-[108px] z-1" />
      {(horasFocus || horasSetaFocus) && <SetasRelogio onFocus={setHorasSetaFocus} align="left" elementRef={horasRef.current} />}
      <NumeroRelogio tempo={HORAS} onFocus={setHorasFocus} ref={horasRef} />

      {(minutosFocus || minutosSetaFocus) && <SetasRelogio onFocus={setMinutosSetaFocus} align="right" elementRef={minutosRef.current} />}
      <NumeroRelogio tempo={MINUTOS} onFocus={setMinutosFocus} ref={minutosRef} />
    </div>
  );
}
