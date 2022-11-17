import React, { FunctionComponent } from "react";
import Info1 from "./info/Info1";
import Info2 from "./info/Info2";
import Info3 from "./info/Info3";
import Info4 from "./info/Info4";
import Info5 from "./info/Info5";
import Info6 from "./info/Info6";
import Info7 from "./info/Info7";

interface Props {
    page: number;
    modalOpen: boolean;
    handleModalClose: () => void;
}

const InfoPages = [
    <Info1 />,
    <Info2 />,
    <Info3 />,
    <Info4 />,
    <Info5 />,
    <Info6 />,
    <Info7 />,
];

const Modal: FunctionComponent<Props> = ({
    page,
    modalOpen,
    handleModalClose,
}) => {
    return (
        <div
            id="defaultModal"
            className={`z-50 ${
                modalOpen ? "" : "hidden"
            } flex items-center justify-center h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 md:h-full`}
        >
            <div className="relative w-full max-w-2xl h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            What does this question mean?
                        </h3>
                        <button
                            onClick={() => handleModalClose()}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {InfoPages[page - 1]}
                    <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600 flex-row-reverse">
                        <button
                            onClick={() => handleModalClose()}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
