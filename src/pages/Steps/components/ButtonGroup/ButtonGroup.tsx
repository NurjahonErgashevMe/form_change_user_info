import { ButtonProps } from "@nextui-org/react";
import CustomButton from "../../../../components/Button/Button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface ButtonGroupProps extends ButtonProps {
  step: string;
}

const ButtonGroup: FC<ButtonGroupProps> = ({
  step,
  className,
  type = "button",
  ...buttonProps
}) => {
  const navigation = useNavigate();
  const prev = () => {
    if (Number(step) === 1) {
      return navigation("/");
    }
    return navigation(`/step/${Number(step) - 1}`);
  };
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
      className={className}
    >
      <CustomButton
        bg="transparent"
        textColor="#5558fa"
        style={{ borderColor: "#5558fa" }}
        variant="bordered"
        color="default"
        onClick={prev}
        {...buttonProps}
      >
        Назад
      </CustomButton>
      <CustomButton textColor="white" type={type}>
        Далее
      </CustomButton>
    </div>
  );
};

export default ButtonGroup;
