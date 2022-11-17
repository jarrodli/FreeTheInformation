import React, { FunctionComponent } from "react";
import { buttonCss, State, textCss } from "../../pages/guide/Guide";

interface Props {
    formState: State;
    handleSetPage: (p: number) => void;
    handleClearState: () => void;
}

const Navigator: FunctionComponent<Props> = ({
    formState,
    handleSetPage,
    handleClearState,
}) => {
    return (
        <div className="my-24 space-x-16 flex place-content-center">
            <button
                onClick={() => handleSetPage(formState.page - 1)}
                disabled={formState.page === 1}
                className={`${buttonCss} bg-arrowLeft`}
            />
            <button
                onClick={() => handleClearState()}
                className={`border-2 ${textCss}`}
            >
                Restart
            </button>
            <button
                onClick={() => handleSetPage(formState.page + 1)}
                disabled={
                    (!formState.jurisdiction && formState.page === 1) ||
                    (formState.deniedOrDelayed.status < 0 &&
                        formState.page === 2) ||
                    (formState.publiclyAvailable.status < 0 &&
                        formState.page === 3) ||
                    (formState.historicInformation.status < 0 &&
                        formState.page === 4) ||
                    (formState.fullExemptDocument.status < 0 &&
                        formState.page === 5) ||
                    (formState.exemptAgency.status < 0 &&
                        formState.page === 6) ||
                    (formState.conditionallyExemptDocument.status < 0 &&
                        formState.page === 7)
                }
                className={`${buttonCss} bg-arrowRight`}
            />
        </div>
    );
};

export default Navigator;
