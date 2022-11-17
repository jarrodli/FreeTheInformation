import React, { FunctionComponent } from "react";

interface Props {
    question: string;
}

const Question: FunctionComponent<Props> = ({ question }) => {
    return (
        <p className="mx-2 text-3xl md:text-4xl text-center font-bold font-inter text-white">
            {question}
        </p>
    );
};

export default Question;
