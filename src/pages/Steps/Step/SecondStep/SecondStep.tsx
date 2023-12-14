/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import s from "./secondStep.module.scss";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { changeData } from "../../../../store/user";
import DeleteIcon from "../../../../../public/Delete.jpg";
import { useNavigate } from "react-router-dom";
import ErrorText from "../../../../components/ErrorText/ErrorText";
import { IUser } from "../../../../types/user";
import CustomButton from "../../../../components/Button/Button";

interface FormValues {
  advantages?: { advantage: string }[];
  radio: string;
  checkbox: string[];
}

interface StepProps {
  step: string;
}

const SecondStep: FC<StepProps> = () => {
  const { values: defaultUserDatas } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const navigation = useNavigate();

  const schema = yup.object({
    advantages: yup.array().of(
      yup.object().shape({
        advantage: yup.string().required("Заполните поле"),
      })
    ),
    checkbox: yup
      .array()
      .min(1, "Выберите хотя бы один чекбокс")
      .default(
        Object.entries(defaultUserDatas.checkbox)
          .filter(([_, value]) => value)
          .map(([key]) => key)
      ),
    radio: yup
      .string()
      .required("Выберите одну из вариантов")
      .default(defaultUserDatas.radio),
  });

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
    getValues,
  } = useForm<FormValues>({
    resolver: yupResolver(schema as any),
  });

  const { fields, prepend, remove, replace } = useFieldArray({
    control,
    name: "advantages",
  });

  const checkboxes: { value: string | number; name: string }[] = [
    { value: "1", name: "first" },
    { value: "2", name: "second" },
    { value: "3", name: "third" },
  ];

  const checkboxesIncludes = (checkbox: string[]): IUser["checkbox"] => {
    return {
      first: checkbox?.includes("first"),
      second: checkbox?.includes("second"),
      third: checkbox?.includes("third"),
    };
  };
  const handleSubmitForm = ({ advantages, radio, checkbox }: FormValues) => {
    dispatch(
      changeData({
        values: {
          advantages: advantages?.map((i) => i.advantage),
          radio,
          checkbox: checkboxesIncludes(checkbox),
        },
      })
    );
    return navigation(`/step/3`);
  };

  useEffect(() => {
    if (!fields.length) {
      replace(
        defaultUserDatas?.advantages
          ? defaultUserDatas.advantages?.map((item) => ({ advantage: item }))
          : { advantage: "" }
      );
    }
  }, [fields, prepend]);
  return (
    <div className={s.secondStep}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        onError={(e) => console.log(e, "error")}
      >
        <div className={s.advantages}>
          <label htmlFor="nickname">Примущества</label>
          {fields?.map((item, index) => (
            <div className={s.field} key={index}>
              <div className={s.inputWrapper} key={item.id}>
                <Input
                  variant="faded"
                  id="nickname"
                  placeholder="Placeholder"
                  radius="sm"
                  {...register(`advantages[${index}].advantage` as any)}
                  defaultValue={item.advantage}
                  isInvalid={!!errors?.advantages?.[index]}
                />
                <ErrorText>
                  {errors?.advantages?.[index] ? "Заполните поле" : null}
                </ErrorText>
              </div>
              <Button
                isIconOnly
                className={s.delete}
                disabled={fields.length === 1}
                onClick={() => remove(index)}
              >
                <img src={DeleteIcon} loading="lazy" />
              </Button>
            </div>
          ))}
          <div className={s.addButtonWrapper}>
            <Button
              variant="faded"
              className={s.addButton}
              onClick={() => prepend({ advantage: "" })}
            >
              +
            </Button>
          </div>
        </div>
        <div className={s.checkboxes}>
          <label>Checkbox группа</label>

          <Controller
            name="checkbox"
            control={control}
            render={({ field }) => (
              <CheckboxGroup
                defaultValue={Object.entries(defaultUserDatas.checkbox)
                  .filter(([_, value]) => value)
                  .map(([key]) => key)}
                isInvalid={!!errors?.checkbox}
                {...field}
              >
                {checkboxes?.map((item, index) => (
                  <Checkbox
                    color="primary"
                    value={item.name}
                    classNames={{
                      icon: s.checkBoxIcon,
                      wrapper: s.checkboxItem,
                    }}
                    key={index}
                  >
                    {item.name}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            )}
          />
          <ErrorText>{errors.checkbox && errors.checkbox.message}</ErrorText>
        </div>
        <div className={s.options}>
          <RadioGroup
            label="Radio группа"
            isInvalid={!!errors?.radio}
            errorMessage={errors?.radio?.message}
            defaultValue={defaultUserDatas.radio}
          >
            <Radio
              value="1"
              onChange={(e) => setValue("radio", e.target.value)}
            >
              1
            </Radio>
            <Radio
              value="2"
              onChange={(e) => setValue("radio", e.target.value)}
            >
              2
            </Radio>
            <Radio
              value="3"
              onChange={(e) => setValue("radio", e.target.value)}
            >
              3
            </Radio>
          </RadioGroup>
        </div>
        <div className={s.buttons}>
          <CustomButton
            variant="faded"
            bg="transparent"
            onClick={() => {
              dispatch(
                changeData({
                  values: {
                    advantages: getValues("advantages")?.map(
                      (i) => i.advantage
                    ),
                    checkbox: checkboxesIncludes(getValues("checkbox")),
                    radio: getValues("radio"),
                  },
                })
              );
              return navigation(`/step/1`);
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

export default SecondStep;
