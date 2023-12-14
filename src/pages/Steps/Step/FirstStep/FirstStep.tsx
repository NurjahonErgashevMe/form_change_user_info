import { FC } from "react";
import s from "./firstStep.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Select, SelectItem } from "@nextui-org/react";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { changeData } from "../../../../store/user";
import { useNavigate } from "react-router-dom";
import ErrorText from "../../../../components/ErrorText/ErrorText";
import CustomButton from "../../../../components/Button/Button";

const schema = yup.object({
  nickname: yup.string().required("Заполните поле 'Никнейм'"),
  name: yup.string().required("Заполните поле 'Имя'"),
  surname: yup.string().required("Заполните поле 'Фамиля'"),
  sex: yup.string().required("Выберите пол").oneOf(["man", "woman"]).label(""),
});

interface FormValues {
  nickname: string;
  name: string;
  surname: string;
  sex: "man" | "woman";
}

interface StepProps {
  step: string;
}

const FirstStep: FC<StepProps> = () => {
  const { values: defaultUserDatas } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    formState: { errors },
    register,
    getValues,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const navigation = useNavigate();

  const sex: {
    label: "Мужской" | "Женский";
    value: "man" | "woman";
    description?: string;
  }[] = [
    { label: "Мужской", value: "man" },
    { label: "Женский", value: "woman" },
  ];

  const handleSubmitForm = (values: FormValues) => {
    dispatch(changeData({ values }));
    return navigation(`/step/2`);
  };

  return (
    <div className={s.firstStep}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        onError={(e) => console.log(e, "error")}
      >
        <div className={s.inputWrapper}>
          <label htmlFor="nickname">Никнейм</label>
          <Input
            variant="faded"
            id="nickname"
            placeholder="Placeholder"
            radius="sm"
            isInvalid={!!errors?.nickname}
            errorMessage={errors?.nickname?.message}
            defaultValue={defaultUserDatas.nickname}
            {...register("nickname")}
          />
        </div>
        <div className={s.inputWrapper}>
          <label htmlFor="name">Имя</label>
          <Input
            variant="faded"
            id="name"
            placeholder="Placeholder"
            radius="sm"
            isInvalid={!!errors?.name}
            errorMessage={errors?.name?.message}
            defaultValue={defaultUserDatas.name}
            {...register("name")}
          />
        </div>
        <div className={s.inputWrapper}>
          <label htmlFor="surname">Фамилия</label>
          <Input
            id="surname"
            variant="faded"
            placeholder="Placeholder"
            radius="sm"
            isInvalid={!!errors?.surname}
            errorMessage={errors?.surname?.message}
            defaultValue={defaultUserDatas.surname}
            {...register("surname")}
          />
        </div>
        <div className={cn(s.inputWrapper, s.lastInputWrapper)}>
          <label htmlFor="sex">Пол</label>
          <Select
            variant="faded"
            radius="sm"
            placeholder="Не выбран"
            classNames={{
              popoverContent: s.selectPopoverContent,
            }}
            className={s.select}
            defaultSelectedKeys={[defaultUserDatas.sex]}
            {...register("sex")}
          >
            {sex.map((item) => (
              <SelectItem
                className={s.selectPopoverItem}
                key={item.value}
                classNames={{ shortcut: s.test }}
                value={item.value}
              >
                {item.label}
              </SelectItem>
            ))}
          </Select>
          <ErrorText>{errors?.sex ? "Выберите пол" : null}</ErrorText>
        </div>
        <div className={s.buttons}>
          <CustomButton
            variant="faded"
            bg="transparent"
            onClick={() => {
              dispatch(
                changeData({
                  values: {
                    nickname: getValues("nickname"),
                    name: getValues("name"),
                    sex: getValues("sex"),
                    surname: getValues("surname"),
                  },
                })
              );
              return navigation(`/`);
            }}
          >
            Назад
          </CustomButton>
          <CustomButton textColor="#fff" type="submit">
            Далее
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default FirstStep;
