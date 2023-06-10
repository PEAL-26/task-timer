import { useState, forwardRef } from "react";

interface Props {
  tempo: number[];
  onChange?(valor: number): void;
  onFocus?(state: boolean): void;
}

const NumeroRelogio = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  const { tempo, onChange, onFocus } = props;
  const [tempoActual, setTempoActual] = useState(3);
  const [tempoSelecionado, setTempoSelecionado] = useState(3);
  const [temposNovos, setTemposNovos] = useState<number[]>([]);

  const onChangeHandle = () => {};

  const handleMouseEnter = () => {
    onFocus && onFocus(true);
  };

  const handleMouseLeave = () => {
    onFocus && onFocus(false);
  };

  return (
    <div
      ref={ref}
      className="relative flex flex-col h-[252px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {tempo.map((valor) => (
        <span
          key={valor}
          className="w-24 py-2 text-center hover:bg-black hover:rounded-md cursor-pointer"
          onClick={() => setTempoSelecionado(valor)}
        >
          {valor}
        </span>
      ))}
    </div>
  );
});

NumeroRelogio.displayName = "NumeroRelogio";
export default NumeroRelogio;
