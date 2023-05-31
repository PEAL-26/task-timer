"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useMediaQuery } from "react-responsive";

import { BiCog } from "react-icons/bi";
import { BsListCheck } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  setShowMenu(visible: boolean): void;
  showMenu: boolean;
}

export function SideBar({ showMenu, setShowMenu }: Props) {
  const router = useRouter();
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const backdropClassNames = isDesktop
    ? "flex"
    : showMenu
    ? "flex bg-gray/20 w-full h-full absolute top-0 left-0 z-50"
    : "hidden";

  const asideClassNames = isDesktop ? "" : "relative shadow-md shadow-gray/30";

  const isActiveLink = (href: string) => {
    return router.pathname === href
      ? "bg-blue/10 text-blue"
      : "hover:bg-black/10";
  };

  const handleLinkClick = (href: string) => {
    router.push(href);
  };

  const barActive = (
    <div className="absolute bg-blue w-2 h-full right-0 top-0"></div>
  );

  return (
    <div className={`${backdropClassNames}`} onClick={() => setShowMenu(false)}>
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`${asideClassNames} relative flex flex-col items-center w-[310px] lg:rounded-md bg-black-light`}
      >
        {!isDesktop && (
          <span
            className="absolute top-0 right-0 mr-5 mt-3 cursor-pointer"
            onClick={() => setShowMenu(false)}
          >
            <AiOutlineClose size={24} />
          </span>
        )}

        <Image
          className="mt-10 mb-8"
          alt="logo"
          src={"/assets/images/logo-69w.png"}
          width={69.93}
          height={52}
          unoptimized
        />

        <ul className="w-full ">
          <li
            className={`py-4 pl-5 hover:cursor-pointer relative ${isActiveLink(
              "/minhas-tarefas"
            )}`}
            onClick={() => handleLinkClick("/minhas-tarefas")}
          >
            <Link
              className="font-bold text-xl flex items-center uppercase"
              href="/minhas-tarefas"
            >
              <BsListCheck className="mr-2" size={28} />
              Minhas Tarefas
            </Link>
            {router.pathname === "/minhas-tarefas" ? barActive : null}
          </li>
          <li
            className={`py-4 pl-5 hover:cursor-pointer relative ${isActiveLink(
              "/configuracoes"
            )}`}
            onClick={() => handleLinkClick("/configuracoes")}
          >
            <Link
              className="font-bold text-xl flex items-center uppercase"
              href="/configuracoes"
            >
              <BiCog className="mr-2" size={28} />
              Configurações
            </Link>
            {router.pathname === "/configuracoes" ? barActive : null}
          </li>
        </ul>
      </aside>
    </div>
  );
}
