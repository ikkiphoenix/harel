import styles from "./Container.module.css";

const Container = ({ children, className, ...props }) => {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
};

export default Container;
