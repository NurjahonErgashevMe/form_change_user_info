import { Button, ButtonProps, cn } from "@nextui-org/react";
import { FC } from "react";
import s from "./button.module.scss";

const CustomButton: FC<
  ButtonProps & { bg?: string; textColor?: string; borderColor?: string }
> = ({
  className,
  style,
  bg = "#5558fa",
  textColor = "#5558fa",
  borderColor = "#5558fa",
  ...props
}) => {
  return (
    <Button
      className={cn(s.button, className)}
      style={{
        borderRadius: 4,
        padding: "12px 16px",
        fontWeight: 500,
        color: textColor,
        backgroundColor: bg,
        borderColor,
        ...style,
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
};

export default CustomButton;
