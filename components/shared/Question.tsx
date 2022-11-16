import React, { FunctionComponent } from "react";

interface Props {
    question: string;
}

const Question: FunctionComponent<Props> = ({ question }) => {
    return (
        <p className="text-3xl md:text-4xl text-center font-bold font-inter">
            {question}
        </p>
    );
};

export default Question;
