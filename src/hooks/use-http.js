import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
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
            if(applyData){
                applyData(data);
            }
        } catch (error) {
            setIsError(true);
        }
    }, []);

    return {
        isLoading,
        isError,
        httpRequestHandler
    };
}
export default useHttp;