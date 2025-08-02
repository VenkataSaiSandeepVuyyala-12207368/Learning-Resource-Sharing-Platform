import axios from 'axios'

const API_URL = 'http://localhost:8080/api/resources'

const getAllResources = async () => {
    const response = await axios.get(API_URL, {
        withCredentials: true
    })
    return response.data
}

const getRecentResources = async () => {
    const response = await axios.get(`${API_URL}/recent`, {
        withCredentials: true
    })
    return response.data
}

const createResource = async (resourceData) => {
    const response = await axios.post(API_URL, resourceData, {
        withCredentials: true
    })
    return response.data
}

const updateResource = async (id, resourceData) => {
    const response = await axios.put(`${API_URL}/${id}`, resourceData, {
        withCredentials: true
    })
    return response.data
}

const deleteResource = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        withCredentials: true
    })
    return response.data
}

// const searchResources = async (query, type) => {
//     const response = await axios.get(`${API_URL}/search`, {
//         params: { query, type },
//         withCredentials: true
//     })
//     return response.data
// }

const searchResources = async (query, type) => {
    const params = {}
    if (query) params.query = query
    if (type) params.type = type
    const response = await axios.get(`${API_URL}/search`, {
        params,
        withCredentials: true
    })
    return response.data
}

export default {
    getAllResources,
    getRecentResources,
    createResource,
    updateResource,
    deleteResource,
    searchResources
}