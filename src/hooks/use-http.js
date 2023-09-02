import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    console.log(isError);
    const httpRequestHandler = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true);
        try {
            const request = await fetch(
                requestConfig.url,
                {
                    method: requestConfig.method ?? 'GET',
                    headers: requestConfig.headers ?? {},
                    body: JSON.stringify(requestConfig.body) ?? null,
                }
            );
            const data = await request.json();
    
            setIsLoading(false);
            applyData(data);
            // console.log('##########################');
        } catch (error) {
            // console.log(isError);
            setIsError(true);
            // console.log(isError);
        }
    }, []);

    return {
        isLoading,
        isError,
        httpRequestHandler
    };
}
export default useHttp;