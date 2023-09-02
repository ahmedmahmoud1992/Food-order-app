import { useCallback, useState } from "react";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const httpRequestHandler = useCallback(async (requestConfig, applyData) => {
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