import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';

export default function Modal({ children, show = false, maxWidth = '2xl', closeable = true, isOverFlow = false, position = 'center', backdrop = true, onClose = () => {} }) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const modalPosition = {
        'top': 'mt-0',
        'top-left': 'sm:!ml-4 sm:!mx-0',
        'top-right': 'sm:!mr-4 sm:!ml-auto sm:!mx-0',
    }[position]

    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
        '3xl': 'sm:max-w-3xl',
        '4xl': 'sm:max-w-4xl',
        '5xl': 'sm:max-w-5xl',
        '6xl': 'sm:max-w-6xl',
        '7xl': 'sm:max-w-7xl',
    }[maxWidth];

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className={`${position === 'center'?'items-center justify-center flex':''} fixed inset-0 overflow-y-auto px-4 py-6 z-50 transform transition-all print:hidden`}
                onClose={close}
            >
                {backdrop && <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
                </Transition.Child>}

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <Dialog.Panel
                        className={`mb-6 bg-white rounded-lg shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass} ${!isOverFlow&&"overflow-hidden"} ${modalPosition} 
                        ${!backdrop?'border':''}`}
                    >
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
}

export const ModalHeader = ({ label, children, showCloseButton = true, labelClassName = '', onClose }) => {
    return (
        <div className="text-lg font-semibold flex items-center uppercase mb-5 pr-1">
            <div className={labelClassName}>{label||children}</div>
            {showCloseButton&&<button
                onClick={onClose}
                className="p-2 ml-auto hover:bg-gray-100 rounded-full transition duration-150"
            >
                <XMarkIcon className="w-5 h-5" />
            </button>}
        </div>
    )
}