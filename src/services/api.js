const BASE_URL = 'http://localhost:3001';

const fetchClient = async (endpoint, { body, ...customConfig } = {}) => {
    const headers = { 'Content-Type': 'application/json' };

    const config = {
        method: body ? 'POST' : 'GET',
        ...customConfig,
        headers: {
            ...headers,
            ...customConfig.headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        if (!response.ok) {
            const error = await response.json();
            return Promise.reject(error);
        }
        return await response.json();
    } catch (error) {
        return Promise.reject(error);
    }
};

fetchClient.get = (endpoint, customConfig = {}) => {
    return fetchClient(endpoint, { ...customConfig, method: 'GET' });
};

fetchClient.post = (endpoint, body, customConfig = {}) => {
    return fetchClient(endpoint, { ...customConfig, body, method: 'POST' });
};

fetchClient.patch = (endpoint, body, customConfig = {}) => {
    return fetchClient(endpoint, { ...customConfig, body, method: 'PATCH' });
};

fetchClient.delete = (endpoint, customConfig = {}) => {
    return fetchClient(endpoint, { ...customConfig, method: 'DELETE' });
};

export default fetchClient; 