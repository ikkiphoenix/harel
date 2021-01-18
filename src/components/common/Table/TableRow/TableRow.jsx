import styles from "./../Table.module.css";

const TableRow = ({ className, children, ...props }) => {
  return (
    <tr className={`${styles.tr} ${className}`} {...props}>
      {children}
    </tr>
  );
};

export default TableRow;
