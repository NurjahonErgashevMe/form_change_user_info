import { Input, InputProps } from "@nextui-org/react";
import { FC } from "react";
import s from "./Input.module.scss";
import cn from "classnames";

const CustomInput: FC<InputProps> = ({ className, ...props }) => {
  return (
    <Input className={cn(s.input, className)} {...props}>
      {props.children}
    </Input>
  );
};

export default CustomInput;
