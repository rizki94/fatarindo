import React from 'react';
import Images from './Images';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '../layouts/forms/Form';
import Button from '../layouts/forms/Button'

const ModalImage = ({id, parentModalChange}) => {
  return (
    <Modal>
        <ModalHeader>List Lampiran</ModalHeader>
        <ModalBody>
            <Images
                id = {id}
                parentModalChange={parentModalChange} />
        </ModalBody>
        <ModalFooter>
            <Button variant='dangerOutline' onClick={() => parentModalChange()}>Keluar</Button>
        </ModalFooter>
    </Modal>
  )
};

export default ModalImage;
