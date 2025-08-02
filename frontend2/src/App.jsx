import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Layout/Header'
import PrivateRoute from './components/Layout/PrivateRoute'
import Home from './pages/Home'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import ResourceDetail from './pages/ResourceDetail'
import ResourceForm from './components/Resources/ResourceForm'
import NotFound from './pages/NotFound'
import SearchResults from "./pages/SearchResults.jsx";

function App() {
    return (
        <AuthProvider>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<AuthPage />} />
                        <Route path="/register" element={<AuthPage />} />
                        <Route element={<PrivateRoute />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/resources/new" element={<ResourceForm />} />
                            <Route path="/resources/:id" element={<ResourceDetail />} />
                            <Route path="/resources/:id/edit" element={<ResourceForm />} />
                            <Route path="/resources/search" element={<SearchResults />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </div>
        </AuthProvider>
    )
}

export default App