import React, { FunctionComponent } from "react";
import { textCss } from "../../pages/guide/Guide";
interface Props {
    historicInformation: number;
    handleSetHistoricDocument: (n: number) => void;
}

const Step4: FunctionComponent<Props> = ({
    historicInformation,
    handleSetHistoricDocument,
}) => {
    return (
        <div>
            <div className="my-16 flex mx-auto place-content-center">
                <div className="space-x-8 space-y-8">
                    <button
                        onClick={() => handleSetHistoricDocument(0)}
                        className={`border-2 ${textCss} ${
                            historicInformation === 0
                                ? "bg-white text-midnights hover:bg-opacity-70"
                                : null
                        }`}
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => handleSetHistoricDocument(1)}
                        className={`border-2 ${textCss} ${
                            historicInformation === 1
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

export default Step4;
