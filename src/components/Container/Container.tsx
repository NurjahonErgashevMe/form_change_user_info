import { FC, HTMLProps } from "react";
import s from "./container.module.scss";
import cn from "classnames";
interface ContainerProps extends HTMLProps<HTMLDivElement> {
  classNames: string;
  width: string | number;
  maxWidth: string;
  maxHeight: string;
}

const Container: FC<Partial<ContainerProps>> = ({
  classNames,
  maxHeight,
  maxWidth,
  width,
  style,
  ...otherDivProps
}) => {
  return (
    <div
      className={cn(s.container, classNames)}
      style={{ width, maxWidth, maxHeight, ...style }}
    >
      {otherDivProps.children}
    </div>
  );
};

export default Container;
