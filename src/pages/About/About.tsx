import { FC } from "react";
import s from "./about.module.scss";
import { Avatar, Input } from "@nextui-org/react";
import { mock_user } from "../../utils/mocks/user";
import getCapitalLetters from "../../helpers/getCapitalLetters";
import folderImage from "../../../public/Folder.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomButton from "../../components/Button/Button";
import { InputMask } from "@react-input/mask";
import CustomInputMask from "../../components/InputMask/InputMask";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { changeData } from "../../store/about";
const schema = yup.object({
  phone: yup.string().required("Заполните поле phone"),
  email: yup
    .string()
    .email("Неправильный формат . Ожидалось email")
    .required("Заполните поле email"),
});

type FormValues = {
  phone: string;
  email: string;
};

const About: FC = () => {
  const { values: about } = useAppSelector((state) => state.about);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const handleSubmitForm = (values: FormValues) => {
    dispatch(changeData({ values }));
    navigation("/step/1");
  };

  return (
    <div className={s.about}>
      <div className={s.userInfo}>
        <div className={s.item1}>
          <Avatar
            name={getCapitalLetters(`${mock_user.name} ${mock_user.surname} `)}
            className={s.avatar}
          />
        </div>
        <div className={s.item2}>
          <h2 className={s.name}>
            {mock_user?.name} {mock_user.surname}
          </h2>
          <div className={s.medias}>
            {mock_user.social_media?.map((item, index) => (
              <div className={s.socialMedia} key={index}>
                <img src={folderImage} alt="folder" />
                <Link target="_blank" to={item.referance}>
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr />
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={s.inputWrapper}>
          <label htmlFor="phone">Номер телефона</label>
          <InputMask
            component={CustomInputMask}
            variant="faded"
            id="phone"
            placeholder="+7 999 999-99-99"
            radius="sm"
            isInvalid={!!errors?.phone}
            errorMessage={errors?.phone?.message}
            mask="+7 ___ __-__-__"
            replacement="_"
            defaultValue={about.phone}
            {...register("phone")}
          />
        </div>
        <div className={s.inputWrapper}>
          <label htmlFor="email">Email</label>
          <Input
            variant="faded"
            id="email"
            placeholder="webstudio.fractal@example.com"
            radius="sm"
            isInvalid={!!errors?.email}
            errorMessage={errors?.email?.message}
            defaultValue={about.email}
            {...register("email")}
          />
        </div>
        <div className={s.button}>
          <CustomButton type="submit">Начать</CustomButton>
        </div>
      </form>
    </div>
  );
};

export default About;
