import { useEffect, useState } from 'react';
import './RegisterModal.css';

import axios from 'axios';

interface ModalProps {
    isShow: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

const RegisterModal: React.FC<ModalProps> = ({ isShow, onClose, onSubmit }) => {
    const [showSignIn, setShowSignIn] = useState(true);
    const [showRegisterForm, setShowRegisterForm] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignInClickable, setIsSignInClickable] = useState(false);
    const [isCreateAccountClickable, setIsCreateAccountClickable] = useState(false);

    useEffect(() => {
        setIsSignInClickable(email !== '' && password !== '');
    }, [email, password]);

    useEffect(() => {
        setIsCreateAccountClickable(email !== '' && password !== '' && username !== '');
    }, [email, password, username]);

    const handleSignInSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const email = (e.target as any).signin_email.value;
        const password = (e.target as any).signin_password.value;

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            if (response.data.success) {
                setShowRegisterForm(false);
                onSubmit(e);
            } else {
                setError(response.data.message || "Failed to sign in");
            }

        } catch (error: any) {
            setError(error.response.data.message || "Failed to sign in");
        } finally {
            setLoading(false);
        }
    }

    const handleCreateAccountSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const email = (e.target as any).create_email.value;
        const username = (e.target as any).create_username.value;
        const password = (e.target as any).create_password.value;

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                email,
                username,
                password
            });

            if (response.data.success) {
                onSubmit(e);
            } else {
                setError(response.data.message || "Failed to create account");
            }
        } catch (error: any) {
            setError(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    const handleCreateAccountInfoClick = () => {
        setShowSignIn(false);
    }

    const handleSignInInfoClick = () => {
        setShowSignIn(true);
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    if (!isShow) {
        return null;
    }

    return (
        <div className="register-modal">
            <div className='modal-bg' onClick={onClose} />
            <div className='modal-container'>
                {showRegisterForm && showSignIn ? (
                    <section className='show-signin'>
                        <div className='signin-container'>
                            <h2>Sign In</h2>
                            <form onSubmit={handleSignInSubmit} className='signin-form'>
                                <div className={`signin-form-email ${email ? 'has-value' : ''}`}>
                                    <label htmlFor="signin_email">Email</label>
                                    <input type="email" id="signin_email" placeholder='Email' value={email} onChange={handleEmailChange} />
                                </div>
                                <div className={`signin-form-password ${password ? 'has-value' : ''}`}>
                                    <label htmlFor="signin_password">Password</label>
                                    <input type="password" id="signin_password" placeholder='Password' value={password} onChange={handlePasswordChange} />
                                </div>
                                <button className='reset-password'>Reset password</button>
                                <button className={`submit-button ${isSignInClickable ? 'clickable' : ''} `} type='submit'>Sign In</button>
                            </form>
                            <div className='signin-description'>
                                <p className='term'>By continuing, you agree to the <a href='/'>Terms of use</a> and <a href='/'>Privacy Policy.</a>
                                </p>
                            </div>
                        </div>
                        <div className='modal-devider' />
                        <div className='create-acc-info-container'>
                            <div className='create-acc-info-header'>
                                <h2>Create an account</h2>
                                <p>Get started now</p>
                            </div>
                            <div className='create-acc-info-content'>
                                <ul>
                                    <li><p>Create your own community and post</p></li>
                                    <li><p>Discover unique experiences</p></li>
                                    <li><p>Share your story</p></li>
                                    <li><p>Join our community</p></li>
                                    <li><p>Create an account for free</p></li>
                                </ul>
                            </div>
                            <button className='submit-button clickable' onClick={handleCreateAccountInfoClick}>Create an account</button>
                        </div>
                    </section>
                ) : (
                    <section className='show-create-acc'>
                        <div className='signin-info-container'>
                            <div className='signin-info-header'>
                                <h2>Sign In</h2>
                                <p>Get started now</p>
                            </div>
                            <button className='submit-button clickable' onClick={handleSignInInfoClick} >Already have an account?</button>
                        </div>
                        <div className='modal-devider' />
                        <div className='create-acc-container'>
                            <h2>Create an account</h2>
                            <form onSubmit={handleCreateAccountSubmit} className='create-acc-form'>
                                <div className={`create-acc-form-email ${email ? 'has-value' : ''}`}>
                                    <label htmlFor="create_email">Email</label>
                                    <input type="email" id="create_email" placeholder='Email' value={email} onChange={handleEmailChange} />
                                </div>
                                <div className={`create-acc-form-username ${username ? 'has-value' : ''}`}>
                                    <label htmlFor="create_username">Username</label>
                                    <input type="text" id="create_username" placeholder='Username' value={username} onChange={handleUsernameChange} />
                                </div>
                                <div className={`create-acc-form-password ${password ? 'has-value' : ''}`}>
                                    <label htmlFor="create_password">Password</label>
                                    <input type="password" id="create_password" placeholder='Password' value={password} onChange={handlePasswordChange} />
                                </div>
                                <p className='password-exception'>Use 8 or more characters with a mix of letters, numbers & symbols</p>
                                <p className='term'>By continuing, you agree to the <a href='/'>Terms of use</a> and <a href='/'>Privacy Policy.</a>
                                </p>
                                <button className={`submit-button ${isCreateAccountClickable ? 'clickable' : ''}`} type='submit'>Create an account</button>
                            </form>
                            {loading && <p className='loading'>Loading...</p>}
                            {error && <p className='error'>{error}</p>}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default RegisterModal;