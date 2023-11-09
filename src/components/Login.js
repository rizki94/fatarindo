import React, { useState, useEffect } from "react";
import {
	Button,
	Input,
	Checkbox,
	ContainerFull,
	Select,
} from "../layouts/forms/Index";
import logo from "../assets/logo.svg";
import logoDark from "../assets/logoDark.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { apiClient } from "../services/api";
import {
	useToast,
	useAuth,
	useDocTitle,
	useFetch,
	useTheme,
} from "../hooks/Index";
import Toggle from "./themeToggle";
import Locale from "./admin/Locale";
import { useTranslation } from "react-i18next";

const Login = () => {
	const [t] = useTranslation();
	const { theme } = useTheme();
	const title = t("login.title");
	useDocTitle(title);
	const { setAuth, persist, setPersist } = useAuth();
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [branch, setBranch] = useState();
	const { data: branches, isLoading: isLoadingBranches } = useFetch("api/active_branch");
	const [from, setForm] = useState();
	useEffect(() => {
		setBranch(branches[0]?.id);
	}, [branches]);

	const toast = useToast();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		setForm(location?.state?.from?.pathname || "/admin/dashboard");
	}, []);

	const submitLogin = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		apiClient
			.post("api/login", {
				name: name,
				password: password,
				branch_id: branch,
			})
			.then((response) => {
				if (response.data.status === 200) {
					setAuth({
						user: response.data.user,
						token: response.data.token,
						permission: response?.data?.permission,
					});
					localStorage.setItem("auth_id", response.data.user.id);
					localStorage.setItem("token", response.data.token);
					toast("success", response.data.message);
					setIsLoading(false);
					navigate(from, { replace: true });
				} else {
					toast("error", response.data.message);
					setIsLoading(false);
				}
			});
		setIsLoading(false);
	};

	const onKeyPress = (e) => {
		if (e.key === "Enter") {
			submitLogin(e);
		}
	};

	const togglePersist = () => {
		setPersist((prev) => !prev);
	};

	useEffect(() => {
		localStorage.setItem("persist", persist);
	}, [persist]);

	return (
		<ContainerFull>
			<div className="flex w-full py-4 justify-end gap-4 mb-10">
				<Toggle />
				<Locale />
			</div>
			<div className="lg:w-1/3 md:w-1/2 w-full mb-6">
				<div className="flex flex-col justify-center items-center mb-8 -mt-6">
					<img src={theme === "dark" ? logoDark : logo} />
				</div>
				<Input
					label={t("users.add.name")}
					className="w-full"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<Input
					label={t("users.add.password")}
					type="password"
					className="w-full"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					onKeyPress={onKeyPress}
				/>
				<Select
					label={t("element.branch")}
					data={branches}
					value={branch}
					defaultOption
					isLoading={isLoadingBranches}
					onChange={(e) => setBranch(e.target.value)}
				/>
				<Checkbox
					label="Trust This Device"
					onChange={togglePersist}
					checked={persist}
				/>
				<Button
					buttonLoading={isLoading}
					className="w-full"
					onClick={submitLogin}
				>
					{t("login.title")}
				</Button>
			</div>
		</ContainerFull>
	);
};

export default Login;
