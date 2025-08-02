import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Home = () => {
    const { user } = useAuth()

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Share and Discover Educational Resources
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-xl text-gray-500">
                    A platform for students to share and discover high-quality learning resources.
                </p>
                <div className="mt-10">
                    {user ? (
                        <Link
                            to="/dashboard"
                            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <div className="flex justify-center space-x-4">
                            <Link
                                to="/login"
                                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home