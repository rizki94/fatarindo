import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useFetch } from "../../../hooks/useFetch";
import Button from "../../../layouts/forms/Button";
import { Container } from "../../../layouts/forms/Container";
import { Table } from "../../Table";
import { VscEdit } from "react-icons/vsc";

const BranchList = () => {
    const [t] = useTranslation("translations");
    const { data, isLoading, fetchError } = useFetch("api/branches");
    const navigate = useNavigate();

    const title = t("branch.list.title");

    const columns = useMemo(() => [
        {
            Header: t("branch.list.name"),
            accessor: "name",
        },
        {
            Header: () => t("table.edit"),
            accessor: "id",
            disableSortBy: true,
            Filter: false,
            Cell: ({ row }) => (
                <Link to={`/admin/branch/${row.original.id}`}>
                    <VscEdit className="w-5 h-5 cursor-pointer hover:fill-green-600 hover:scale-125" />
                </Link>
            ),
        },
    ]);

    return fetchError ? (
        <Navigate to="/500" />
    ) : (
        <Container
            navigation1={
                <Button onClick={() => navigate("/admin/branchcreate")}>
                    {t("general.add")}
                </Button>
            }
            title={title}
        >
            <Table isLoading={isLoading} data={data} columns={columns} />
        </Container>
    );
};

export default BranchList;
