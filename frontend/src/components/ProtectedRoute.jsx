import { useUser, RedirectToSignIn } from '@clerk/clerk-react';

/**
 * ProtectedRoute — wraps routes that require authentication.
 * Redirects unauthenticated users to Clerk sign-in.
 */
const ProtectedRoute = ({ children }) => {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-slate-500 text-sm">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isSignedIn) {
        return <RedirectToSignIn />;
    }

    return children;
};

export default ProtectedRoute;
