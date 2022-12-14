import React, { FunctionComponent } from "react";

const Info6: FunctionComponent<{}> = () => {
    return (
        <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                If the information you are looking for is conditionally exempt,
                the agency can refuse your request if they decide that
                disclosure of those documents would be against the public
                interest.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The section that applies in the Commonwealth is:
            </p>
            <div className="px-12">
                <ul className="list-disc">
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <span
                                onClick={() =>
                                    window.open(
                                        "https://www.legislation.gov.au/Latest/C2022C00293"
                                    )
                                }
                                className="transition duration-500 italic text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
                            >
                                Freedom of Information Act 1982
                            </span>{" "}
                            (Cth) s 11B
                        </p>
                    </li>
                </ul>
            </div>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Here are some examples of conditionally exempt documents:
            </p>
            <div className="px-12">
                <ul className="list-disc">
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Personal information that would be unreasonable to
                            disclose
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Information about certain operations of the agency
                            (such as an agency???s operations, audit, examination
                            or employee management
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Information about the deliberative processes
                            relating to an agency or minister???s functions
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Information that could damage federal and state
                            government relations
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Information that may damage the Australian economy
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Information about the Australian Government???s
                            financial or property interests
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Info6;
