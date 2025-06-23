import { useState, useEffect } from 'react';

const useOfflineSync = (storageKey, initialData = []) => {
    const [data, setData] = useState(() => {
        try {
            const localData = window.localStorage.getItem(storageKey);
            return localData ? JSON.parse(localData) : initialData;
        } catch (error) {
            console.error(error);
            return initialData;
        }
    });

    useEffect(() => {
        window.localStorage.setItem(storageKey, JSON.stringify(data));
    }, [data, storageKey]);

    return [data, setData];
};

export default useOfflineSync; 