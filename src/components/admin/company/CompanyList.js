import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useFetch, useDocTitle } from '../../../hooks/Index';
import { Container, Button } from '../../../layouts/forms/Index';
import { Table } from '../../Table';
import { FiEdit2 } from 'react-icons/fi';

const CompanyList = () => {

    const [ t ] = useTranslation('translations');
    const { data, isLoading, fetchError } = useFetch('api/company/list');
    const navigate = useNavigate();
    const location = useLocation();
    
    const title=t('company.list.title')
    useDocTitle(title)

    const columns = useMemo(
        () => [
            {
                Header:t('company.list.name'),
                accessor:'name'
            },
            {
                Header:t('company.list.address'),
                accessor:'address'
            },
            {
                Header: () => (
                    t('table.edit')
                ),
                accessor: "id",
                disableSortBy: true,
                Filter: false,
                Cell: ({ row }) => (
                    <Link to={`/admin/company/${row.original.id}`}>
                        <FiEdit2 className='transfrom hover:scale-110 hover:fill-green-600' />
                    </Link>
                )
            },
        ]
    )

    return (
        fetchError ? <Navigate to="/500" state={{ from: location }} replace/> :
        <Container title={title} navigation1={<Button onClick={() => navigate('/admin/company/create')}>Tambah</Button>}>
            <Table
                isLoading={isLoading}
                data={data}
                columns={columns}
            />
        </Container>
    )
}

export default CompanyList