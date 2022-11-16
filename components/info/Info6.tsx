import React, { FunctionComponent } from 'react'

const Info6: FunctionComponent<{}> = () => {
    return (
        <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                If the information you are looking for is conditionally exempt, the agency can refuse your request if
                they decide that disclosure of those documents would be against the public interest.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The sections that apply in each the Commonwealth are:
            </p>
            <div className="px-12">
                <ul className="list-disc">
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            <span
                                onClick={() =>
                                    window.open(
                                        'https://www.legislation.gov.au/Latest/C2022C00293'
                                    )
                                }
                                className="transition duration-500 italic text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
                            >
                               s 11B Freedom of Information Act 1982
                            </span>{' '}
                            (Cth)
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
                            personal information that would be unreasonable to disclose
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            information about certain operations of the agency (such as an agency’s operations, audit, examination or employee management
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            information about the deliberative processes relating to an agency or minister’s functions
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            information that could damage federal and state government relations
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            information that may damage the Australian economy
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            information about the Australian Government’s financial or property interests
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Info6
