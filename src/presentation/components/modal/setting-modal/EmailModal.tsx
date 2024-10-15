import { useState } from 'react';
import './SettingModal.css';
import { ModalProps } from '../types';
// import api from '../../../../services/api';

const EmailModal = ({ isShow, onClose, onSubmit }: ModalProps) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
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
        <div className="email-modal">
            <div className='modal-bg' onClick={onClose} />
            <div className='modal-container'>
                <div className='modal-header'>
                    <h1>Change Email</h1>
                </div>
                <div className='modal-content'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">New Email:</label>
                        <input type="email" id="email" name="email" required />
                        <div className='modal-footer'>
                            <button type="submit" className='submit-button' disabled={loading}>
                                {loading ? 'Loading...' : 'Submit'}
                            </button>
                            <button type="button" className='cancel-button' onClick={onClose} disabled={loading}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EmailModal;