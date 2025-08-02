import { Link } from 'react-router-dom'
import resourcesApi from '../../api/resources'
import { toast } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'

const ResourceCard = ({ resource, onDelete }) => {
    const { user } = useAuth()

    const handleDelete = async (id) => {
        try {
            await resourcesApi.deleteResource(id)
            onDelete(id)
            toast.success('Resource deleted successfully')
        } catch (error) {
            toast.error('Failed to delete resource')
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    <Link to={`/resources/${resource.id}`} className="hover:text-indigo-600">
                        {resource.title}
                    </Link>
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Subject:</span> {resource.subject}
                </p>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {resource.description}
                </p>
                <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Uploaded by: {resource.uploadedBy.username}
          </span>
                    <span className="text-xs text-gray-500">
            {new Date(resource.createdAt).toLocaleDateString()}
          </span>
                </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 flex justify-end">
                <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mr-4"
                >
                    View Resource
                </a>
                {user && resource.canEdit && (
                    <>
                        <Link
                            to={`/resources/${resource.id}/edit`}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mr-4"
                        >
                            Edit
                        </Link>
                        <button
                            onClick={() => handleDelete(resource.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default ResourceCard