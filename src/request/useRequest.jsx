import {useState,useEffect} from 'react';
import instance from './instance';

const useRequest = ({method = 'get',url,config}) => {

    const [response,setResponse] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        setRequest();
    }, [])

    const setRequest = async() => {
        const res = await instance[method](url,config);
        setResponse(res.data);
        setLoading(false);
    };

    return [response,loading];
}

export default useRequest;
