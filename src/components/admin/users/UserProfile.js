import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
	useFetch,
	useDocTitle,
	useToast,
	useModal,
	useFetchWithParams,
} from "../../../hooks/Index";
import { Loading } from "../../../layouts/forms/Form";
import {
	Container,
	Select,
	Button,
	Checkbox,
} from "../../../layouts/forms/Index";
import CustomModal from "../../../layouts/modal";
import { apiClient } from "../../../services/api";
import { ProfileContext } from "../../../context/ProfileProvider";

const UserProfile = () => {
	const [t] = useTranslation();
	const title = t("users.profile.title");
	useDocTitle(title);
	const { id } = useParams();
	const navigate = useNavigate();
	const toast = useToast();
	const [data, setData] = useState({});
	const profiles = useContext(ProfileContext);
	const { data: profile, isLoading } = useFetch("api/user/profile");
	const { data: userProfile } = useFetchWithParams("api/user_profile", {
		params: {
			user_id: id,
		},
	});
	const { data: prefixes } = useFetch("api/user/prefix");
	const { data: locations } = useFetch("api/locations");
	const { data: account } = useFetch("api/transaction/pos/account");
	const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();

	const handleChange = (e) => {
		e.preventDefault();
		const newData = { ...data };
		newData[e.target.id] = e.target.value;
		setData(newData);
	};

	useEffect(() => {
		for (let index = 0; index < profile.length; index++) {
			const filter = prefixes.filter(
				(f) => f.group_code_id === profile[index].id
			);
			filter.length >= 1 && (data[profile[index].id] = filter[0].id);
		}
		setData({
			...data,
			DEF_LOCK: locations[0]?.id,
			POS_LOCK_PRICE: false,
		});
		if (userProfile) {
			setData({
				...data,
				...userProfile,
				POS_LOCK_PRICE: parseInt(userProfile["POS_LOCK_PRICE"]),
			});
		}
	}, [prefixes, locations]);

	const handleSubmit = (e) => {
		e.preventDefault();
		apiClient
			.post("api/user/profile/create", {
				id: id,
				data: data,
			})
			.then((response) => {
				if (response.data.status === 200) {
					toast("success", response.data.message);
					navigate(-1);
				}
			});
	};

	return isLoading ? (
		<Loading />
	) : (
		<Container
			title={title}
			navigation1={
				<>
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
					<div className="flex">
						<Button tabIndex="-1" onClick={handleSubmit}>
							{t("general.save")}
						</Button>
						<Button tabIndex="-1" variant="danger" onClick={toggleModal}>
							{t("general.cancel")}
						</Button>
					</div>
				</>
			}
		>
			<div className="flex flex-col">
				<div className="flex flex-row flex-wrap p-4 first:pt-0 items-end">
					{profile
						.filter((f) => f.category_id === 10)
						.map((a) => (
							<Select
								className="w-32"
								key={a.id}
								id={a.id}
								label={a.descr}
								value={data[a.id]}
								onChange={handleChange}
								defaultOption
							>
								{prefixes
									.filter((f) => f.group_code_id === a.id)
									.map((prefix) => (
										<option key={prefix.id} value={prefix.id}>
											{prefix.id}
										</option>
									))}
							</Select>
						))}
				</div>
				<div className="flex py-4 last:pb-0">
					<Select
						label={t("element.warehouse")}
						id="DEF_LOC"
						value={data["DEF_LOC"]}
						onChange={handleChange}
						defaultOption
						data={locations}
					/>
					<Select
						label={t("profile.add.accountPosTax")}
						id="DEF_POS_ACC_TAX"
						disabled={profiles?.profile["IS_TAX"] == "FALSE"}
						value={data["DEF_POS_ACC_TAX"]}
						onChange={handleChange}
						defaultOption
						data={account.filter(
							(item) => item.account4_id === "1101.100" && item.is_tax === 1
						)}
					/>
					<Select
						label={t("profile.add.accountPos")}
						id="DEF_POS_ACC"
						value={data["DEF_POS_ACC"]}
						onChange={handleChange}
						defaultOption
						data={account.filter(
							(item) => item.account4_id === "1101.100" && item.is_tax === 0
						)}
					/>
					<Checkbox
						label={t("pos.add.openLockPrice")}
						checked={data["POS_LOCK_PRICE"]}
						onChange={() =>
							setData({
								...data,
								POS_LOCK_PRICE: !data["POS_LOCK_PRICE"],
							})
						}
					/>
				</div>
			</div>
		</Container>
	);
};

export default UserProfile;
