import  { useEffect, useState } from 'react'

const BASE_URL = `https://api.github.com/users`;
export const useGithubInfo = (username:string | undefined) => {
    const [data,setData] = useState([]);

    const fetchData = async ()=>{
        try {
            const res = await fetch(`${BASE_URL}/${username}`);
            const userData = await res.json();
            setData(userData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(()=>{
        fetchData();
        return ()=>{
            setData([]);
        }
    },[username]);
    return data;
}
