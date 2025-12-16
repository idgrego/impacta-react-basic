import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {

}

export default function FormButton(inputProps: Props) {
    return (
        inputProps.type === 'submit'
            ? <button {...inputProps} className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-md transform hover:scale-[1.01] px-5"></button>
            : <button {...inputProps} className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors duration-200 shadow-md px-5"></button>
    );
}

/* 
Essa forma também serve. A forma de cima é um reaproveitamento do que já existe.
A interface InputHTMLAttributes já contém todas as propriedades do INPUT.

====

type Props = {
    placeholder: string,
    type?: string,
}

export default function InputField(props: Props) {
    return (
        <div>
            <input
                type={props.type || 'text'}
                placeholder={props.placeholder}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
} */