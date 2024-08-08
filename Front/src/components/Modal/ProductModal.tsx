import React from 'react'
import { ProductModalProps } from "../../components/@types/types"
import Modal from 'react-modal'

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, closeModal, product }) => {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Product Modal"
            className='modal'
            overlayClassName='overlay'
        >
            <div className='flex justify-end'>
                <button onClick={closeModal} className='text-4xl'>&times;</button>
            </div>
            <div className='flex justify-center'>
                <img src={product?.image} alt={product?.name} className='w-1/2' />
            </div>
            <div className='flex flex-col items-center'>
                <h2 className='text-2xl font-bold'>{product?.name}</h2>
                <p className='text-lg'>{product?.description}</p>
                <p className='text-lg'>Price: ${product?.price}</p>
            </div>

        </Modal>
    )
}

export default ProductModal