import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDocTitle from "../../../hooks/useDocTitle";
import { useFetch, useFetchWithParams } from "../../../hooks/useFetch";
import { useToast } from "../../../hooks/useToast";
import { Loading } from "../../../layouts/forms/Form";
import {
	Container,
	Input,
	Checkbox,
	Button,
	Select,
} from "../../../layouts/forms/Index";
import { apiClient } from "../../../services/api";
import { useModal } from "../../../hooks/useModal";
import CustomModal from "../../../layouts/modal";
import { useTranslation } from "react-i18next";

const ProfileCreate = () => {
    const [t] = useTranslation();
	const { id } = useParams();
	const title = id ? t("profile.update.title") : t("profile.add.title");
	useDocTitle(title);
	const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
	const { data: moduleGroup } = useFetch("api/module_groups");
	const { data: profiles, isLoading } = useFetchWithParams(
		"api/profile/show",
		{
			params: {
				id: id,
			},
		},
		id
	);

	const initialState = {
		id: "",
		parameter: "",
		descr: "",
		category_id: "",
		user_profile: 0,
	};
	const [data, setData] = useState(initialState);
	const navigate = useNavigate();
	const toast = useToast();

	useEffect(() => {
		id && setData(profiles);
	}, [id, profiles]);

	const handleChange = (e) => {
		e.preventDefault();
		const newData = { ...data };
		newData[e.target.id] = e.target.value;
		setData(newData);
	};

	const handleSubmit = () => {
		id
			? apiClient
					.put(`api/profile/${id}`, {
						data: data,
					})
					.then((response) => {
						if (response.data.status === 200) {
							toast("success", t("toast.update.success"));
							navigate(-1);
						} else if (response.data.status === 422) {
							let errorMsg = {};
							errorMsg = response.data.validateErr;
							const values = Object.values(errorMsg);
							for (let i = 0; i < values.length; i++) {
								toast("error", values[i]);
							}
						}
					})
			: apiClient
					.post("api/profile/store", {
						data: data,
					})
					.then((response) => {
						if (response.data.status === 200) {
							toast("success", t("toast.add.success"));
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
			<Input
				label={t("profile.add.id")}
				id="id"
				value={data.id}
				onChange={handleChange}
			/>
			<Input
                className="w-full"
				label={t("profile.add.descr")}
				id="descr"
				value={data.descr}
				onChange={handleChange}
			/>
			<Input
				label={t("profile.add.parameter")}
				id="parameter"
				value={data.parameter}
				onChange={handleChange}
			/>
			<Select
				label={t("profile.add.category")}
				id="category_id"
				data={moduleGroup}
				value={data.category_id}
				onChange={handleChange}
                defaultOption
			/>
		</Container>
	);
};

export default ProfileCreate;
