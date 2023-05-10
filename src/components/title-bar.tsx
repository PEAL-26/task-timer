interface Props {
    title?: string;
}

export function TitleBar({ title }: Props) {
    return (
        <div className="flex bg-black-light rounded-md py-3 px-4 mb-20 ">
            <h2 className="font-bold text-xl text-white">{title}</h2>
        </div>
    );
}