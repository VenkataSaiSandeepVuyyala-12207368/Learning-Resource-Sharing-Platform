import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import resourcesApi from '../../api/resources'
import { toast } from 'react-toastify'

const ResourceForm = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [resource, setResource] = useState({
        title: '',
        subject: '',
        link: '',
        description: ''
    })

    useEffect(() => {
        if (id) {
            const fetchResource = async () => {
                try {
                    const resources = await resourcesApi.getAllResources()
                    const foundResource = resources.find(r => r.id.toString() === id)
                    if (foundResource) {
                        setResource(foundResource)
                    }
                } catch (error) {
                    toast.error('Failed to fetch resource')
                }
            }
            fetchResource()
        }
    }, [id])

    const handleChange = (e) => {
        setResource({
            ...resource,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (id) {
                await resourcesApi.updateResource(id, resource)
                toast.success('Resource updated successfully')
            } else {
                await resourcesApi.createResource(resource)
                toast.success('Resource created successfully')
            }
            navigate('/dashboard')
        } catch (error) {
            toast.error(error.response?.data?.message || 'Operation failed')
        }
    }

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
                {id ? 'Edit Resource' : 'Add New Resource'}
            </h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={resource.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="subject">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={resource.subject}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="link">
                        Resource Link
                    </label>
                    <input
                        type="url"
                        id="link"
                        name="link"
                        value={resource.link}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={resource.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    >
                        {id ? 'Update' : 'Create'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ResourceForm