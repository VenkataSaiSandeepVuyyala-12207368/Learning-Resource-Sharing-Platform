import { useState } from 'react'
import LoginForm from '../components/Auth/LoginForm'
import RegisterForm from '../components/Auth/RegisterForm'

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-md">
                    {isLogin ? <LoginForm /> : <RegisterForm />}
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-indigo-600 hover:text-indigo-800"
                        >
                            {isLogin
                                ? "Don't have an account? Register"
                                : 'Already have an account? Login'}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AuthPage