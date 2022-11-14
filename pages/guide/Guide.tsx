import React, { FunctionComponent, useState } from "react";
import Navigator from "./components/shared/Navigator";
import Question from "./components/shared/Question";
import Step1 from "./components/steps/Step1";
import Step2 from "./components/steps/Step2";
import Step3 from "./components/steps/Step3";
import Step4 from "./components/steps/Step4";
import Step5 from "./components/steps/Step5";
import Step6 from "./components/steps/Step6";
import Step7 from "./components/steps/Step7";

export const buttonCss =
    "border-2 py-9 px-9 border-white hover:bg-gray-100 hover:bg-opacity-20 rounded-full bg-no-repeat bg-contain disabled:opacity-50";
export const textCss =
    "text-xl md:text-2xl px-8 p-4 text-white hover:bg-gray-100 hover:text-white hover:bg-opacity-20 font-inter";

interface Props {}

export type State = {
    jurisdiction: string;
    page: number;
    deniedOrDelayed: number;
    publiclyAvailable: number;
    historicInformation: number;
    fullExemptDocument: number;
    conditionallyExemptDocument: number;
    exemptAgency: number;
};

const Questions = [
    "Select the State or Territory holding the information to be requested.",
    "Have you already made an application that has been denied or delayed?",
    "Is the information you are seeking already publicly available?",
    "Are you requesting historic government information?",
    "Are you requesting an exempt document?",
    "Are you requesting a conditionally exempt document?",
    "Are you requesting a document from an exempt agency?",
];

const defaultState = {
    jurisdiction: "",
    page: 1,
    deniedOrDelayed: -1,
    publiclyAvailable: -1,
    historicInformation: -1,
    fullExemptDocument: -1,
    conditionallyExemptDocument: -1,
    exemptAgency: -1,
};

const Guide: FunctionComponent<Props> = ({}) => {
    const [formState, setFormState] = useState<State>(defaultState);

    const handleClearState = () => {
        setFormState(defaultState);
    };

    const handleSetJurisdiction = (newJurisdiction: string) => {
        const stateCpy = { ...formState };
        if (formState.jurisdiction === newJurisdiction) {
            stateCpy.jurisdiction = "";
            setFormState(stateCpy);
        } else {
            stateCpy.jurisdiction = newJurisdiction;
            setFormState(stateCpy);
        }
    };

    const handleSetPage = (newPage: number) => {
        const stateCpy = { ...formState };
        stateCpy.page = newPage;
        setFormState(stateCpy);
    };

    const handleSetDeniedOrDelayed = (newStatus: number) => {
        const stateCpy = { ...formState };
        stateCpy.deniedOrDelayed = newStatus;
        setFormState(stateCpy);
    };

    const handleSetPubliclyAvailable = (newStatus: number) => {
        const stateCpy = { ...formState };
        stateCpy.publiclyAvailable = newStatus;
        setFormState(stateCpy);
    };

    const handleSetHistoricDocument = (newStatus: number) => {
        const stateCpy = { ...formState };
        stateCpy.historicInformation = newStatus;
        setFormState(stateCpy);
    };

    const handleSetFullExemptDocument = (newStatus: number) => {
        const stateCpy = { ...formState };
        stateCpy.fullExemptDocument = newStatus;
        setFormState(stateCpy);
    };

    const handleSetConditionallyExemptDocument = (newStatus: number) => {
        const stateCpy = { ...formState };
        stateCpy.conditionallyExemptDocument = newStatus;
        setFormState(stateCpy);
    };

    const handleSetExemptAgency = (newStatus: number) => {
        const stateCpy = { ...formState };
        stateCpy.exemptAgency = newStatus;
        setFormState(stateCpy);
    };

    return (
        <div className="h-screen flex place-content-center">
            <div className="mx-8 my-48 place-content-center">
                <Question question={Questions[formState.page - 1]} />
                {formState.page === 1 ? (
                    <Step1
                        jurisdiction={formState.jurisdiction}
                        handleSetJurisdiction={handleSetJurisdiction}
                    />
                ) : formState.page === 2 ? (
                    <Step2
                        deniedOrDelayed={formState.deniedOrDelayed}
                        handleSetDeniedOrDelayed={handleSetDeniedOrDelayed}
                    />
                ) : formState.page === 3 ? (
                    <Step3
                        publiclyAvailable={formState.publiclyAvailable}
                        handleSetPubliclyAvailable={handleSetPubliclyAvailable}
                    />
                ) : formState.page === 4 ? (
                    <Step4
                        historicInformation={formState.historicInformation}
                        handleSetHistoricDocument={handleSetHistoricDocument}
                    />
                ) : formState.page === 5 ? (
                    <Step5
                        fullExemptDocument={formState.fullExemptDocument}
                        handleSetFullExemptDocument={
                            handleSetFullExemptDocument
                        }
                    />
                ) : formState.page === 6 ? (
                    <Step6
                        conditionallyExemptDocument={
                            formState.conditionallyExemptDocument
                        }
                        handleSetConditionallyExemptDocument={
                            handleSetConditionallyExemptDocument
                        }
                    />
                ) : formState.page === 7 ? (
                    <Step7
                        exemptAgency={formState.exemptAgency}
                        handleSetExemptAgency={handleSetExemptAgency}
                    />
                ) : null}
                <Navigator
                    formState={formState}
                    handleSetPage={handleSetPage}
                    handleClearState={handleClearState}
                />
            </div>
        </div>
    );
};

export default Guide;
