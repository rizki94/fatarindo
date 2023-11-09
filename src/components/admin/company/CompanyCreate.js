import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDocTitle from "../../../hooks/useDocTitle";
import { useFetchWithParams } from "../../../hooks/useFetch";
import { useToast } from "../../../hooks/useToast";
import { Loading } from "../../../layouts/forms/Form";
import {
    Container,
    Input,
    Checkbox,
    Button,
    TextArea,
} from "../../../layouts/forms/Index";
import { apiClient, url } from "../../../services/api";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../hooks/useModal";
import CustomModal from "../../../layouts/modal";
import { VscTrash, VscAccount } from 'react-icons/vsc'

const initialState = {
    id: "",
    name: "",
    active: true,
};

const CompanyCreate = () => {
    const [t] = useTranslation();
    const { id } = useParams();
    const title = id ? t("company.update.title") : t("company.add.title");
    useDocTitle(title);
    const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();

    const { data: companies, isLoading } = useFetchWithParams(
        "api/company/show",
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

    useEffect(() => {
        id && setData(companies);
    }, [id, companies]);

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
        id
            ? apiClient
                  .post(`api/company/update`, formData)
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
                  .post("api/company/store", formData)
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
                ) : data.logo ? (
                    <>
                        <VscTrash
                            className="absolute w-8 h-8 hover:fill-red-600 cursor-pointer"
                            onClick={() =>
                                setData({ ...data, logo: "" })
                            }
                        />
                        <img
                            src={
                                data.logo &&
                                `${url}/uploads/companyLogo/${data.logo}`
                            }
                            className="w-48 h-48 bg-cover rounded-md"
                        />
                    </>
                ) : (
                    <VscAccount className="w-full h-full object-cover" />
                )}
            </div>
        </div>
            <div className="flex flex-row">
                <Input
                    className="w-32"
                    label={t("company.add.id")}
                    id="id"
                    value={data.id}
                    onChange={handleChange}
                />
                <Input
                    className="w-full"
                    label={t("company.add.name")}
                    id="name"
                    value={data.name}
                    onChange={handleChange}
                />
            </div>
            <TextArea
                label={t("company.add.address")}
                id="address"
                value={data.address}
                onChange={handleChange}
            />
            <div className="flex flex-row">
                <Input
                    type="phone"
                    label={t("company.add.phone")}
                    id="phone"
                    value={data.phone}
                    onChange={handleChange}
                />
                <Input
                    label={t("company.add.email")}
                    type="email"
                    id="email"
                    value={data.email}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-row">
                <Input
                    label={t("company.add.tax_id")}
                    id="tax_id"
                    value={data.tax_id}
                    onChange={handleChange}
                />
                <Input
                    label={t("company.add.tax_name")}
                    id="tax_name"
                    value={data.tax_name}
                    onChange={handleChange}
                />
            </div>
            <TextArea
                label={t("company.add.tax_address")}
                id="tax_address"
                value={data.tax_address}
                onChange={handleChange}
            />
            <Checkbox
                label={t("general.active")}
                id="active"
                checked={data.active}
                onChange={() =>
                    setData({ ...data, active: !data.active })
                }
            />
        </Container>
    );
};

export default CompanyCreate;
