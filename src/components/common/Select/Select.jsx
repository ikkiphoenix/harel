import styles from './Select.module.css';

const Select = ({options,placeholder,...props}) => {
    return <div className={styles.container}>
        <select {...props} className={styles.container__select} defaultValue=''>
        <option value='' disabled>{placeholder}</option>
        {options.map(o => <option value={o.value} key={o.value}>{o.text}</option>)}
        </select>
    </div>;
}

export default Select;