import Lottie from "lottie-react";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";
import Ineligible from "../../components/Ineligible";
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
import animation from "../../public/loading.json";

export const buttonCss =
    "border-2 py-9 px-9 border-white hover:bg-gray-100 hover:bg-opacity-20 rounded-full bg-no-repeat bg-contain disabled:opacity-50";
export const textBaseCss = "text-white font-inter";
export const textCss = `text-xl md:text-2xl px-8 p-4 hover:bg-gray-100 hover:text-white hover:bg-opacity-20 ${textBaseCss}`;

interface Props {}

type Options = {
    status: number;
    page: number;
};

export type State = {
    jurisdiction: string;
    page: number;
    deniedOrDelayed: Options;
    publiclyAvailable: Options;
    historicInformation: Options;
    fullExemptDocument: Options;
    conditionallyExemptDocument: Options;
    exemptAgency: Options;
};

const Questions = [
    "Sorry, you don't appear eligible to submit a Freedom of Information request.",
    "You may not succeed in submitting a Freedom of Information request.",
    "Select the State or Territory holding the information to be requested.",
    "Have you already made an application that has been denied or delayed?",
    "Is the information you are seeking already publicly available?",
    "Are you requesting historic government information?",
    "Are you requesting an exempt document?",
    "Are you requesting a document from an exempt agency?",
    "Are you requesting a conditionally exempt document?",
];

const defaultState: State = {
    jurisdiction: "",
    page: 1,
    deniedOrDelayed: {
        status: -1,
        page: 2,
    },
    publiclyAvailable: {
        status: -1,
        page: 3,
    },
    historicInformation: {
        status: -1,
        page: 4,
    },
    fullExemptDocument: {
        status: -1,
        page: 5,
    },
    exemptAgency: {
        status: -1,
        page: 6,
    },
    conditionallyExemptDocument: {
        status: -1,
        page: 7,
    },
};

