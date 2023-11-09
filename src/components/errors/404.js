import { useTranslation } from "react-i18next";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useDocTitle from "../../hooks/useDocTitle";
import Button from "../../layouts/forms/Button";

const PageNotFound = () => {
	const [t] = useTranslation();
	const title = t("errors.pageNotFound.title");
	const navigate = useNavigate();
	const location = useLocation();
	useDocTitle(title);
	const [from, setForm] = useState();

	useEffect(() => {
		setForm(location?.state?.from?.pathname || "/admin/dashboard");
	}, []);

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
							<span>{t("errors.pageNotFound.title")}</span>
						</p>
						<p className="mb-8 text-center">
							{t("errors.pageNotFound.description")}
						</p>
						<Button onClick={handleClick}>
							{t("errors.pageNotFound.action")}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PageNotFound;
