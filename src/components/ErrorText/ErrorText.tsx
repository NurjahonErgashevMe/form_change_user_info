import { FC, HTMLProps } from "react";

const ErrorText: FC<Partial<HTMLProps<HTMLParagraphElement>>> = ({
  children,
  ...props
}) => (
  <p style={{ fontSize: 12, color: "red" }} {...props}>
    {children}
  </p>
);

export default ErrorText;
