import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const Header = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }

    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <Link to="/" className="text-xl font-bold text-indigo-600">
                    ShareResources
                </Link>
                <nav className="flex items-center space-x-4">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600">
                                Dashboard
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-gray-600 hover:text-indigo-600"
                            >
                                Logout
                            </button>
                            <span className="text-gray-600">{user.username}</span>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-600 hover:text-indigo-600">
                                Login
                            </Link>
                            <Link to="/register" className="text-gray-600 hover:text-indigo-600">
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Header