const Guide: FunctionComponent<Props> = ({}) => {
    const [formState, setFormState] = useState<State>({ ...defaultState });
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [ineligible, setIneligible] = useState<number>(0);
    const router = useRouter();

    useEffect(() => console.log(defaultState), [defaultState]);

    const handleClearState = () => {
        setFormState({
            jurisdiction: "",
            page: 1,
            deniedOrDelayed: {
                status: -1,
                page: 2,
            },
            publiclyAvailable: {
                status: -1,
                page: 3,
            },
            historicInformation: {
                status: -1,
                page: 4,
            },
            fullExemptDocument: {
                status: -1,
                page: 5,
            },
            exemptAgency: {
                status: -1,
                page: 6,
            },
            conditionallyExemptDocument: {
                status: -1,
                page: 7,
            },
        });
        setIneligible(0);
        console.log(defaultState);
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

    const progressToForm = (newPage: number = 0) => {
        if (
            (formState.jurisdiction === "CTH" && newPage > 7) ||
            (formState.jurisdiction !== "CTH" && newPage > 5)
        ) {
            setTimeout(
                () =>
                    router.push(
                        `${formState.jurisdiction.toLowerCase()}/apply`
                    ),
                2000
            );
        }
    };

    const checkEligibility = (oldPage: number, newPage: number) => {
        let eligibilityChanged = false;
        let determinedEligibility = ineligible;

        Object.values(formState).forEach((v) => {
            const pivot: Options = v as Options;
            if (pivot.page === determinedEligibility && pivot.status !== 0) {
                determinedEligibility = 0;
            }
        });

        Object.values(formState).forEach((v) => {
            const pivot: Options = v as Options;
            if (
                (determinedEligibility === 0 ||
                    pivot.page <= determinedEligibility) &&
                pivot.status === 0
            ) {
                eligibilityChanged = true;
                determinedEligibility = pivot.page;
            }
        });

        if (!eligibilityChanged && ineligible > 0) {
            determinedEligibility = 0;
        } else {
            progressToForm(newPage);
        }
        setIneligible(determinedEligibility);
    };

    const handleSetPage = (newPage: number) => {
        const stateCpy = { ...formState };

        checkEligibility(stateCpy.page, newPage);

        stateCpy.page = newPage;
        setFormState(stateCpy);
    };

    const handleSetDeniedOrDelayed = (newStatus: number) => {
        const stateCpy = { ...formState };
        stateCpy.deniedOrDelayed.status = newStatus;
        setFormState(stateCpy);
    };

    const handleSetPubliclyAvailable = (newStatus: number) => {
        const stateCpy = { ...formState };
        stateCpy.publiclyAvailable.status = newStatus;
        setFormState(stateCpy);
    };

    const handleSetHistoricDocument = (newStatus: number) => {
        const stateCpy = { ...formState };
        stateCpy.historicInformation.status = newStatus;
        setFormState(stateCpy);
    };

    const handleSetFullExemptDocument = (newStatus: number) => {
        const stateCpy = { ...formState };
        stateCpy.fullExemptDocument.status = newStatus;
        setFormState(stateCpy);
    };

    const handleSetConditionallyExemptDocument = (newStatus: number) => {
        const stateCpy = { ...formState };
        stateCpy.conditionallyExemptDocument.status = newStatus;
        setFormState(stateCpy);
    };

    const handleSetExemptAgency = (newStatus: number) => {
        const stateCpy = { ...formState };
        stateCpy.exemptAgency.status = newStatus;
        setFormState(stateCpy);
    };

    const handleSetEligible = () => {
        handleSetPage(formState.page - 1);
    };

    const handleModalClose = () => setModalOpen(false);

    return (
        <div className="h-screen flex flex-col place-content-center">
            {ineligible > 0 ||
            !(
                (formState.jurisdiction === "CTH" && formState.page > 7) ||
                (formState.jurisdiction !== "CTH" && formState.page > 5)
            ) ? (
                <>
                    <div className="w-full mb-48 place-content-center">
                        <Question
                            question={
                                formState.page > ineligible &&
                                ineligible !== 0 &&
                                formState.page > 5
                                    ? Questions[1]
                                    : formState.page > ineligible &&
                                      ineligible !== 0
                                    ? Questions[0]
                                    : Questions[formState.page + 1]
                            }
                        />
                        {formState.page > ineligible && ineligible !== 0 ? (
                            <Ineligible
                                jurisdiction={formState.jurisdiction}
                                pivot={formState.page}
                                handleSetEligible={handleSetEligible}
                            />
                        ) : formState.page === 1 ? (
                            <Step1
                                jurisdiction={formState.jurisdiction}
                                handleSetJurisdiction={handleSetJurisdiction}
                            />
                        ) : formState.page === 2 ? (
                            <Step2
                                deniedOrDelayed={
                                    formState.deniedOrDelayed.status
                                }
                                handleSetDeniedOrDelayed={
                                    handleSetDeniedOrDelayed
                                }
                            />
                        ) : formState.page === 3 ? (
                            <Step3
                                publiclyAvailable={
                                    formState.publiclyAvailable.status
                                }
                                handleSetPubliclyAvailable={
                                    handleSetPubliclyAvailable
                                }
                            />
                        ) : formState.page === 4 ? (
                            <Step4
                                historicInformation={
                                    formState.historicInformation.status
                                }
                                handleSetHistoricDocument={
                                    handleSetHistoricDocument
                                }
                            />
                        ) : formState.page === 5 ? (
                            <Step5
                                fullExemptDocument={
                                    formState.fullExemptDocument.status
                                }
                                handleSetFullExemptDocument={
                                    handleSetFullExemptDocument
                                }
                            />
                        ) : formState.page === 6 ? (
                            <Step6
                                exemptAgency={formState.exemptAgency.status}
                                handleSetExemptAgency={handleSetExemptAgency}
                            />
                        ) : formState.page === 7 ? (
                            <Step7
                                conditionallyExemptDocument={
                                    formState.conditionallyExemptDocument.status
                                }
                                handleSetConditionallyExemptDocument={
                                    handleSetConditionallyExemptDocument
                                }
                            />
                        ) : null}
                        {(formState.page <= ineligible || ineligible === 0) && (
                            <Navigator
                                formState={formState}
                                handleSetPage={handleSetPage}
                                handleClearState={handleClearState}
                            />
                        )}
                        <div className="flex flex-row-reverse mx-20">
                            {!(
                                formState.page > ineligible && ineligible !== 0
                            ) && (
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className={`${buttonCss} border-0 py-0 px-0 h-12 w-12 bg-info -mt-2 mx-6`}
                                />
                            )}
                            {formState.page > 1 && (
                                <button
                                    onClick={() => handleSetPage(8)}
                                    className={`${textBaseCss} text-mg md:text-xl italic hover:underline hover:decoration-2 hover:cursor-pointer`}
                                >
                                    {ineligible
                                        ? "Continue to FOI request form anyway."
                                        : "Skip to FOI request form."}
                                </button>
                            )}
                        </div>
                    </div>

                    <Modal
                        page={formState.page}
                        modalOpen={modalOpen}
                        handleModalClose={handleModalClose}
                    />

                </>
            ) : (
                <div className={"flex flex-col items-center mb-48"}>
                    <Lottie animationData={animation} className="h-72 w-72" />
                </div>
            )}
            <div className={"flex flex-col items-center mb-5"}>
                <p className={"font-inter text-white"}>
                    <i>
                        FreeTheInformation does not claim to provide legal
                        advice, and it is not intended to be a substitute for
                        legal advice.
                    </i>
                </p>
            </div>
        </div>
    );
};

export default Guide;
