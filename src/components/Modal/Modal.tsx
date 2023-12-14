import { Dispatch, FC, SetStateAction } from "react";
import s from "./modal.module.scss";

import { motion, Variants } from "framer-motion";

import Backdrop from "../Backdrop/Backdrop";
import CustomButton from "../Button/Button";

import SuccesImage from "../../../public/succes.jpg";
import FailedImage from "../../../public/failed.jpg";
import CloseImage from "../../../public/close.jpg";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  variant: "success" | "error";
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const animationVariant: Variants = {
  hidden: {
    transform: "scale(0) rotateX(-360deg)",
    opacity: 0,
    transition: {
      delay: 0.3,
    },
  },
  visible: {
    transform: " scale(1) rotateX(0deg)",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    transform: "scale(0) rotateX(360deg)",
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const CustomModal: FC<ModalProps> = ({ variant, setIsOpen }) => {
  const navigation = useNavigate();
  return (
    <Backdrop>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={s.modal}
        variants={animationVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {variant === "error" ? (
          <Button
            radius="full"
            onClick={() => setIsOpen(() => false)}
            className={s.close}
            isIconOnly
          >
            <img src={CloseImage} alt="close" loading="lazy" />
          </Button>
        ) : null}
        {variant === "success" ? (
          <div className={s.content}>
            <h2 className={s.text}>Форма успешно отправлена</h2>
            <img src={SuccesImage} alt="succes" loading="lazy" />
          </div>
        ) : (
          <div className={s.content}>
            <h2 className={s.text}>Ошибка</h2>
            <img src={FailedImage} alt="failed" loading="lazy" />
          </div>
        )}
        <CustomButton onClick={() => navigation("/")} textColor="#fff">
          На главную
        </CustomButton>
      </motion.div>
    </Backdrop>
  );
};

export default CustomModal;
