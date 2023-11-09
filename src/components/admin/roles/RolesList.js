import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import Button from "../../../layouts/forms/Button";
import { Container } from "../../../layouts/forms/Container";
import { Table, StatusColumnFilter } from "../../Table";
import { FiEdit2 } from "react-icons/fi";

const RolesList = () => {
    const [t] = useTranslation("translations");
    const { data, isLoading, fetchError } = useFetch("api/roles");
    const navigate = useNavigate();

    const title = t("roles.list.title");

    const columns = useMemo(() => [
        {
            Header: t("table.name"),
            accessor: "name",
        },
        {
            Header: t("table.active"),
            accessor: "active",
            Filter: StatusColumnFilter,
            Cell: ({ row }) => (
                <span
                    className={
                        row.original.active === 1
                            ? "bg-green-200 text-green-600 py-1 px-3 rounded-md text-xs"
                            : "bg-red-200 text-red-600 py-1 px-3 rounded-md text-xs"
                    }
                >
                    {row.original.active ? "Aktif" : "Nonaktif"}
                </span>
            ),
        },
        {
            Header: () => t("table.edit"),
            accessor: "id",
            disableSortBy: true,
            Filter: false,
            Cell: ({ row }) => (
                <Link to={`/admin/role/${row.original.id}`}>
                    <FiEdit2 className="transfrom hover:scale-110 hover:fill-green-600" />
                </Link>
            ),
        },
    ]);

    return fetchError ? (
        <Navigate to="/500" />
    ) : (
        <Container
            title={title}
            navigation1={
                <Button onClick={() => navigate("/admin/rolecreate")}>
                    {t("general.add")}
                </Button>
            }
        >
            <Table isLoading={isLoading} data={data} columns={columns} />
        </Container>
    );
};

export default RolesList;
