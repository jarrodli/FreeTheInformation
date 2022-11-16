import React, { FunctionComponent } from "react";
import { State } from "../pages/guide/Guide";

interface Props {
    handleSetEligible: () => void;
}

const Ineligible: FunctionComponent<Props> = ({ handleSetEligible }) => {
    return (
        <div>
            <div className="my-16 flex mx-auto place-content-center">
                <div className="space-x-8 space-y-8">
                    <button
                        onClick={() => handleSetEligible()}
                        className="border-2 bg-white text-midnights hover:bg-opacity-70"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Ineligible;
