import  { useState, useEffect } from 'react';

const useFetch = (url) => {

  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setResponse(data);
      } catch (error) {
        console.log("Something went wrong, please try again later");
      }
    }

    fetchData();

  }, [url])

  return response;
};

export default useFetch;
