import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const [query, setQuery] = useState('')
    const [type, setType] = useState('title')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!query.trim()) {
            return
        }
        navigate(`/resources/search?query=${query}&type=${type}`)
    }

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search resources..."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                <div>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="title">By Title</option>
                        <option value="subject">By Subject</option>
                        <option value="username">By Username</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                    Search
                </button>
            </div>
        </form>
    )
}

export default SearchBar