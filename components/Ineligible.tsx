import React, { FunctionComponent } from "react";
import { textCss } from "../pages/guide/Guide";

interface Props {
    jurisdiction: string;
    pivot: number;
    handleSetEligible: () => void;
}

const Ineligible: FunctionComponent<Props> = ({
    jurisdiction,
    pivot,
    handleSetEligible,
}) => {
    const handlePivot = (ppivot: number) => {
        console.log(ppivot);
        switch (ppivot) {
            case 2:
                return <></>;
            case 3:
                return (
                    <p className="text-xl text-center font-inter">
                        As the information you are requesting is publicly
                        available, try searching for the data from the{" "}
                        {jurisdiction === "CTH" ? "Commonwealth" : jurisdiction}{" "}
                        <span
                            onClick={() =>
                                window.open(
                                    jurisdiction === "CTH"
                                        ? "https://data.gov.au/"
                                        : jurisdiction === "NSW"
                                        ? "https://data.nsw.gov.au"
                                        : "https://data.qld.gov.au"
                                )
                            }
                            className="transition duration-500 text-blue-400 hover:text-white hover:underline hover:decoration-2 hover:decoration-blue-400 hover:cursor-pointer"
                        >
                            Open Data collection
                        </span>
                        .
                    </p>
                );
            case 4:
                return (
                    <p className="text-xl text-center font-inter">
                        Historical information is managed under the{" "}
                        {jurisdiction === "CTH" ? (
                            <span>
                                <span
                                    onClick={() =>
                                        window.open(
                                            "https://www.legislation.gov.au/Latest/C2021C00366"
                                        )
                                    }
                                    className="transition duration-500 italic text-blue-400 hover:text-white hover:underline hover:decoration-2 hover:decoration-blue-400 hover:cursor-pointer"
                                >
                                    Archives Act 1983
                                </span>
                                (Cth)
                            </span>
                        ) : jurisdiction === "NSW" ? (
                            <span>
                                <span
                                    onClick={() =>
                                        window.open(
                                            "https://legislation.nsw.gov.au/view/html/inforce/current/act-1998-017"
                                        )
                                    }
                                    className="transition duration-500 italic text-blue-400 hover:text-white hover:underline hover:decoration-2 hover:decoration-blue-400 hover:cursor-pointer"
                                >
                                    State Records Act 1998 No 17
                                </span>{" "}
                                (NSW)
                            </span>
                        ) : (
                            <span>
                                <span
                                    onClick={() =>
                                        window.open(
                                            "https://www.legislation.qld.gov.au/view/html/inforce/current/act-2002-011"
                                        )
                                    }
                                    className="transition duration-500 italic text-blue-400 hover:text-white hover:underline hover:decoration-2 hover:decoration-blue-400 hover:cursor-pointer"
                                >
                                    Public Records Act 2002
                                </span>
                                (QLD)
                            </span>
                        )}
                        . Visit the{" "}
                        {jurisdiction === "CTH"
                            ? "National Archives of Australia"
                            : jurisdiction === "NSW"
                            ? "New South Wales State Archives"
                            : "Queensland State Archives"}{" "}
                        <span
                            onClick={() =>
                                window.open(
                                    jurisdiction === "CTH"
                                        ? "https://www.naa.gov.au/"
                                        : jurisdiction === "NSW"
                                        ? "https://www.records.nsw.gov.au/"
                                        : "https://www.qld.gov.au/recreation/arts/heritage/archives"
                                )
                            }
                            className="transition duration-500 text-blue-400 hover:text-white hover:underline hover:decoration-2 hover:decoration-blue-400 hover:cursor-pointer"
                        >
                            website
                        </span>{" "}
                        for more information.
                    </p>
                );
            case 5:
                return (
                    <p className="text-xl text-center font-inter">
                        Under{" "}
                        {jurisdiction === "CTH" ? (
                            <span>
                                sections 33-47A of the{" "}
                                <span
                                    onClick={() =>
                                        window.open(
                                            "https://www.legislation.gov.au/Latest/C2022C00293"
                                        )
                                    }
                                    className="transition duration-500 italic text-blue-400 hover:text-white hover:underline hover:decoration-2 hover:decoration-blue-400 hover:cursor-pointer"
                                >
                                    Freedom of Information Act 1982
                                </span>{" "}
                                (Cth)
                            </span>
                        ) : jurisdiction === "NSW" ? (
                            <span>
                                section 11 of the{" "}
                                <span
                                    onClick={() =>
                                        window.open(
                                            "https://legislation.nsw.gov.au/view/html/inforce/current/act-2009-052"
                                        )
                                    }
                                    className="transition duration-500 italic text-blue-400 hover:text-white hover:underline hover:decoration-2 hover:decoration-blue-400 hover:cursor-pointer"
                                >
                                    Government Information (Public Access) Act
                                    2009
                                </span>{" "}
                                (NSW)
                            </span>
                        ) : (
                            <span>
                                section 47(3)(a),(c),(d) of the{" "}
                                <span
                                    onClick={() =>
                                        window.open(
                                            "https://www.legislation.qld.gov.au/view/html/inforce/current/act-2009-013"
                                        )
                                    }
                                    className="transition duration-500 italic text-blue-400 hover:text-white hover:underline hover:decoration-2 hover:decoration-blue-400 hover:cursor-pointer"
                                >
                                    Right to Information Act 2009
                                </span>{" "}
                                (QLD)
                            </span>
                        )}
                        , the agency may refuse to release the documents you
                        wish to request.
                    </p>
                );
            case 6:
                return (
                    <p className="text-xl text-center font-inter">
                        Under{" "}
                        {jurisdiction === "CTH" ? "Commonwealth" : jurisdiction}{" "}
                        <span
                            onClick={() =>
                                window.open(
                                    jurisdiction === "CTH"
                                        ? "https://data.gov.au/"
                                        : jurisdiction === "NSW"
                                        ? "https://data.nsw.gov.au"
                                        : "https://data.qld.gov.au"
                                )
                            }
                            className="transition duration-500 text-blue-400 hover:text-white hover:underline hover:decoration-2 hover:decoration-blue-400 hover:cursor-pointer"
                        >
                            Open Data collection
                        </span>
                        .
                    </p>
                );
            case 7:
                return <></>;
            default:
                return <></>;
        }
    };

    return (
        <div>
            <div className="my-16 flex mx-auto place-content-center">
                <div className="space-x-8 space-y-8 flex flex-col items-center max-w-prose">
                    {handlePivot(pivot - 1)}
                    <button
                        onClick={() => handleSetEligible()}
                        className={`border-2 ${textCss}`}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Ineligible;
