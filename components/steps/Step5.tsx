import React, { FunctionComponent } from "react";
import { textCss } from "../../pages/guide/Guide";
interface Props {
    fullExemptDocument: number;
    handleSetFullExemptDocument: (n: number) => void;
}

const Step5: FunctionComponent<Props> = ({
    fullExemptDocument,
    handleSetFullExemptDocument,
}) => {
    return (
        <div>
            <div className="my-16 flex mx-auto place-content-center">
                <div className="space-x-8 space-y-8">
                    <button
                        onClick={() => handleSetFullExemptDocument(0)}
                        className={`border-2 ${textCss} ${
                            fullExemptDocument === 0
                                ? "bg-white text-midnights hover:bg-opacity-70"
                                : null
                        }`}
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => handleSetFullExemptDocument(1)}
                        className={`border-2 ${textCss} ${
                            fullExemptDocument === 1
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

export default Step5;
