import { useRouter } from "next/router";
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
        const router = useRouter();
        switch (ppivot) {
            case 2:
                return (
                    <p className="text-xl text-center font-inter">
                        {jurisdiction === "NSW" ? (
                            <span>
                                If it has been less than 40 days since you were
                                notified that your request was denied, you may
                                request: (1) an internal review by the agency
                                (if it is been less than 20 days since you were
                                notified); (2) an external review by the{" "}
                                <span
                                    onClick={() => router.push("/nsw/review")}
                                    className="transition duration-500 italic text-blue-400 hover:text-white hover:underline hover:decoration-2 hover:decoration-blue-400 hover:cursor-pointer"
                                >
                                    New South Wales Information Commissioner
                                </span>
                                ; or (3) an external review by the{" "}
                                <span
                                    onClick={() =>
                                        window.open(
                                            "https://online.ncat.nsw.gov.au/Application/Notice.aspx?other=1"
                                        )
                                    }
                                    className="transition duration-500 italic text-blue-400 hover:text-white hover:underline hover:decoration-2 hover:decoration-blue-400 hover:cursor-pointer"
                                >
                                    NSW Civil and Administrative Tribunal
                                </span>
                            </span>
                        ) : jurisdiction === "CTH" ? (
                            <span>
                                If it has been less than 30 calendar days since
                                you were notified that your request was denied,
                                you may request: (1) an internal review by the
                                agency; (2) an external review by the{" "}
                                <span
                                    onClick={() => router.push("/cth/review")}
                                    className="transition duration-500 italic text-blue-400 hover:text-white hover:underline hover:decoration-2 hover:decoration-blue-400 hover:cursor-pointer"
                                >
                                    Office of the Information Comissioner
                                </span>
                                ; or (3) an external review by the{" "}
                                <span
                                    onClick={() =>
                                        window.open(
                                            "https://www.aat.gov.au/apply-for-a-review/freedom-of-information-foi/how-to-apply"
                                        )
                                    }
                                    className="transition duration-500 italic text-blue-400 hover:text-white hover:underline hover:decoration-2 hover:decoration-blue-400 hover:cursor-pointer"
                                >
                                    Administrative Appeals Tribunal
                                </span>
                            </span>
                        ) : (
                            <span>
                                If it has been less than 20 business days since
                                you were notified that your request was denied,
                                you may request: (1) an internal review by the
                                agency; (2) an external review by the{" "}
                                <span
                                    onClick={() => router.push("/qld/review")}
                                    className="transition duration-500 italic text-blue-400 hover:text-white hover:underline hover:decoration-2 hover:decoration-blue-400 hover:cursor-pointer"
                                >
                                    Queensland Information Commissioner
                                </span>
                                ; or (3) an external review by the{" "}
                                <span
                                    onClick={() =>
                                        window.open(
                                            "https://www.qcat.qld.gov.au/__data/assets/pdf_file/0008/101006/form-23-app-review-decision.pdf"
                                        )
                                    }
                                    className="transition duration-500 italic text-blue-400 hover:text-white hover:underline hover:decoration-2 hover:decoration-blue-400 hover:cursor-pointer"
                                >
                                    Queensland Civil and Administrative Tribunal
                                </span>
                            </span>
                        )}
                        .
                    </p>
                );
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
                                </span>{" "}
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
                                </span>{" "}
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
                                sections 11A(4) and 33-47A of the{" "}
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
                                            "https://legislation.nsw.gov.au/view/html/inforce/2022-09-05/act-2009-052#sec.11"
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
                                            "https://www.legislation.qld.gov.au/view/html/inforce/current/act-2009-013#sec.47"
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
            case 7:
                return (
                    <div className="space-y-8">
                        <p className="text-xl text-center font-inter">
                            Under{" "}
                            <span>
                                sections 11A(5) and 47B-47J of the{" "}
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
                                (Cth), access to the document you are requesting
                                is mandatory unless it would be contrary to the
                                public interest as defined under section 11B of
                                the Act.
                            </span>
                        </p>
                        <p className="text-xl text-center font-inter">
                            If you wish to continue, select{" "}
                            <span className="italic">
                                Continue to FOI request form anyway
                            </span>
                            .
                        </p>
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-8">
                        <p className="text-xl text-center font-inter">
                            Under{" "}
                            <span>
                                sections 7 and 11(4) of the{" "}
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
                                (Cth), the agency may refuse to release the
                                documents you wish to request.
                            </span>
                        </p>
                    </div>
                );
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
