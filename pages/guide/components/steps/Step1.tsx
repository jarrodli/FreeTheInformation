import React, { FunctionComponent } from "react";
import { textCss } from "../../Guide";

interface Props {
    jurisdiction: string;
    handleSetJurisdiction: (s: string) => void;
}

const Step1: FunctionComponent<Props> = ({
    jurisdiction,
    handleSetJurisdiction,
}) => {
    return (
        <div className="my-16 flex mx-auto place-content-center">
            <div className="space-x-8 space-y-8">
                <button
                    onClick={() => handleSetJurisdiction("NSW")}
                    className={`border-2 ${textCss} ${
                        jurisdiction === "NSW"
                            ? "bg-white text-midnights hover:bg-opacity-70"
                            : null
                    }`}
                >
                    New South Wales
                </button>
                <button
                    onClick={() => handleSetJurisdiction("VIC")}
                    className={`border-2 ${textCss} ${
                        jurisdiction === "VIC"
                            ? "bg-white text-midnights hover:bg-opacity-70"
                            : null
                    }`}
                >
                    Victoria
                </button>
                <button
                    onClick={() => handleSetJurisdiction("QLD")}
                    className={`border-2 ${textCss} ${
                        jurisdiction === "QLD"
                            ? "bg-white text-midnights hover:bg-opacity-70"
                            : null
                    }`}
                >
                    Queensland
                </button>
            </div>
        </div>
    );
};

export default Step1;
