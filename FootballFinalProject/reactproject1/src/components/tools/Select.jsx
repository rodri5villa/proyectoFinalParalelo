import { useEffect } from 'react';
import useFetch from './useFetch';
import './Select.css';

function Select({ api, setId }) {
    const { data, fetchData } = useFetch();

    useEffect(() => {
        fetchData(api);
    }, []);

    useEffect(() => {
        if (data.length>0) {
            setId(data[0].id);
        }
    }, [data]);

    const handleSelect = (e) => {
        const selectedId = e.target.value;
        setId(selectedId);
    }

    return (
        <select className="select" onChange={handleSelect}>
            {data && data.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
            ))}
        </select>
  );
}

export default Select;