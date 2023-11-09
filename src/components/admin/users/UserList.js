import { useTranslation } from "react-i18next";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useDocTitle from "../../../hooks/useDocTitle";
import { useFetch } from "../../../hooks/useFetch";
import { Container, Button } from "../../../layouts/forms/Index";
import { Table } from "../../Table";

const UserList = () => {

    const [ t ] = useTranslation();
    const title = t('users.list.title')
    useDocTitle(title);
    const navigate = useNavigate();
    const { data, isLoading } = useFetch("api/users");

    const columns = useMemo(() => [
        {
            Header: t('table.name'),
            accessor: "name",
        },
        {
            accessor: "id",
            Cell: ({ row }) => (
                <div className="flex flex-row">
                    <Button
                        onClick={() =>
                            navigate(`/admin/user/${row.original.id}`)
                        }
                        size="extraSmall"
                    >
                        {t('general.edit')}
                    </Button>
                    <Button
                        onClick={() =>
                            navigate(`/admin/user/profile/${row.original.id}`)
                        }
                        size="extraSmall"
                    >
                        {t('users.profile.title')}
                    </Button>
                    <Button
                        onClick={() =>
                            navigate(`/admin/user/roles/${row.original.id}`)
                        }
                        size="extraSmall"
                    >
                    {t('users.permissions.title')}
                    </Button>
                </div>
            ),
        },
    ]);
    return (
        <Container
            title={title}
            navigation1={
                <Button onClick={() => navigate("/admin/user/create")}>
                    {t('general.add')}
                </Button>
            }
        >
            <Table data={data} columns={columns} isLoading={isLoading} />
        </Container>
    );
};

export default UserList;
