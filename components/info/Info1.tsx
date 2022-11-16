import React, { FunctionComponent } from "react";

const Info1: FunctionComponent<{}> = () => {
    return (
        <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Selecting the correct jurisdiction is important because it
                determines which law applies to your freedom of information
                request. In each State and Territory, there is an Act that
                governs the steps and details that must be followed.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The legislation that applies in each jurisdiction are:
            </p>
            <div className="px-12">
                <ul className="list-disc">
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Commonwealth &mdash;{" "}
                            <span
                                onClick={() =>
                                    window.open(
                                        "https://www.legislation.gov.au/Latest/C2022C00293"
                                    )
                                }
                                className="transition duration-500 italic text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
                            >
                                Government Freedom of Information Act 1982
                            </span>{" "}
                            (Cth)
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            New South Wales &mdash;{" "}
                            <span
                                onClick={() =>
                                    window.open(
                                        "https://legislation.nsw.gov.au/view/html/inforce/current/act-2009-053"
                                    )
                                }
                                className="transition duration-500 italic text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
                            >
                                Information (Public Access) Act 2009
                            </span>{" "}
                            (NSW)
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Queensland &mdash;{" "}
                            <span
                                onClick={() =>
                                    window.open(
                                        "https://www.legislation.qld.gov.au/view/html/inforce/current/act-2009-013"
                                    )
                                }
                                className="transition duration-500 italic text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
                            >
                                Right to Information Act 2009
                            </span>{" "}
                            (Qld)
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Info1;
