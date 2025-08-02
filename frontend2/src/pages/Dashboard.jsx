import { Link } from 'react-router-dom'
import ResourceList from '../components/Resources/ResourceList'
import SearchBar from '../components/Resources/SearchBar'

const Dashboard = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Resource Dashboard</h1>
                <Link
                    to="/resources/new"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    Add New Resource
                </Link>
            </div>
            <SearchBar />
            <ResourceList />
        </div>
    )
}

export default Dashboard