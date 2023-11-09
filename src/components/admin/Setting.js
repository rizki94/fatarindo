import { useTranslation } from "react-i18next";
import React from "react";
import useDocTitle from "../../hooks/useDocTitle";
import { Container } from "../../layouts/forms/Container";
import Select from "../../layouts/forms/Select";

const Setting = () => {
	const [t] = useTranslation();
    const theme = [
        {
            id: 1,
            name: "dark",
        },
        {
            id: 2,
            name: "light",
        },
    ];
    const title = t("setting.title");
    useDocTitle(title);
    return (
        <Container title={title}>
            <Select label={t("setting.theme")} data={theme} />
        </Container>
    );
};

export default Setting;
