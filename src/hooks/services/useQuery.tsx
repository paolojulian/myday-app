import { useState, useEffect } from "react";

export function useQuery<T>(callback: () => Promise<T>) {
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setErrors] = useState<unknown>();

    async function refetch() {
        try {
            setIsLoading(true);
            const result = await callback();
            setData(result);
        } catch (e) {
            setErrors(e);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        refetch()
    }, []);

    return { isLoading, error, data, refetch }
};

export default useQuery;
