import { ReactNode } from "react";
import { TitleBar } from './title-bar';
import { SideBar } from './side-bar';

interface Props {
    title?: string;
    children: ReactNode;
}

export default function Layout({ children, title }: Props) {
    return (
        <div className="flex min-h-screen gap-8 p-10">
            <SideBar />
            <main className="flex flex-col flex-1">
                {title && <TitleBar title={title} />}
                {children}
            </main>
        </div>
    );
}