import React, { FunctionComponent } from "react";
import { textCss } from "../../Guide";

interface Props {
    conditionallyExemptDocument: number;
    handleSetConditionallyExemptDocument: (n: number) => void;
}

const Step6: FunctionComponent<Props> = ({
    conditionallyExemptDocument,
    handleSetConditionallyExemptDocument,
}) => {
    return (
        <div>
            <div className="my-16 flex mx-auto place-content-center">
                <div className="space-x-8 space-y-8">
                    <button
                        onClick={() => handleSetConditionallyExemptDocument(0)}
                        className={`border-2 ${textCss} ${
                            conditionallyExemptDocument === 0
                                ? "bg-white text-midnights hover:bg-opacity-70"
                                : null
                        }`}
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => handleSetConditionallyExemptDocument(1)}
                        className={`border-2 ${textCss} ${
                            conditionallyExemptDocument === 1
                                ? "bg-white text-midnights hover:bg-opacity-70"
                                : null
                        }`}
                    >
                        No
                    </button>
                    <button
                        onClick={() => handleSetConditionallyExemptDocument(2)}
                        className={`border-2 ${textCss} ${
                            conditionallyExemptDocument === 2
                                ? "bg-white text-midnights hover:bg-opacity-70"
                                : null
                        }`}
                    >
                        I'm not sure
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step6;
