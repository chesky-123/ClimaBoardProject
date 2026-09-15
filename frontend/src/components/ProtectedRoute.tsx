import { Navigate } from "react-router";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const userName = localStorage.getItem("userName");

    if (!userName) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}