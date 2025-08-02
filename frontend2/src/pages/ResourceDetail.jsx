import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import resourcesApi from '../api/resources'
import { toast } from 'react-toastify'

const ResourceDetail = () => {
    const { id } = useParams()
    const [resource, setResource] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchResource = async () => {
            try {
                const resources = await resourcesApi.getAllResources()
                const foundResource = resources.find(r => r.id.toString() === id)
                if (foundResource) {
                    setResource(foundResource)
                } else {
                    toast.error('Resource not found')
                }
            } catch (error) {
                toast.error('Failed to fetch resource')
            } finally {
                setLoading(false)
            }
        }
        fetchResource()
    }, [id])

    if (loading) {
        return <div className="text-center py-8">Loading resource...</div>
    }

    if (!resource) {
        return <div className="text-center py-8">Resource not found</div>
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">{resource.title}</h1>
                        {resource.canEdit && (
                            <Link
                                to={`/resources/${resource.id}/edit`}
                                className="text-indigo-600 hover:text-indigo-800"
                            >
                                Edit
                            </Link>
                        )}
                    </div>
                    <div className="mb-6">
            <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {resource.subject}
            </span>
                    </div>
                    <p className="text-gray-600 mb-6">{resource.description}</p>
                    <div className="mb-6">
                        <a
                            href={resource.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            View Resource
                        </a>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                        <div className="flex items-center">
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">
                                    Uploaded by {resource.uploadedBy.fullName} (@{resource.uploadedBy.username})
                                </p>
                                <p className="text-sm text-gray-500">
                                    {new Date(resource.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResourceDetail