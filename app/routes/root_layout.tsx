import { NavLink, Outlet, useNavigate } from "react-router";
import { logout } from 'app/services/account.service'

export default function RootLayoutPage() {

    const navigate = useNavigate()

    function exit() {
        logout()
        navigate('/')
    }

    return (

        <main className="min-h-screen bg-gray-100">
            <nav className="flex py-3">
                <NavLink
                    to="/users"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-blue-600 text-white py-3 px-3 mx-1 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md transform hover:scale-[1.01]"
                            : "bg-gray-200 text-gray-700 py-3 px-3 mx-1 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200 shadow-md"
                    }
                >
                    Users
                </NavLink>
                <NavLink
                    to="/roles"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-blue-600 text-white py-3 px-3 mx-1 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md transform hover:scale-[1.01]"
                            : "bg-gray-200 text-gray-700 py-3 px-3 mx-1 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200 shadow-md"
                    }
                >
                    Roles
                </NavLink>
                <button onClick={exit}
                    type="button"
                    className="py-3 px-3 mx-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md transform hover:scale-[1.01]"
                >
                    Logout
                </button>
            </nav>
            <Outlet />
        </main>

    );
}