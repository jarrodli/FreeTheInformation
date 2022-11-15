import React, { FunctionComponent } from "react";
import { textCss } from "../../Guide";

interface Props {
    deniedOrDelayed: number;
    handleSetDeniedOrDelayed: (n: number) => void;
}

const Step2: FunctionComponent<Props> = ({
    deniedOrDelayed,
    handleSetDeniedOrDelayed,
}) => {
    return (
        <div>
            <div className="my-16 flex mx-auto place-content-center">
                <div className="space-x-8 space-y-8">
                    <button
                        onClick={() => handleSetDeniedOrDelayed(0)}
                        className={`border-2 ${textCss} ${
                            deniedOrDelayed === 0
                                ? "bg-white text-midnights hover:bg-opacity-70"
                                : null
                        }`}
                    >
                        Yes
                    </button>
                    <button
                        onClick={() => handleSetDeniedOrDelayed(1)}
                        className={`border-2 ${textCss} ${
                            deniedOrDelayed === 1
                                ? "bg-white text-midnights hover:bg-opacity-70"
                                : null
                        }`}
                    >
                        No
                    </button>
                    <button
                        onClick={() => handleSetDeniedOrDelayed(2)}
                        className={`border-2 ${textCss} ${
                            deniedOrDelayed === 2
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

export default Step2;