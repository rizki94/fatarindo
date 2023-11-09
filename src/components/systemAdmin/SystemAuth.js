import { useTranslation } from "react-i18next";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import Button from "../../layouts/forms/Button";
import { ContainerFull } from "../../layouts/forms/Container";
import Input from "../../layouts/forms/Input";
import { apiClient } from "../../services/api";

const SystemAuth = () => {
	const [t] = useTranslation();
    const navigate = useNavigate();
    const toast = useToast();
    const title = "Login to system admin";
    const initialState = {
        password: "",
    };
    const [data, setData] = useState(initialState);

    const handleSubmit = () => {
        apiClient.post("api/system_admin/login", data).then((res) => {
            if (res.data.status === 200) {
                toast('success', 'Login success')
                navigate('../activity_log')
            } else {
                toast('error', 'Invalid password')
            }
        });
    };

    return (
        <ContainerFull title={title}>
            <div className="flex flex-col gap-2 mt-12">
                <Input
                    placeholder="enter password"
                    type="password"
                    className="w-full"
                    value={data.password}
                    onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                    }
                />
                <Button className="w-full" onClick={handleSubmit}>
                    {t("general.submit")}
                </Button>
            </div>
        </ContainerFull>
    );
};

export default SystemAuth;
