import { FC } from "react";
import s from "./step.module.scss";
import { useParams } from "react-router-dom";
import FirstStep from "./FirstStep/FirstStep";

const Step: FC = () => {
  const { step } = useParams();
  const steps = [<FirstStep />];
  if (!step || Number(step) > steps.length) {
    return <div></div>;
  }
  return <div className={s.step}>{steps[Number(step) - 1]}</div>;
};

export default Step;
