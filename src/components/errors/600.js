import { useTranslation } from "react-i18next";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../layouts/forms/Button";
import useDocTitle from "../../hooks/useDocTitle";

const InvoiceNotFound = () => {
	const [t] = useTranslation();
	useDocTitle(t("errors.permissionDenied.title"));
	const navigate = useNavigate();
	const from = -1 || "/admin/dashboard";
	const handleClick = () => {
		navigate(from, { replace: true });
	};

	return (
		<div className="flex items-center justify-center w-screen h-screen bg-primary text-primary">
			<div className="px-4 lg:py-12">
				<div className="lg:gap-4 lg:flex">
					<div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
						<h1 className="font-bold text-3xl">404</h1>
						<p className="mb-2 font-bold text-center text-xl">
							<span>Invoice Not Found</span>
						</p>
						<p className="mb-8 text-center">
							{t("errors.permissionDenied.description")}
						</p>
						<Button onClick={handleClick}>
							{t("errors.permissionDenied.action")}
						</Button>
						<Button onClick={() => navigate("/admin/dashboard")}>
							{t("general.homepage")}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InvoiceNotFound;
