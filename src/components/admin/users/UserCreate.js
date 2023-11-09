import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import useDocTitle from "../../../hooks/useDocTitle";
import { useFetch, useFetchWithParams } from "../../../hooks/useFetch";
import { useModal } from "../../../hooks/useModal";
import { useToast } from "../../../hooks/useToast";
import { Loading } from "../../../layouts/forms/Form";
import {
	Container,
	Input,
	Checkbox,
	Button,
	Select,
} from "../../../layouts/forms/Index";
import CustomModal from "../../../layouts/modal";
import { apiClient, url } from "../../../services/api";
import { VscTrash, VscAccount } from "react-icons/vsc";
import useAuth from "../../../hooks/useAuth";

const initialState = {
	name: "",
	full_name: "",
	password: "",
	is_salesman: 0,
	group_sales_id: "",
	branch_id: "",
	avatar_img: "",
	active: true,
};

const UserCreate = () => {
	const { auth, setAuth, persist, setPersist } = useAuth();
	const { id } = useParams();
	const [t] = useTranslation();
	const title = id ? t("users.update.title") : t("users.add.title");
	useDocTitle(title);
	const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();

	const { data: users, isLoading } = useFetchWithParams(
		"api/user/show",
		{
			params: {
				id: id,
			},
		},
		id
	);
	const [data, setData] = useState(initialState);
	const [image, setImage] = useState("");
	const navigate = useNavigate();
	const toast = useToast();
	const { data: branches } = useFetch("api/active_branch");
	const { data: group_sales } = useFetch("api/contact/customer/group_sales");

	useEffect(() => {
		id && setData({ ...data, ...users });
	}, [id, users]);

	const handleChange = (e) => {
		e.preventDefault();
		const newData = { ...data };
		newData[e.target.id] = e.target.value;
		setData(newData);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("image", image);
		formData.append("data", JSON.stringify(data));
		if (id) {
			apiClient.post(`api/user/update`, formData).then((response) => {
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
					navigate(-1);
				} else if (response.data.status === 422) {
					let errorMsg = {};
					errorMsg = response.data.validateErr;
					const values = Object.values(errorMsg);
					for (let i = 0; i < values.length; i++) {
						toast("error", values[i]);
					}
				}
			});
		} else {
			apiClient.post("api/user", formData).then((response) => {
				if (response.data.status === 200) {
					toast("success", "User berhasil ditambahkan");
					navigate(-1);
				} else if (response.data.status === 422) {
					let errorMsg = {};
					errorMsg = response.data.validateErr;
					const values = Object.values(errorMsg);
					for (let i = 0; i < values.length; i++) {
						toast("error", values[i]);
					}
				}
			});
		}
	};

	return isLoading ? (
		<Loading />
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
				label={t("users.add.name")}
				id="name"
				value={data.name}
				onChange={handleChange}
			/>
			<Input
				label={t("users.add.full_name")}
				id="full_name"
				value={data.full_name}
				onChange={handleChange}
			/>
			<Input
				label={t("users.add.password")}
				type="password"
				id="password"
				autoComplete="new-password"
				value={data.password}
				onChange={handleChange}
			/>
			<div className="flex flex-row">
				<Checkbox
					label={t("users.add.isSalesman")}
					checked={data.is_salesman}
					onChange={() =>
						setData({ ...data, is_salesman: data.is_salesman === 0 ? 1 : 0 })
					}
				/>
				<Select
					label={t("customers.add.groupSales")}
					id="group_sales_id"
					value={data.group_sales_id}
					data={group_sales}
					onChange={handleChange}
					defaultOption={t("users.add.selectGroupSales")}
					disabled={!data.is_salesman}
				/>
			</div>
			<Select
				label={t("users.add.branch")}
				id="branch_id"
				defaultOption={t("users.add.selectBranch")}
				data={branches}
				value={data.branch_id}
				onChange={handleChange}
			/>
			<Checkbox
				label={t("general.active")}
				checked={data.active}
				onChange={() => setData({ ...data, active: !data.active })}
			/>
		</Container>
	);
};

export default UserCreate;
