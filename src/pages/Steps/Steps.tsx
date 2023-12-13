import { FC } from "react";
import s from "./steps.module.scss";
import { Outlet, useParams } from "react-router-dom";
import Stepper from "../../components/Stepper/Stepper";
const Steps: FC = () => {
  const { step } = useParams();

  return (
    <div className={s.steps}>
      <Stepper
        activeStep={Number(step)}
        steppers={[{ label: 1 }, { label: 2 }, { label: 3 }]}
      />
      <Outlet />
    </div>
  );
};

export default Steps;
