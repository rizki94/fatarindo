import { useState } from 'react';
import Images from "./Images";
import { Label, Modal, ModalBody, ModalFooter, ModalHeader, ButtonGroup } from '../layouts/forms/Form';
import Button from '../layouts/forms/Button'
import { apiClient } from '../services/api';

const ImageUpload = ({id, parentModalChange}) => {

    const [ image, setImage ] = useState('');
    const [ message, setMessage ] = useState({
        status: "",
        message: "",
        error: ""
    });
    const [ validateMsg, setValidateMsg] = useState('');
    const [ isValid, setIsValid ] = useState(true);
    const [ buttonLoading, setButtonLoading ] = useState(false);

    const handleChange = (e) => {
        const imagesArray = [];

        for (let i = 0; i < e.target.files.length; i++) {
            setIsValid(fileValidate(e.target.files[i]));
            imagesArray.push(e.target.files[i]);
        }
        setImage(imagesArray)
        setMessage('');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setButtonLoading(true);
        const data = new FormData();
        for (let i = 0; i < image.length; i++) {
            data.append("images[]", image[i]);
            data.append('unique_id', id);
        }
        await apiClient.post('api/image', data)
        .then((response) => {
            if (response.data.status === 200) {
                setMessage({
                    message: response.data.message,
                    status: response.data.status,
                    erorr: response.data.erorr,
                })
                setImage('');
                setButtonLoading(false);
                document.querySelector("#imageForm").reset();
            } else {                
                setMessage({
                    message: response.data.message,
                    status: response.data.status,
                    erorr: response.data.erorr,
                })
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const fileValidate = (file) => {
        if ((
            file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
            file.type === "application/msword" ||
            file.type === "application/vnd.ms-excel" ||
            file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            file.type === "application/pdf" ||
            file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.type === "image/jpeg"
        ) &&
            (file.size <= 10000000)
        ) {
            setValidateMsg('');
            return true;
        } else {
            file.size >= 10000000 ? setValidateMsg('Ukuran max 10 MB') : setValidateMsg('File tidak valid')
        return false;
        }
    };

    return (
        <Modal>
            <ModalHeader>
                Upload Lampiran
            </ModalHeader>
            <ModalBody>
                <div className='mb-2'>
                    { message.status === 200 && <span className='bg-green-400 text-green-700 px-4 py-2 rounded'>{message.message}</span> }
                    { message.status === 422 && <span className='bg-red-400 text-red-700 px-4 py-2 rounded'>{message.message}</span>}
                </div>
                <form onSubmit={submitHandler} encType="multipart/form-data" id="imageForm">
                    <Label>Lampiran File</Label>
                    <input type="file" name="image" multiple onChange={handleChange} className='w-full file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-500 file:text-white
                        hover:file:bg-blue-800' />
                    { !isValid && <span className="text-red-600">{validateMsg}</span> }
                </form>
                <Images 
                    id={id}
                    submitHandler={submitHandler}
                    parentModalChange={parentModalChange}
                />
            </ModalBody>
            <ModalFooter>
                <ButtonGroup>
                    <Button className='mx-2' variant='dangerOutline' onClick={() => parentModalChange()}>Keluar</Button>
                    <Button 
                        form="imageForm" 
                        disabled={image.length === 0 || !isValid} 
                        onClick={submitHandler}
                        buttonLoading={buttonLoading}>Submit</Button>
                </ButtonGroup>
            </ModalFooter>
        </Modal>
    )
};

export default ImageUpload;