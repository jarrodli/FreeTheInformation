import React, { FunctionComponent, useState } from "react";
import Navigator from "./components/shared/Navigator";
import Question from "./components/shared/Question";
import Step1 from "./components/steps/Step1";

export const buttonCss =
    "border-2 py-9 px-9 border-white hover:bg-gray-100 hover:bg-opacity-20 rounded-full bg-no-repeat bg-contain disabled:opacity-50";
export const textCss =
    "text-xl md:text-2xl px-8 border-2 p-4 border-white hover:bg-gray-100 hover:text-white hover:bg-opacity-20 font-inter";

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

    return (
        <div className="h-screen flex place-content-center">
            <div className="mx-8 my-48 place-content-center">
                <Question
                    question={
                        "Select the State or Territory holding the information to be requested."
                    }
                />
                <Step1
                    jurisdiction={jurisdiction}
                    handleSetJurisdiction={handleSetJurisdiction}
                />
                <Navigator page={page} jurisdiction={jurisdiction} />
            </div>
        </div>
    );
};

export default Guide;
