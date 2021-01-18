import styles from "./CenterItems.module.css";

const CenterItems = ({ children, ...props }) => {
  return <div className={styles.centerItems}>{children}</div>;
};

export default CenterItems;
