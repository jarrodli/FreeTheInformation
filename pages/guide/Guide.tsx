import React, { FunctionComponent, use, useEffect, useState } from "react";
import Ineligible from "../../components/Ineligible";
import Info1 from "../../components/info/Info1";
import Modal from "../../components/Modal";
import Navigator from "../../components/shared/Navigator";
import Question from "../../components/shared/Question";
import Step1 from "../../components/steps/Step1";
import Step2 from "../../components/steps/Step2";
import Step3 from "../../components/steps/Step3";
import Step4 from "../../components/steps/Step4";
import Step5 from "../../components/steps/Step5";
import Step6 from "../../components/steps/Step6";
import Step7 from "../../components/steps/Step7";

export const buttonCss =
    "border-2 py-9 px-9 border-white hover:bg-gray-100 hover:bg-opacity-20 rounded-full bg-no-repeat bg-contain disabled:opacity-50";
export const textBaseCss = "text-white font-inter";
export const textCss = `text-xl md:text-2xl px-8 p-4 hover:bg-gray-100 hover:text-white hover:bg-opacity-20 ${textBaseCss}`;

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
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [ineligible, setIneligible] = useState<number>(0);

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

    const checkEligibility = () => {
        if (
            formState.conditionallyExemptDocument === 0 ||
            formState.deniedOrDelayed === 0 ||
            formState.exemptAgency === 0 ||
            formState.fullExemptDocument === 0 ||
            formState.historicInformation === 0 ||
            formState.publiclyAvailable === 0
        ) {
            setIneligible(formState.page);
        } else {
            setIneligible(0);
        }
    };

    useEffect(() => console.log(`ineligible ${ineligible}`), [ineligible]);

    const handleSetPage = (newPage: number) => {
        const stateCpy = { ...formState };

        if (newPage > formState.page) {
            checkEligibility();
        }

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

    const handleSetEligible = () => {
        setIneligible(formState.page - 1);
        handleSetPage(formState.page - 1);
    };

    const handleModalClose = () => setModalOpen(false);

    return (
        <div className="h-screen flex place-content-center">
            <div className="mx-8 my-48 place-content-center">
                <Question question={Questions[formState.page - 1]} />
                {formState.page > ineligible && ineligible !== 0 ? (
                    <Ineligible handleSetEligible={handleSetEligible} />
                ) : formState.page === 1 ? (
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
                <div className="flex flex-row-reverse">
                    <button
                        onClick={() => setModalOpen(true)}
                        className={`${buttonCss} border-0 py-0 px-0 h-12 w-12 bg-info -mt-2 mx-4`}
                    />
                    {formState.page > 1 && (
                        <p
                            className={`${textBaseCss} text-xl italic hover:underline hover:decoration-2 hover:cursor-pointer`}
                        >
                            {ineligible
                                ? "Continue to FOI request form anyway."
                                : "Skip to FOI request form."}
                        </p>
                    )}
                </div>
            </div>

            <Modal
                page={formState.page}
                modalOpen={modalOpen}
                handleModalClose={handleModalClose}
            />
        </div>
    );
};

export default Guide;
