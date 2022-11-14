import React, { FunctionComponent } from "react";
import { buttonCss, State, textCss } from "../../Guide";

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
                disabled={!formState.jurisdiction}
                className={`${buttonCss} bg-arrowRight`}
            />
        </div>
    );
};

export default Navigator;
