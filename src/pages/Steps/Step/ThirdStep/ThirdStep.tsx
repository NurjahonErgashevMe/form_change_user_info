import { FC, useState } from "react";
import s from "./thirdStep.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { changeData } from "../../../../store/user";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../../../components/Button/Button";
import { AnimatePresence } from "framer-motion";
import CustomModal from "../../../../components/Modal/Modal";
import { Textarea } from "@nextui-org/react";

interface FormValues {
  about: string;
}

interface StepProps {
  step: string;
}

const ThirdStep: FC<StepProps> = () => {
  const { values: defaultUserDatas } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [modalIsOpen, setIsModalOpen] = useState(false);
  const schema = yup.object({
    about: yup
      .string()
      .required("Заполните поле")
      .default(defaultUserDatas.about),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigate();

  const handleSubmitForm = (values: FormValues) => {
    dispatch(changeData({ values }));
    return setIsModalOpen(() => true);
  };

  const modalStatuses: ["success", "error"] = ["success", "error"];

  return (
    <div className={s.thirdStep}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        onError={(e) => console.log(e, "error")}
      >
        <AnimatePresence initial={false} onExitComplete={() => null}>
          {modalIsOpen ? (
            <CustomModal
              variant={
                modalStatuses[Math.floor(Math.random() * modalStatuses.length)]
              }
              setIsOpen={setIsModalOpen}
            />
          ) : null}
        </AnimatePresence>
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
              input: "resize-y",
            }}
            {...register("about")}
          />
        </div>

        <div className={s.buttons}>
          <CustomButton
            variant="faded"
            bg="transparent"
            onClick={() => {
              dispatch(changeData({ values: { about: getValues("about") } }));
              navigation(`/step/2`);
              return;
            }}
          >
            Назад
          </CustomButton>
          <CustomButton textColor="#fff" type="submit">
            Отправить
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default ThirdStep;
