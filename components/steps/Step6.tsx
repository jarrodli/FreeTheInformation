import React, { FunctionComponent } from "react";
import { textCss } from "../../pages/guide/Guide";

interface Props {
    exemptAgency: number;
    handleSetExemptAgency: (n: number) => void;
}

const Step6: FunctionComponent<Props> = ({
    exemptAgency,
    handleSetExemptAgency,
}) => {
    return (
        <div>
            <div className="my-16 flex mx-auto place-content-center">
                <div className="space-x-8 space-y-8">
                    <button
                        onClick={() => handleSetExemptAgency(0)}
                        className={`border-2 ${textCss} ${
                            exemptAgency === 0
                                ? "bg-white text-midnights hover:bg-opacity-70"
                                : null
                        }`}
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => handleSetExemptAgency(1)}
                        className={`border-2 ${textCss} ${
                            exemptAgency === 1
                                ? "bg-white text-midnights hover:bg-opacity-70"
                                : null
                        }`}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step6;
