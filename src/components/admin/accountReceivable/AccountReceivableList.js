import React, { useEffect, useMemo, useRef, useState } from "react";
import { useFetch, useFetchWithParams } from "../../../hooks/useFetch";
import { useTranslation } from "react-i18next";
import useDocTitle from "../../../hooks/useDocTitle";
import { Button, Container, Select } from "../../../layouts/forms/Index";
import {
    NumberRangeColumnFilter,
    SelectColumnFilter,
    Table,
} from "../../Table";
import { numberWithComma } from "../../../utils/helpers";
import { apiClient } from "../../../services/api";
import useAuth from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import CustomModal from "../../../layouts/modal";
import { useModal } from "../../../hooks/useModal";
import moment from "moment/moment";
import ButtonBorder from "../../../layouts/forms/ButtonBorder";

const AccountReceivableList = () => {
    const [t] = useTranslation();
    const title = t("sidebar.accountReceivableList");
    useDocTitle(title);
    const { auth } = useAuth();
    const toast = useToast();
    const [skipResetPage, setSkipResetPage] = useState(true);
    const [filter, setFilter] = useState(false);
    const [id, setId] = useState(0);
    const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();
    const [refresh, setRefresh] = useState(false);
    const { data, isLoading } = useFetchWithParams(
        "api/account_receivable/list",
        {
            params: {
                completed: filter,
            },
        },
        filter,
        refresh
    );
    const { data: status } = useFetch("api/status/list");
    const {
        data: account_receivable_date,
        isLoading: accountReceivableLoading,
    } = useFetchWithParams(
        "api/account_receivable_date/list",
        {
            params: {
                id: id,
            },
        },
        id
    );

    const [accountReceivable, setAccountReceivable] = useState([]);

    useEffect(() => {
        setAccountReceivable(
            [...data]
                .map((object) => {
                    const due_date = new Date(object.due_date);
                    const diffTime = due_date - new Date();
                    return {
                        ...object,
                        overdue: Math.ceil(diffTime / (1000 * 60 * 60 * 24)),
                    };
                })
                .sort((a, b) => {
                    return a.overdue - b.overdue;
                })
        );
    }, [data, filter]);

    const updateMyData = (rowIndex, columnId, value) => {
        setAccountReceivable((old) =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    };
                }
                return row;
            })
        );
    };

    const EditableCell = ({
        value: initialValue,
        row,
        column: { id },
        updateMyData,
    }) => {
        const [value, setValue] = useState(initialValue);

        const onBlur = () => {
            setSkipResetPage(true);
            updateMyData(row.index, id, value);
        };

        useEffect(() => {
            setValue(initialValue);
        }, [initialValue]);
        return (
            <Select
                className="w-48"
                size="small"
                data={status}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    apiClient
                        .post("api/account_receivable/update", {
                            data: {
                                ...row.original,
                                status_id: e.target.value,
                                user_id: auth.user.id,
                            },
                        })
                        .then((response) => {
                            if (response.data.status === 200) {
                                toast("success", t("toast.add.success"));
                            }
                        });
                }}
                onBlur={onBlur}
            />
        );
    };

    const dateTime = (value) => {
        const momentDate = moment(value);
        return momentDate.format("YYYY-MM-DD hh:mm:ss");
    };

    const [selected, setSelected] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const columnsAccount = useMemo(() => [
        {
            Header: t("general.date"),
            accessor: (d) => dateTime(d.created_at),
        },
        {
            Header: t("sidebar.users"),
            accessor: (d) => d?.user?.name,
        },
        {
            Header: t("general.status"),
            accessor: (d) => d?.status?.name,
        },
    ]);

    const columns = useMemo(
        () => [
            {
                Header: t("element.invoice"),
                accessor: "invoice",
            },
            {
                Header: t("element.salesman"),
                accessor: (d) => d?.customer?.salesman?.name,
                Filter: SelectColumnFilter,
            },
            {
                Header: t("general.date"),
                accessor: "date",
                Filter: false,
            },
            {
                Header: t("general.dueDate"),
                accessor: "due_date",
                Filter: false,
            },
            {
                Header: t("element.overdue"),
                accessor: "overdue",
                sortType: "basic",
            },
            {
                Header: t("element.outletCode"),
                accessor: "outlet_code",
            },
            {
                Header: t("element.outletName"),
                accessor: (d) => d.customer.name,
            },
            {
                Header: t("element.amount"),
                accessor: "amount",
                Cell: ({ row }) => {
                    return numberWithComma(row.original.amount);
                },
                aggregate: "sum",
                Filter: false,
                Footer: (info) => {
                    const amount = useMemo(
                        () =>
                            data.aggregate
                                ? info.rows.reduce(
                                      (sum, row) =>
                                          parseInt(row.values.amount) + sum,
                                      0
                                  ) / info.rows.length
                                : info.rows.reduce(
                                      (sum, row) =>
                                          parseInt(row.values.amount) + sum,
                                      0
                                  ),
                        [info]
                    );
                    return <div>{numberWithComma(amount, 0)}</div>;
                },
            },
            {
                Header: t("general.status"),
                accessor: "status_id",
                Cell: EditableCell,
                Filter: ({ column: { filterValue, setFilter, id } }) => {
                    return (
                        <select
                            id={id}
                            className="h-6 bg-secondary focus:outline-none transition ease-in-out duration-300 rounded-md border border-gray-200 dark:border-gray-700 ring ring-transparent focus:border-blue-600 focus:ring-blue-400/50"
                            value={filterValue}
                            onChange={(e) => {
                                setSkipResetPage(false);
                                setFilter(e.target.value || undefined);
                            }}
                        >
                            <option value="">Semua</option>
                            {status.map((option, i) => (
                                <option key={i} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    );
                },
            },
        ],
        [t, status]
    );

    const handleClickTable = (data) => {
        setId(data.id);
        toggleModal();
    };

    const [selectedStatus, setSelectedStatus] = useState();

    const handleBatch = () => {
        apiClient
            .post("api/account_receivable/batch_update", {
                id: selected.map((item) => item.id),
                status: selectedStatus,
            })
            .then((res) => {
                if (res.data.status === 200) {
                    toast("success", t("toast.update.success"));
                    setRefresh(!refresh);
                }
            });
        console.log(selectedStatus);
    };

    return (
        <Container
            title={title}
            navigation1={
                <div className="flex flex-row">
                    <ButtonBorder
                        className={`${
                            !filter &&
                            "border-b-4 border-buttonPrimary text-buttonPrimary"
                        }`}
                        onClick={() => setFilter(false)}
                    >
                        Not Complete
                    </ButtonBorder>
                    <ButtonBorder
                        className={`${
                            filter &&
                            "border-b-4 border-buttonPrimary text-buttonPrimary"
                        }`}
                        onClick={() => setFilter(true)}
                    >
                        Complete
                    </ButtonBorder>
                </div>
            }
        >
            <div>
                {selectedRows.length > 0 && (
                    <div className="flex flex-col mb-2">
                        <div className="flex flex-row">
                            <Select
                                data={status}
                                value={selectedStatus}
                                onChange={(e) =>
                                    setSelectedStatus(e.target.value)
                                }
                                defaultOption="Pilih Status"
                            />
                            <Button
                                onClick={handleBatch}
                                disabled={!selectedStatus}
                            >
                                {t("general.save")}
                            </Button>
                        </div>
                        <span className="ml-1">{`${selected.length} faktur dipilih`}</span>
                    </div>
                )}
                <Table
                    data={accountReceivable}
                    columns={columns}
                    isLoading={isLoading}
                    disableFilters={false}
                    disableSortBy={false}
                    pagination
                    autoResetPage={skipResetPage}
                    updateMyData={updateMyData}
                    trOnClick={handleClickTable}
                    trClassName
                    footer
                    onRowSelect={(rows) => setSelected(rows)}
                    onSelectedRowsChange={setSelectedRows}
                    selectedRows={selectedRows}
                    selectRow
                />
            </div>
            {itemModalOpen && (
                <CustomModal
                    title={t("general.changes")}
                    isActive={itemModalOpen}
                    handleClose={() => {
                        setItemModalOpen(false);
                        setId(0);
                    }}
                >
                    <Table
                        data={account_receivable_date}
                        columns={columnsAccount}
                        isLoading={accountReceivableLoading}
                        pagination
                    />
                </CustomModal>
            )}
        </Container>
    );
};

export default AccountReceivableList;
