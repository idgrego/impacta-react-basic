import { Outlet, useNavigate } from "react-router";
import Icon, { IconType } from "./icon";

type Props = {
    title: string,
    children: React.ReactNode,
    onCloseNavTo: string
}
export default function FormFrame(props: Props) {
    const navigate = useNavigate()
    return (
        <div className="flex items-center justify-center p-4">
            <div className="relative w-full max-w-7xl bg-white p-8 rounded-xl shadow-xl space-y-6 border border-gray-200">
                <button
                    type="button"
                    onClick={
                        () => {
                            if (props.onCloseNavTo)
                                navigate(props.onCloseNavTo)
                        }
                    }
                    className="icon-button absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Cancel and go back"
                >
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg> */}
                    <Icon type={IconType.Close}></Icon>
                </button>
                <h1 className="text-3xl font-extrabold text-gray-900 text-center border-b pb-4">
                    {props?.title || 'Missing Form Title'}
                </h1>

                {props.children}
            </div>
        </div>
    );
}