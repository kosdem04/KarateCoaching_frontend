import { Navigate } from "react-router-dom";
import { useAuth } from "../auth-context.js";

const ProtectedAuthRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div>Загрузка...</div>;
    if (!isAuthenticated) return <Navigate to="/login/" />;
    return children;
};

export default ProtectedAuthRoute;
