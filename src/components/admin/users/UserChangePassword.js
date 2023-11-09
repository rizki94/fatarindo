import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	Navigate,
	useLocation,
	useNavigate,
	useParams,
} from "react-router-dom";
import useDocTitle from "../../../hooks/useDocTitle";
import { useFetchWithParams } from "../../../hooks/useFetch";
import { useModal } from "../../../hooks/useModal";
import { useToast } from "../../../hooks/useToast";
import { Loading } from "../../../layouts/forms/Form";
import { Container, Input, Button, Text } from "../../../layouts/forms/Index";
import CustomModal from "../../../layouts/modal";
import { apiClient, url } from "../../../services/api";
import { VscTrash, VscAccount } from "react-icons/vsc";
import useAuth from "../../../hooks/useAuth";

const UserChangePassword = () => {
    const [t] = useTranslation();
	const { auth, setAuth } = useAuth();
	const { id } = useParams();
	const title = t('users.changePassword')
	useDocTitle(title);
	const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
	const [passwordMatch, setPasswordMatch] = useState(true);
	const location = useLocation();

	const initialState = {
		id: id,
		password: "",
		confirm_password: "",
		avatar_img: "",
	};

	const { data: users, isLoading } = useFetchWithParams(
		"api/user/show",
		{
			params: {
				id: id,
			},
		},
		id
	);
	useEffect(() => {
		setData({ ...data, avatar_img: users?.avatar_img });
	}, [users]);
	const [data, setData] = useState(initialState);
	const [image, setImage] = useState("");
	const navigate = useNavigate();
	const toast = useToast();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("image", image);
		formData.append("data", JSON.stringify(data));
		apiClient
			.post(`api/user/change_password`, formData)
			.then((response) => {
				if (response.data.status === 200) {
					setTimeout(() => {
						setAuth({
							...auth,
							user: {
								...auth?.user,
								avatar_img: response.data.avatar,
							},
						});
					});
					toast("success", "User berhasil diperbarui");
				} else if (response.data.status === 422) {
					let errorMsg = {};
					errorMsg = response.data.validateErr;
					const values = Object.values(errorMsg);
					for (let i = 0; i < values.length; i++) {
						toast("error", values[i]);
					}
				}
			});
	};

	return isLoading ? (
		<Loading />
	) : auth?.user?.id != id ? (
		<Navigate to="/401" state={{ from: location }} replace />
	) : (
		<Container
			navigation1={
				<>
					{itemModalOpen && (
						<CustomModal
							title={t("general.cancelChanges.title")}
							isActive={itemModalOpen}
							handleClose={() => setItemModalOpen(false)}
							footer={
								<div className="flex">
									<Button
										variant="danger"
										onClick={() => navigate(-1)}
									>
										{t("general.yes")}
									</Button>
									<Button
										variant="success"
										onClick={toggleModal}
									>
										{t("general.no")}
									</Button>
								</div>
							}
						>
							{t("general.cancelChanges.description")}
						</CustomModal>
					)}
					<div className="flex">
						<Button tabIndex="-1" onClick={handleSubmit}>
							{t("general.save")}
						</Button>
						<Button
							tabIndex="-1"
							variant="danger"
							onClick={toggleModal}
						>
							{t("general.cancel")}
						</Button>
					</div>
				</>
			}
			title={title}
		>
			<div className="flex justify-center items-center space-x-3">
				<div className="w-48 h-48 rounded-md shadow-md">
					<Input
						accept="image/*"
						type="file"
						onChange={(e) => setImage(e.target.files[0])}
						className="opacity-0 absolute w-48 h-48 rounded-md cursor-pointer"
					/>
					{image ? (
						<img
							src={URL.createObjectURL(image)}
							className="w-48 h-48 bg-cover rounded-md"
						/>
					) : data.avatar_img ? (
						<>
							<VscTrash
								className="absolute w-8 h-8 hover:fill-red-600 cursor-pointer"
								onClick={() =>
									setData({ ...data, avatar_img: "" })
								}
							/>
							<img
								src={
									data.avatar_img &&
									`${url}/uploads/avatar/${data.avatar_img}`
								}
								className="w-48 h-48 bg-cover rounded-md"
							/>
						</>
					) : (
						<VscAccount className="w-full h-full object-cover" />
					)}
				</div>
			</div>
			<Input
				label={t("users.add.password")}
				type="password"
				id="password"
				autoComplete="new-password"
				value={data.password}
				onChange={(e) => {
					setData({ ...data, password: e.target.value });
					if (e.target.value === data.password) {
						setPasswordMatch(true);
					} else {
						setPasswordMatch(false);
					}
				}}
			/>
			<Input
				label={t("users.add.confirmPassword")}
				type="password"
				value={data.confirm_password}
				onChange={(e) => {
					setData({ ...data, confirm_password: e.target.value });
					if (e.target.value === data.password) {
						setPasswordMatch(true);
					} else {
						setPasswordMatch(false);
					}
				}}
			/>
			{!passwordMatch && (
				<Text size="small" className="text-red-600">
					{t('users.add.passwordDoesntMatch')}
				</Text>
			)}
		</Container>
	);
};

export default UserChangePassword;
