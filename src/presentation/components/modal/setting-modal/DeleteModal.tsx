import { useEffect, useState } from 'react';
import './SettingModal.css';
import { ModalProps } from '../types';
// import api from '../../../../services/api';

const DeleteModal = ({ isShow, onClose, onSubmit }: ModalProps) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(e);
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    if (!isShow) {
        return null;
    }

    return (
        <div className="delete-modal">
            <div className='modal-bg' onClick={onClose} />
            <div className='modal-container'>
                <div className='modal-header'>
                    <h1>Delete Account</h1>
                </div>
                <div className='modal-content'>
                    <p>Are you sure you want to delete your account?</p>
                </div>
                <div className='modal-footer'>
                    <button className='delete-button' onClick={handleDelete} disabled={loading}>
                        {loading ? 'Loading...' : 'Delete'}
                    </button>
                    <button className='cancel-button' onClick={onClose} disabled={loading}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;