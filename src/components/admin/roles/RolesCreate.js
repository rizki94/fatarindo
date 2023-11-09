import {
	Container,
	Button,
	Checkbox,
	Input,
	Text,
} from "../../../layouts/forms/Index";
import { useFetch, useFetchWithParams, useModal } from "../../../hooks/Index";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../../../services/api";
import { useEffect } from "react";
import { useToast } from "../../../hooks/useToast";
import CustomModal from "../../../layouts/modal";
import { Loading } from "../../../layouts/forms/Form";
import { useTranslation } from "react-i18next";

const RolesCreate = () => {
	const [t] = useTranslation();
	const { id } = useParams();
	const title = id ? t("roles.update.title") : t("roles.add.title");
	const toast = useToast();
	const navigate = useNavigate();
	const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();

	const {
		data: role,
		setData: setRole,
		isLoading,
	} = useFetchWithParams(
		"api/role/show",
		{
			params: {
				id: id,
			},
		},
		id
	);
	const { data: modules, setData: setModules } =
		useFetch("api/active_modules");
	const { data: moduleGroups } = useFetch("api/active_module_groups");
	const { data: permissions } = useFetchWithParams("api/permission", {
		params: {
			role_id: id,
		},
	});

	useEffect(() => {
		const newModules = [...modules];
		const newArray = newModules.map((obj) => ({
			...obj,
			haspermission: permissions
				.filter((a) => a.module_id === obj.id)
				.map((i) => i.haspermission)
				.values()
				.next().value
				? 1
				: 0,
		}));
		setModules(newArray);
	}, [modules.haspermission, permissions]);

	const handleChange = (e) => {
		const newData = { ...role };
		newData[e.target.id] = e.target.value;
		setRole(newData);
	};

	const handleSave = (e) => {
		e.preventDefault();
		id
			? apiClient
					.put(`api/role/${id}`, {
						role: role,
						permission: modules,
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
					})
			: apiClient
					.post("api/role", {
						role: role,
						permission: modules,
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
						<Button tabIndex="-1" onClick={handleSave}>
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
				label={t("roles.add.name")}
				id="name"
				value={role.name}
				onChange={handleChange}
			/>
			<Checkbox
				label={t("general.active")}
				checked={role.active}
				onChange={() => setRole({ ...role, active: !role.active })}
			/>
			<div>Roles</div>
			<div className="flex flex-col">
				{moduleGroups.map((moduleGroup) => (
					<div key={moduleGroup.id}>
						<div className="flex flex-row items-center">
							<Text>{moduleGroup.description}</Text>
							<Button
								size="extraSmall"
								variant="primary"
								onClick={() => {
									const result = modules.map((e) =>
										e.module_group_id == moduleGroup.id
											? { ...e, haspermission: 1 }
											: e
									);
									setModules(result);
								}}
							>
								Select All
							</Button>
							<Button
								size="extraSmall"
								variant="danger"
								onClick={() => {
									const result = modules.map((e) =>
										e.module_group_id == moduleGroup.id
											? { ...e, haspermission: 0 }
											: e
									);
									setModules(result);
								}}
							>
								Deselect All
							</Button>
						</div>
						<div className="flex flex-row flex-wrap my-2">
							{modules
								.filter(
									(moduleFilter) =>
										moduleFilter.module_group_id ===
										moduleGroup.id
								)
								.map((module) => (
									<Button
										key={module.id}
										size="extraSmall"
										value={module.id}
										onClick={() => {
											const result = modules.map((e) =>
												e.id == module.id
													? {
															...e,
															haspermission:
																e.haspermission ===
																1
																	? 0
																	: 1,
													  }
													: e
											);
											setModules(result);
										}}
										variant={
											module.haspermission === 1
												? "success"
												: "danger"
										}
									>
										{module.description}
									</Button>
								))}
						</div>
					</div>
				))}
			</div>
		</Container>
	);
};

export default RolesCreate;
