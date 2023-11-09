import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useDocTitle from '../../../hooks/useDocTitle';
import { useFetchWithParams } from '../../../hooks/useFetch';
import { useToast } from '../../../hooks/useToast';
import { Loading } from '../../../layouts/forms/Form';
import { Container, Input, Checkbox, Button } from '../../../layouts/forms/Index';
import { apiClient } from '../../../services/api';
import { useModal } from '../../../hooks/useModal';
import CustomModal from '../../../layouts/modal';
import { t } from 'i18next';

const initialState = {
    name: '',
    active: true
}

const BranchCreate = () => {

    
    const { id } = useParams();
    const title = id ?  t('branch.update.title') : t('branch.add.title')
    useDocTitle(title);
    const [itemModalOpen, setItemModalOpen, toggleModal] = useModal();

    const { data: branches, isLoading } = useFetchWithParams('api/branch/show', {
        params: {
            id: id
        }
    }, id)

    const [ data, setData ] = useState(initialState);
    const navigate = useNavigate();
    const toast = useToast();


    useEffect(() => {
        id && setData(branches)
    },[id, branches])

    const handleChange = (e) => {
        e.preventDefault();        
        const newData ={...data}
        newData[e.target.id] = e.target.value
        setData(newData);
    }

    const handleSubmit = () => {
        id ?
        apiClient.put(`api/branch/${id}`, {
            data: data
        }).then((response) => {
            if (response.data.status === 200) {
                toast('success', t('toast.update.success'));
                navigate(-1)
            } else if (response.data.status === 422) {
                let errorMsg = {}
                errorMsg = response.data.validateErr
                const values = Object.values(errorMsg)
                for (let i = 0; i < values.length; i++) {
                    toast('error', values[i])
                }
            }
        })
        :
        apiClient.post('api/branch', {
            data: data
        }).then((response) => {
            if (response.data.status === 200) {
                toast('success', t('toast.add.success'));
                navigate(-1)
            } else if (response.data.status === 422) {
                let errorMsg = {}
                errorMsg = response.data.validateErr
                const values = Object.values(errorMsg)
                for (let i = 0; i < values.length; i++) {
                    toast('error', values[i])
                }
            }
        })
    }

    return (
        isLoading ? <Loading /> :
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
        title={title}>
            <div className="flex flex-row">
                <Input
                    className='w-32'
                    label={t('branch.add.id')}
                    id='id'
                    value={data.id}
                    onChange={handleChange}
                />
                <Input
                    className='w-full'
                    label={t('branch.add.name')}
                    id='name'
                    value={data.name}
                    onChange={handleChange}
                />
            </div>
            <Checkbox
                label={t('general.active')}
                id='active'
                checked={data.active}
                onChange={() =>
                    setData({ ...data, active: !data.active })
                }
            />
        </Container>
    )
}

export default BranchCreate