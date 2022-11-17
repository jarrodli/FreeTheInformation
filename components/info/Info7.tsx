import React, { FunctionComponent } from 'react'

const Info7: FunctionComponent<{}> = () => {
    return (
        <div className="p-6 space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Some agency's are exempt from requirements under Schedule 2 Part 1 of the <span
                onClick={() =>
                    window.open(
                        'https://www.legislation.gov.au/Latest/C2022C00293'
                    )
                }
                className="transition duration-500 italic text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
            >
                               Freedom of Information Act 1982
                            </span>{' '}
                (Cth)
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                These agencies include:
            </p>
            <div className="px-12">
                <ul className="list-disc">
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Aboriginal Land Councils and Land Trusts
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Auditor-General
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Australian Secret Intelligence Service
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Australian Security Intelligence Organisation
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Australian Signals Directorate
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Inspector-General of Intelligence and Security
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            National Workplace Relations Consultative Council
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Office of National Intelligence
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Parliamentary Budget Office
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Australian Geospatial-Intelligence Organisation
                        </p>
                    </li>
                    <li>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Defence Intelligence Organisation
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Info7
