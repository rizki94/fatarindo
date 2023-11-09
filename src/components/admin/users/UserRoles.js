import { Container, Button, Select } from "../../../layouts/forms/Index";
import { useFetch, useFetchWithParams, useModal } from "../../../hooks/Index";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../../../services/api";
import { useEffect, useState } from "react";
import { useToast } from "../../../hooks/useToast";
import { FiTrash2 } from "react-icons/fi";
import { v4 as uuid } from "uuid";
import CustomModal from "../../../layouts/modal";
import { useTranslation } from "react-i18next";

const UserRoles = () => {
	const [t] = useTranslation();
	const { id } = useParams();
	const title = t("users.roles.title");
	const toast = useToast();
	const navigate = useNavigate();
	const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
	const [role, setRole] = useState([]);

	const { data } = useFetchWithParams("api/user/roles", {
		params: {
			user_id: id,
		},
	});

	useEffect(() => {
		if (data) {
			setRole(data);
		}
	}, [data]);

	const { data: roles, isLoading } = useFetch("api/active_roles");
	const [selected, setSelected] = useState();

	const handleAdd = (e) => {
		e.preventDefault();
		const match = role
			.map((role) => role.role_id)
			.findIndex((a) => a === selected)
		if (match > 0) {
			toast("error", "Role sudah ada");
		} else {
			const newData = data[0];
			const newDatas = [...role, { ...newData, role_id: selected, id: uuid() }];
			setRole(newDatas);
		}
	};

	const handleDelete = (e) => {
		const listItems = data.filter((i) => i.id !== e);
		setRole(listItems);
	};

	const handleSave = (e) => {
		e.preventDefault();
		apiClient
			.post("api/user/roles", {
				user_id: id,
				role_id: role.map((a) => a.role_id),
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

	return (
		<Container title={title}>
			<div className="flex flex-row items-end mb-6">
				<Select
					className="w-64"
					label={t(`general.add`) + " " + title}
					data={roles}
					isLoading={isLoading}
					value={selected}
					onChange={(e) => setSelected(e.target.value)}
					defaultOption
				/>
				<Button onClick={handleAdd}>{t(`general.add`)}</Button>
			</div>
			<div>Roles</div>
			{role.map((item) => (
				<div key={item.id} className="flex flex-row items-center">
					{roles
						.filter((role) => parseInt(role.id) === parseInt(item.role_id))
						.map((filter) => (
							<Button size="extraSmall" key={filter.id}>
								{filter.name}
							</Button>
						))}
					<FiTrash2
						onClick={() => handleDelete(item.id)}
						className="cursor-pointer"
					/>
				</div>
			))}
			<div className="flex flex-row mt-6">
				<Button onClick={handleSave}>{t("general.save")}</Button>
				<Button tabIndex="-1" variant="danger" onClick={toggleModal}>
					{t("general.cancel")}
				</Button>
			</div>
			{itemModalOpen && (
				<CustomModal
					title={t("general.cancelChanges.title")}
					isActive={itemModalOpen}
					handleClose={() => setItemModalOpen(false)}
					footer={
						<div className="flex">
							<Button variant="danger" onClick={() => navigate(-1)}>
								{t("general.yes")}
							</Button>
							<Button variant="success" onClick={toggleModal}>
								{t("general.no")}
							</Button>
						</div>
					}
				>
					{t("general.cancelChanges.description")}
				</CustomModal>
			)}
		</Container>
	);
};

export default UserRoles;
