// src/pages/SearchResults.jsx
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ResourceList from '../components/Resources/ResourceList'
import resourcesApi from '../api/resources'

const SearchResults = () => {
    const [resources, setResources] = useState([])
    const [loading, setLoading] = useState(true)
    const location = useLocation()

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const query = searchParams.get('query')
        const type = searchParams.get('type')

        const fetchSearchResults = async () => {
            try {
                const results = await resourcesApi.searchResources(query, type)
                setResources(results)
            } catch (error) {
                console.error('Search failed:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchSearchResults()
    }, [location.search])

    if (loading) {
        return <div className="text-center py-8">Loading search results...</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8">Search Results</h1>
            <ResourceList resources={resources} />
        </div>
    )
}

export default SearchResults