import { useState, useEffect } from 'react'
import ResourceCard from './ResourceCard'
import resourcesApi from '../../api/resources'
import { toast } from 'react-toastify'

const ResourceList = () => {
    const [resources, setResources] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const data = await resourcesApi.getAllResources()
                setResources(data)
            } catch (error) {
                toast.error('Failed to fetch resources')
            } finally {
                setLoading(false)
            }
        }
        fetchResources()
    }, [])

    const handleDelete = (id) => {
        setResources(resources.filter(resource => resource.id !== id))
    }

    if (loading) {
        return <div className="text-center py-8">Loading resources...</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map(resource => (
                <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    )
}

export default ResourceList