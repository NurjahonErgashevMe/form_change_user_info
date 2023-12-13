import { FC } from "react";
import s from "./thirdStep.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Textarea } from "@nextui-org/react";
import ButtonGroup from "../../components/ButtonGroup/ButtonGroup";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { changeData } from "../../../../store/user";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  about: yup.string().required("Заполните поле"),
});

interface FormValues {
  about: string;
}

interface StepProps {
  step: string;
}

const ThirdStep: FC<StepProps> = ({ step }) => {
  const { values: defaultUserDatas } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigate();

  const handleSubmitForm = (values: FormValues) => {
    dispatch(changeData({ values }));
    // return navigation(`/step/2`);
  };

  return (
    <div className={s.firstStep}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        onError={(e) => console.log(e, "error")}
      >
        <div className={s.inputWrapper}>
          <label htmlFor="nickname">О себе</label>
          <Textarea
            variant="bordered"
            disableAnimation
            disableAutosize
            id="nickname"
            placeholder="Placeholder"
            radius="sm"
            isInvalid={!!errors?.about}
            errorMessage={errors?.about?.message}
            defaultValue={defaultUserDatas.about}
            classNames={{
              input: "resize-y ",
            }}
            {...register("about")}
          />
        </div>

        <ButtonGroup step={step} className={s.buttons} type="submit" />
      </form>
    </div>
  );
};

export default ThirdStep;
