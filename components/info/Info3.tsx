import React, { FunctionComponent } from "react";

const Info3: FunctionComponent<{}> = () => {
    return (
        <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                If the information you are looking for is publicly available,
                then there is no need to file an FOI request!
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                In fact, each jurisdiction can refuse your FOI request if the
                information you are seeking is publicly available.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The sections that apply in each jurisdiction are:
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
                                Freedom of Information Act 1982
                            </span>{" "}
                            (Cth) s 12(1)(c)
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            New South Wales &mdash;{" "}
                            <span
                                onClick={() =>
                                    window.open(
                                        "https://legislation.nsw.gov.au/view/html/inforce/2022-09-05/act-2009-052#sec.59"
                                    )
                                }
                                className="transition duration-500 italic text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
                            >
                                Government Information (Public Access) Act 2009
                            </span>{" "}
                            (NSW) s 59(1)
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Queensland &mdash;{" "}
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
                            (Qld) ss 47(3)(f), 53(a)
                        </p>
                    </li>
                </ul>
            </div>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                To check if your information is publicly available, try the
                following sites:
            </p>
            <div className="px-12">
                <ul className="list-disc">
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <span
                                onClick={() =>
                                    window.open("https://www.data.gov.au")
                                }
                                className="transition duration-500 text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
                            >
                                data.gov.au
                            </span>
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <span
                                onClick={() =>
                                    window.open("https://www.data.nsw.gov.au")
                                }
                                className="transition duration-500 text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
                            >
                                data.nsw.gov.au
                            </span>
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <span
                                onClick={() =>
                                    window.open("https://www.data.qld.gov.au")
                                }
                                className="transition duration-500 text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
                            >
                                data.qld.gov.au
                            </span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Info3;
