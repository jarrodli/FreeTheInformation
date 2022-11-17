import React, { FunctionComponent } from "react";

const Info2: FunctionComponent<{}> = () => {
    return (
        <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                It is important to know whether you are eligible to file a
                request to review your Freedom of Information application.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Each jurisdiction has a different time frame within which the
                agency must process your request. If they have exceeded that
                time frame, you may be eligible to file a review.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The time frames that apply in each jurisdiction are:
            </p>
            <div className="px-12">
                <ul className="list-disc space-y-2">
                    <li className="space-y-2">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Commonwealth &mdash; <b>30 days</b>
                        </p>
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
                            (Cth) s 15(5){" "}
                        </p>
                    </li>
                    <li className="space-y-2">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            New South Wales &mdash; <b>20 working days</b>
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <span
                                onClick={() =>
                                    window.open(
                                        "https://legislation.nsw.gov.au/view/html/inforce/2022-09-05/act-2009-052#sec.57"
                                    )
                                }
                                className="transition duration-500 italic text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
                            >
                                Government Information (Public Access) Act 2009
                            </span>{" "}
                            (NSW) s 57(1)
                        </p>
                    </li>
                    <li className="space-y-2">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Queensland &mdash; <b>25 business days</b>
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <span
                                onClick={() =>
                                    window.open(
                                        "https://www.legislation.qld.gov.au/view/html/inforce/current/act-2009-013#sec.18"
                                    )
                                }
                                className="transition duration-500 italic text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
                            >
                                Right to Information Act 2009
                            </span>{" "}
                            (Qld) s 18
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Info2;
