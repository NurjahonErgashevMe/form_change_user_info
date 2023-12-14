import { motion } from "framer-motion";
import { FC, HTMLProps } from "react";
import s from "./backdrop.module.scss";
const Backdrop: FC<HTMLProps<HTMLElement>> = ({ children, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className={s.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
