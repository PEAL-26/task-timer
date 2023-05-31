import { WheelEvent, useEffect } from "react";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

interface Props {
  align: "left" | "right";
  elementRef?: HTMLDivElement | null;
  onFocus?(state: boolean): void;
}

export default function SetasRelogio({ align, elementRef, onFocus }: Props) {
  const handleScroll = (deltaY: number) => {
    if (!elementRef) return;

    elementRef?.scrollBy({
      top: deltaY,
      behavior: "smooth",
    });
  };

  const handleMouseWheel = (event: WheelEvent<HTMLDivElement>) => {
    handleScroll(event.deltaY + 36);
  };

  const onClickUpHandle = () => {
    handleScroll(-36);
  };

  const onClickDownHandle = () => {
    handleScroll(36);
  };

  const handleMouseEnter = () => {
    onFocus && onFocus(true);
  };

  const handleMouseLeave = () => {
    onFocus && onFocus(false);
  };


  // useEffect(() => {
  //   if (!elementRef) return;

  //   elementRef.addEventListener("wheel", handleMouseWheel);

  //   return () => {
  //     elementRef.removeEventListener("wheel", handleMouseWheel);
  //   };
  // }, [elementRef, handleMouseWheel]);

  return (
    <div>
      <span
        onClick={onClickUpHandle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`w-24 flex absolute z-10 top-0 ${align}-0 justify-center items-center h-[24px] cursor-pointer text-white bg-black `}
      >
        <MdArrowDropUp size={24} />
      </span>
      <span
        onClick={onClickDownHandle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`w-24 flex absolute z-10 top-[232px] ${align}-0 justify-center items-center h-[24px] cursor-pointer text-white bg-black `}
      >
        <MdArrowDropDown size={24} />
      </span>
    </div>
  );
}
