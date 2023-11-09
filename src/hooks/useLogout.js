import useAuth from "./useAuth";
import { apiClient } from "../services/api";

const useLogout = () => {
	const { auth, setAuth } = useAuth();

	const logout = async () => {
		setAuth({});
		try {
			await apiClient.post("api/logout", {
				user: auth.user,
				token: auth.token,
			});
			localStorage.removeItem("auth_id");
			localStorage.removeItem("auth_name");
			localStorage.removeItem("token");
			setAuth("");
		} catch (err) {
			console.error(err);
		}
	};

	return logout;
};

export default useLogout;
