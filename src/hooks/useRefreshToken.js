import { apiClient } from "../services/api";
import useAuth from "./useAuth";

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const response = await apiClient.get("api/refresh", {
			params: {
				id: localStorage.getItem("auth_id"),
			},
		});
		setAuth((prev) => {
			return {
				...prev,
				user: response.data.user,
				permission: response.data.permission,
				token: response.data.token,
			};
		});
		localStorage.setItem("token", response.data.token);
		return response.data.token;
	};
	return refresh;
};

export default useRefreshToken;
