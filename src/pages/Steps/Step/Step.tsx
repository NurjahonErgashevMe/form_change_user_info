import { FC } from "react";
import s from "./step.module.scss";
import { useParams } from "react-router-dom";
import FirstStep from "./FirstStep/FirstStep";
import SecondStep from "./SecondStep/SecondStep";
import ThirdStep from "./ThirdStep/ThirdStep";
const Step: FC = () => {
  const { step } = useParams();

  const stepsLength = 3;

  if (!step || Number(step) > stepsLength) {
    return <div></div>;
  }
  const ActiveStep = <T extends object>(props: T): React.ReactNode => {
    if (step == "1") {
      return <FirstStep step={step} {...props} />;
    } else if (step == "2") return <SecondStep step={step} {...props} />;
    return <ThirdStep step={step} {...props} />;
  };

  return (
    <div className={s.step}>
      <ActiveStep />
    </div>
  );
};

export default Step;
