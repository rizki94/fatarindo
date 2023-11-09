import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { apiClient } from "../services/api";
import useAuth from "../hooks/useAuth";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
	const [profile, setProfile] = useState([]);
	const [userProfile, setUserProfile] = useState([]);
	const { auth } = useAuth();

	useEffect(() => {
		if (auth.user) {
			apiClient.get("api/profile/active").then((response) => {
				setProfile(response.data);
			});
			apiClient
				.get("api/user_profile", {
					params: {
						user_id: auth?.user?.id,
					},
				})
				.then((response) => {
					setUserProfile(response.data);
				});
		}
	}, [auth]);

	return (
		<ProfileContext.Provider value={{ profile, userProfile }}>
			{children}
		</ProfileContext.Provider>
	);
};
