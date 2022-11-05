import React, { FunctionComponent } from "react";
import { buttonCss, textCss } from "../../Guide";

interface Props {
    page: number;
    jurisdiction: string;
}

const Navigator: FunctionComponent<Props> = ({ page, jurisdiction }) => {
    return (
        <div className="my-24 space-x-16 flex place-content-center">
            <button
                disabled={page === 1}
                className={`${buttonCss} bg-arrowLeft`}
            />
            <button className={textCss}>Restart</button>
            <button
                disabled={!jurisdiction}
                className={`${buttonCss} bg-arrowRight`}
            />
        </div>
    );
};

export default Navigator;
