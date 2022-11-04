import React, { FunctionComponent, useState } from "react";

interface Props {}

const Guide: FunctionComponent<Props> = ({}) => {
    const [jurisdiction, setJurisdiction] = useState("");
    const [page, setPage] = useState(1);

    const handleSetJurisdiction = (newJurisdiction: string) => {
        if (jurisdiction === newJurisdiction) {
            setJurisdiction("");
        } else {
            setJurisdiction(newJurisdiction);
        }
    };

    const buttonCss =
        "border-2 py-9 px-9 border-white hover:bg-gray-100 hover:bg-opacity-20 rounded-full bg-no-repeat bg-contain disabled:opacity-50";
    const textCss =
        "text-xl md:text-2xl px-8 border-2 p-4 border-white hover:bg-gray-100 hover:text-white hover:bg-opacity-20 font-inter";

    return (
        <div className="h-screen flex place-content-center">
            <div className="mx-8 my-48 place-content-center">
                <p className="text-3xl md:text-4xl text-center font-bold font-inter">
                    {" "}
                    Select the State or Territory holding the information to be
                    requested.{" "}
                </p>
                <div className="my-16 flex mx-auto place-content-center">
                    <div className="space-x-8 space-y-8">
                        <button
                            onClick={() => handleSetJurisdiction("NSW")}
                            className={`${textCss} ${
                                jurisdiction === "NSW"
                                    ? "bg-white text-midnights hover:bg-opacity-70"
                                    : null
                            }`}
                        >
                            New South Wales
                        </button>
                        <button
                            onClick={() => handleSetJurisdiction("VIC")}
                            className={`${textCss} ${
                                jurisdiction === "VIC"
                                    ? "bg-white text-midnights hover:bg-opacity-70"
                                    : null
                            }`}
                        >
                            Victoria
                        </button>
                        <button
                            onClick={() => handleSetJurisdiction("QLD")}
                            className={`${textCss} ${
                                jurisdiction === "QLD"
                                    ? "bg-white text-midnights hover:bg-opacity-70"
                                    : null
                            }`}
                        >
                            Queensland
                        </button>
                    </div>
                </div>
                <div className="my-24 space-x-16 flex place-content-center">
                    <button
                        disabled={page === 1}
                        className={`${buttonCss} bg-arrowLeft`}
                    />
                    <button className={textCss}>Restart</button>
                    <button
                        disabled={!jurisdiction}
                        className={`${buttonCss} bg-arrowRight`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Guide;
