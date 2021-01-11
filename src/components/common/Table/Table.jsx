import {useState,useMemo,useRef,useEffect} from 'react';
import Input from "../Input/Input";
import cMoment from './../../../utils/cMoment';
import { sortAsc, sortDesc } from '../../../utils/sort';
import Select from '../Select/Select';
import styles from './Table.module.css';

const ItemTable = ({item,columns,onClick}) => {
    return <tr onClick={e => onClick(e,item)} className={styles.tr}>
        {columns.map(c => {
            let value = item[c.accessor];
            if(c.type === "date") value = cMoment.getMoment(value).format('L');
            return <td className={styles.td} key={value}>{value}</td>;
        })}
    </tr>
}

const Table = ({columns = [],data = [],hasFilter = false,onClickItem,...props}) => {

    const [displayData,setDisplayData] = useState(null);
    const [listFilter,setListFilter] = useState([]);
    const [accessorSort,setAccessorSort] = useState("");
    const [min,setMin] = useState(0);
    const [max,setMax] = useState(1000);
    const minInput = useRef();
    const maxInput = useRef();

    const selectOptions = useMemo(() => [
        {value:"today",text:"Today"},
        {value:"-7",text:"Since week ago"},
        {value:"-365",text:"Since year ago"},
        {value:"more",text:"More than year ago"}
    ], []);

    const onFilter = ({name,value,type}) => {
        const newListFilter = listFilter
                            .filter(lf => lf.libelle !== name).concat(value ? {
                                libelle:name,
                                value,
                                type
                            } : []);
        let filteredData = [...data]
        if(newListFilter.length > 0) {
            newListFilter.map(lf => filteredData = filteredData.filter(d => {
                const valueLibelle = d[lf.libelle];
                if(lf.type === "string") return valueLibelle.toLowerCase().includes(lf.value.toLowerCase());
                if(lf.type === "number") return valueLibelle >= parseInt(lf.value[0]) && valueLibelle <= parseInt(lf.value[1]);
                if(lf.type === "date") {
                    if(lf.value === "today") return cMoment.getMoment().isSame(valueLibelle);
                    else if(lf.value === "more") return cMoment.substractDays(365).isAfter(valueLibelle);
                    else return cMoment.addDays(lf.value).isBefore(valueLibelle);
                }
                return false;
            }));
        }
        else filteredData = data;
        setListFilter([...newListFilter]);
        setDisplayData([...filteredData]);
    }

    const handleClick = (event,accessor) => {
        const isSorted = accessorSort === accessor;
        const sortedData = (displayData || data).sort((a,b) => isSorted ? sortAsc(a,b,accessor) : sortDesc(a,b,accessor));
        setAccessorSort(isSorted ? "" : accessor);
        setDisplayData([...sortedData]);
    }

    const handleString = e => {
        const {name,value} = e.target;
        onFilter({name,value,type:"string"});
    }

    useEffect(() => {
        const interval = setTimeout(() => {
            if(minInput.current) {
                const {dataset} = minInput.current || {};

                onFilter({name:dataset.accessor,value:[min,max],type:"number"});
            }
        },300);
        return () => {
            clearInterval(interval);
        }
    }, [minInput,min]);

    useEffect(() => {
        const interval = setTimeout(() => {
            if(maxInput.current) {
                const {dataset} = maxInput.current || {};

                onFilter({name:dataset.accessor,value:[min,max],type:"number"});
            }

        },300);
        return () => {
            clearInterval(interval);
        }
    }, [maxInput,max]);

    const handleNumber = e => {
        setTimeout(() => {
            const {name,value} = e.target;
            if(value < 0) {
                setMin(min)
                return;
            }

            if(name === "min") {
                if(value > max - 1) e.target.value = min;
                else setMin(value);
            }
            else if(name === "max") {
                if(value < min + 1) e.target.value = max;
                else setMax(value);
            }
        }, 300);
    }

    const handleDate = e => {
        const {value,name} = e.target;

        onFilter({name,value,type:"date"});
    }

    const setFilterInput = ({type,accessor},data,index) => {
        const totalData = data.length;
        if(type === "string") return <Input placeholder="Tape something..." name={accessor} onChange={handleString} key={`f${index}`}/>;
        else if(type === "number") {
            const minNumberAccessor = data[0][accessor];
            const maxNumberAccessor = data[totalData - 1][accessor];
            return <div><Input name="min" type="number" data-accessor={accessor} 
                        onChange={handleNumber} defaultValue={minNumberAccessor} inputRef={minInput}/>
                        <Input name="max" type="number" data-accessor={accessor} 
                        defaultValue={maxNumberAccessor} onChange={handleNumber} inputRef={maxInput}/></div>;
        }
        else if(type === "date") return <Select name={accessor} onChange={handleDate} placeholder="Select date" options={selectOptions} />
    }

    const DisplayBody = useMemo(() => (displayData || data).map((d,index) => <ItemTable item={d} columns={columns} key={`i${index}`} onClick={onClickItem}/>), [displayData]);

    return <table className={styles.table}>
        <thead>
            <tr className={`${styles.tr} ${styles.rowHeader}`}>
                {columns.map((c,index) => <th className={styles.th} onClick={e => handleClick(e,c.accessor)} key={`c${index}`}>{c.title}</th>)}
            </tr>
            <tr className={styles.tr}>
                {hasFilter && columns.map((c,index) => <th className={styles.th} key={`cf${index}`}>{setFilterInput(c,data,index)}</th>)}
            </tr>
        </thead>
        <tbody>
            {DisplayBody}
        </tbody>
    </table>;
}

export default Table;