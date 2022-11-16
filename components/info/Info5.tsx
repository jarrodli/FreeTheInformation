import React, { FunctionComponent } from 'react'

const Info5: FunctionComponent<{}> = () => {
    return (
        <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                If the information you are looking for falls under an exemption, the agency can refuse your request.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                The sections that apply in each jurisdiction are:
            </p>
            <div className="px-12">
                <ul className="list-disc">
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Commonwealth &mdash;{' '}
                            <span
                                onClick={() =>
                                    window.open(
                                        'https://www.legislation.gov.au/Latest/C2022C00293'
                                    )
                                }
                                className="transition duration-500 italic text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
                            >
                               ss 37-47A Freedom of Information Act 1982
                            </span>{' '}
                            (Cth)
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            New South Wales &mdash;{' '}
                            <span
                                onClick={() =>
                                    window.open(
                                        'https://legislation.nsw.gov.au/view/html/inforce/2022-09-05/act-2009-052#sec.11'
                                    )
                                }
                                className="transition duration-500 italic text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
                            >
                               s 11 Government Information (Public Access) Act 2009
                            </span>{' '}
                            (NSW)
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Queensland &mdash;{' '}
                            <span
                                onClick={() =>
                                    window.open(
                                        'https://www.legislation.qld.gov.au/view/html/inforce/current/act-2009-013#sec.47'
                                    )
                                }
                                className="transition duration-500 italic text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
                            >
                               s 47(3)(a),(c),(d) Right to Information Act 2009
                            </span>{' '}
                            (Qld)
                        </p>
                    </li>
                </ul>
            </div>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Here are some examples of exempt documents:
            </p>
            <div className="px-12">
                <ul className="list-disc">
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            documents that affects national security, defence or international relations
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            documents that affects law enforcement and public safety
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            where the secrecy rules of a law applies (for example, information collected under taxation,
                            child support, gene technology and patent laws)
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            where legal professional privilege applies
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            documents that has material collected in confidence
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            documents whose disclosure would be in contempt of parliament or in contempt of court

                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            documents of the Federal Cabinet
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            documents disclosing trade secrets or commercially valuable information
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            electoral rolls and related documents
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Info5
