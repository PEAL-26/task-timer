import { TiThMenu } from "react-icons/ti";

interface Props {
  title?: string;
  setShowMenu(visible: boolean): void;
}

export function TitleBar({ title, setShowMenu }: Props) {
  return (
    <div className="flex items-center bg-black-light rounded-md py-3 px-4 mb-20 text-white">
      <button
        className="mr-3 cursor-pointer lg:hidden visible"
        onClick={() => setShowMenu(true)}
      >
        <TiThMenu size={20} />
      </button>
      <h2 className="font-bold text-xl">{title}</h2>
    </div>
  );
}
