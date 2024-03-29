export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-sm text-pink-700 ' + className}>
            {message}
        </p>
    ) : null;
}
