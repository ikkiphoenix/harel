import styles from "./Select.module.css";

const Select = ({ options, placeholder, defaultValue = "", ...props }) => {
  return (
    <div className={styles.container}>
      <select
        {...props}
        className={styles.container__select}
        defaultValue={defaultValue}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option value={o.value} key={o.value}>
            {o.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
