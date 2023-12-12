import { FC } from "react";
import s from "./stepper.module.scss";
import SmallCheckImage from "../../../public/Check_small.png";
import cn from "classnames";
interface StepperProps {
  activeStep: number;
  steppers: { label: string | number }[];
}

const Stepper: FC<StepperProps> = ({ activeStep, steppers }) => {
  return (
    <div className={s.stepperWrapper}>
      <div className={s.stepper}>
        {steppers?.map((item, index) => (
          <div
            className={cn(s.step, {
              [s.nonStep]: item.label === steppers.length,
            })}
            key={index}
          >
            <div
              className={cn(s.stepCircle, {
                [s.stepCircleActive]: index + 1 === activeStep,
                [s.stepCircleDisable]: index + 1 > activeStep,
              })}
            >
              {activeStep > index + 1 ? (
                <img src={SmallCheckImage}></img>
              ) : null}
              {activeStep === index + 1 ? (
                <div className={s.dot}>
                  <span></span>
                </div>
              ) : null}
              <div className={s.label}>{item.label}</div>
            </div>

            {index + 1 !== steppers.length ? (
              <div
                className={cn(s.connector, {
                  [s.connectorActive]: index + 1 <= activeStep - 1,
                })}
              ></div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
