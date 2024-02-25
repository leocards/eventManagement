import { useEffect, useRef, useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/Buttons/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';

export default function ResetPassword({ token = '', email = '' }) {
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)
    const [showpass, setShowpass] = useState(false);
    const [showconfirmpass, setShowConfirmpass] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email??'',
        password: '',
        password_confirmation: '',
    });

    const passwordToText = (element, type = "password") => {
        if (element.type == "password") {
            element.type = "text";
            if(type == 'password')
                setShowpass(true);
            else
                setShowConfirmpass(true)
        } else {
            element.type = "password";
            if(type == 'password')
                setShowpass(false);
            else
                setShowConfirmpass(false)
        }
    };

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'));
    };

    return (
        <div className='h-screen'>
            <Head title="Reset Password" />
            <header className="bg-white shadow-sm p-2.5 sm:px-8 md:px-14">
                <div className="flex">
                    <Link href="/" className="flex">
                        <img src="/storage/logo.png" className="w-12" />
                        <div className="font-gotham text-4xl my-auto ml-2">
                            TAMS
                        </div>
                    </Link>
                </div>
            </header>

            <div className="max-w-xl mx-auto flex flex-col h-[calc(100vh-4.5rem)] pb-14">
                <div className="container p-6 my-auto">
                    <div className="font-gotham mb-7 text-xl text-center">Reset password</div>
                    <form onSubmit={submit}>
                        <div>
                            <div  className={'form-input-float '+(errors.email && "border-pink-600 focus-within:border-pink-600")}>
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full disabled:opacity-50"
                                    autoComplete="username"
                                    onInput={(e) => setData('email', e.target.value)}
                                    readOnly
                                    disabled
                                />
                                <InputLabel htmlFor="email" value="Email" />
                            </div>
                            
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className='text-sm mt-10'>Password must contain:</div>
                        <div className='text-sm pl-3.5'>
                            <div className="list-item">numbers</div>
                            <div className="list-item">at least 8 characters</div>
                            <div className="list-item">at least 1 lowercase and uppercase</div>
                            <div className="list-item">special characters, ex: @!#$</div>
                        </div>

                        <div>
                            <div className={"mt-4 form-input-float flex "+(errors.password && "border-pink-600 focus-within:border-pink-600")}>
                                <TextInput
                                    id="password"
                                    type="password"
                                    ref={passwordRef}
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    isFocused={true}
                                    onInput={(e) => setData('password', e.target.value)}
                                />
                                <InputLabel htmlFor="password" value="Password" className={(errors.password && "!text-pink-600")} />

                                <button
                                    type="button"
                                    onClick={() => passwordToText(passwordRef.current)}
                                    className={"border-l border-gray-300 px-4 bg-gray-100 rounded-r-md hover:bg-gray-200 "+ (errors.password && "border-pink-600 focus-within:border-pink-600")}
                                >
                                    {showpass && <EyeSlashIcon className="w-5 h-5" />}
                                    {!showpass && <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div>
                            <div className={"mt-4 form-input-float flex "+(errors.password_confirmation && "border-pink-600 focus-within:border-pink-600")}>
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    ref={confirmPasswordRef}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="new-password"
                                    onInput={(e) => setData('password_confirmation', e.target.value)}
                                />
                                <InputLabel htmlFor="password_confirmation" value="Confirm Password" className={(errors.password_confirmation && "!text-pink-600")} />

                                <button
                                    type="button"
                                    onClick={() => passwordToText(confirmPasswordRef.current, 'confirm')}
                                    className={"border-l border-gray-300 px-4 bg-gray-100 rounded-r-md hover:bg-gray-200 "+ (errors.password_confirmation && "border-pink-600 focus-within:border-pink-600")}
                                >
                                    {showconfirmpass && <EyeSlashIcon className="w-5 h-5" />}
                                    {!showconfirmpass && <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>
                            <InputError message={errors.password_confirmation} className="mt-2" />
                        </div>

                        <div className="flex items-center justify-end mt-4">
                            <PrimaryButton className="ms-4" disabled={processing}>
                                Reset Password
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}
