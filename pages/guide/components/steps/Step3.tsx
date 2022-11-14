import React, { FunctionComponent } from "react";
import { State, textCss } from "../../Guide";

interface Props {
    publiclyAvailable: number;
    handleSetPubliclyAvailable: (n: number) => void;
}

const Step3: FunctionComponent<Props> = ({
    publiclyAvailable,
    handleSetPubliclyAvailable,
}) => {
    return (
        <div>
            <div className="my-16 flex mx-auto place-content-center">
                <div className="space-x-8 space-y-8">
                    <button
                        onClick={() => handleSetPubliclyAvailable(0)}
                        className={`border-2 ${textCss} ${
                            publiclyAvailable === 0
                                ? "bg-white text-midnights hover:bg-opacity-70"
                                : null
                        }`}
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => handleSetPubliclyAvailable(1)}
                        className={`border-2 ${textCss} ${
                            publiclyAvailable === 1
                                ? "bg-white text-midnights hover:bg-opacity-70"
                                : null
                        }`}
                    >
                        No
                    </button>
                    <button
                        onClick={() => handleSetPubliclyAvailable(2)}
                        className={`border-2 ${textCss} ${
                            publiclyAvailable === 2
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

export default Step3;
