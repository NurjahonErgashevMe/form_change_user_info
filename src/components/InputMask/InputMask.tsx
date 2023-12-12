import { Input, InputProps } from "@nextui-org/react";
import { forwardRef } from "react";

const CustomInputMask = forwardRef<HTMLInputElement, InputProps>(
  (props, forwardedRef) => {
    return (
      <>
        <Input {...props} ref={forwardedRef} />
      </>
    );
  }
);

export default CustomInputMask;
