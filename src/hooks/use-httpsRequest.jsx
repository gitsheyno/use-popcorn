import { useState } from "react";
const useHttpRequest = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const httpReq = async (config, query) => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(config.url, {
        method: config.method ? config.method : "GET",
        body: config.body ? config.body : null,
        headers: config.headers ? config.headers : {},
      });

      if (!res.ok) {
        throw new Error("something went wrong");
      }
      const dataRes = await res.json();

      console.log(dataRes);
      if (dataRes.Response === "False") {
        throw new Error("Movie not found");
      }

      setData(dataRes.Search);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
    if (!query.length) {
      setData([]);
      setError(null);
      //   setSelectedID("");

      return;
    }
  };

  return { data, setData, setError, isLoading, error, httpReq };
};

export default useHttpRequest;
