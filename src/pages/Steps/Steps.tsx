import { FC } from "react";
import s from "./steps.module.scss";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Stepper from "../../components/Stepper/Stepper";
import CustomButton from "../../components/Button/Button";
const Steps: FC = () => {
  const { step } = useParams();
  const navigation = useNavigate();
  const prev = () => {
    console.log(prev);
    if (Number(step) === 1) {
      return navigation("/about");
    }
    return navigation(`/step/${Number(step) - 1}`);
  };

  return (
    <div className={s.steps}>
      <Stepper
        activeStep={Number(step)}
        steppers={[{ label: 1 }, { label: 2 }, { label: 3 }]}
      />
      <Outlet />
      <div className={s.buttons}>
        <CustomButton
          bg="transparent"
          textColor="#5558fa"
          style={{ borderColor: "#5558fa" }}
          variant="bordered"
          color="default"
          onClick={prev}
        >
          Назад
        </CustomButton>
        <CustomButton>Далее</CustomButton>
      </div>
    </div>
  );
};

export default Steps;
