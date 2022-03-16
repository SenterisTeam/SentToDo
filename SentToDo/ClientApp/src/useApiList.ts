import {useCallback, useEffect, useState} from "react";
import {ApiError, CancelablePromise, ToDoTask} from "./api";

type Service<T> = {
    get: () => CancelablePromise<T[]>
    put: (id: number, requestBody?: ToDoTask) => CancelablePromise<any>
}

type BaseModel = {
    id?: number
}

function useApiList<T extends BaseModel>(service: Service<T>): [T[] | undefined, boolean, ApiError | undefined, () => Promise<() => void>] {
    const [list, setList] = useState<T[]>()
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState<ApiError>()

    const fetchData = useCallback(async () => {
        const request = service.get()
        request.then(l => {
            setList(l)
            setLoading(false)
        }).catch(reason => {
            setError(reason)
            setLoading(false)
        })

        return () => {
            request.cancel()
        }
    }, []);


    useEffect(() => {
        fetchData();
    }, [])

    return [list, isLoading, error, fetchData];
}

export default useApiList;