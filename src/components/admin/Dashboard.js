import React from "react";
import { Container } from "../../layouts/forms/Container";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useDocTitle } from "../../hooks/Index";
import { useTranslation } from "react-i18next";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
	const [t] = useTranslation();
	const title = t("sidebar.homepage");
	useDocTitle(title);

	return (
		<Container
			title={title}
		>
		</Container>
	);
};

export default Dashboard;
