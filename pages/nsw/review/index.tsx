import { FormikValues } from "formik";
import { promises as fs } from "fs";
import { PDFDocument, PDFForm } from "pdf-lib";
import React, { FunctionComponent, useEffect, useState } from "react";
import FOIForm, { formTextCss } from "../../../components/GenericForm";
import PdfViewer from "../../../components/PdfViewer";
import { Form, headerTextCss } from "../apply";

interface Props {
    data: string;
}

const formValues: Form[] = [
    {
        displayValue: "Personal information",
        formValue: "",
        type: "header",
    },
    {
        displayValue:
            "Name and Address of agency who made the initial decision",
        formValue:
            "1 Name and address of the agency who made the decision you are requesting an external review of",
        type: "input",
        validation: "agency", // TODO: autocomplete,
        caption: "",
    },
    { displayValue: "Full name", formValue: "2 Your full name", type: "input" },
    {
        displayValue: "Postal Address",
        formValue: "3 Your postal address",
        type: "input",
    },
    {
        displayValue: "Contact Number",
        formValue: "4 Telephone number",
        type: "input",
    },
    {
        displayValue: "Email",
        formValue: "5 Email address",
        type: "input",
        validation: "email",
    },
    {
        displayValue:
            "Do you need any other forms of assistance with this application?",
        formValue: "special-assistance",
        type: "dropdown",
        options: [
            {
                formValue: "6 Large font",
                displayValue: "Large font",
            },
            {
                formValue: "6 NRS",
                displayValue: "National Relay Service",
            },
            {
                formValue: "6 TIS",
                displayValue: "Translating and Interpreting Services",
            },
        ],
    },
    {
        displayValue:
            "Are you filling out this application on the behalf of someone else?",
        caption:
            "Please attach a copy of your authority to act on their behalf",
        formValue: "ignore_behalf",
        type: "dropdown",
        options: [
            { formValue: "Yes", displayValue: "Yes" },
            { formValue: "No", displayValue: "No" },
        ],
    },
    {
        displayValue: "Please provide their name and contact details.",
        formValue:
            "7 Important information If the application is on behalf of someone else please provide as an attachment a copy of your authority to act on their behalf 7 Their name and contact details below",
        type: "input",
        if: { formValue: "ignore_behalf", type: "Yes" },
    },
    {
        displayValue: "What is your relationship with this person?",
        formValue:
            "8 What is your relationship to this person eg parent  friend  lawyer",
        type: "input",
        if: { formValue: "ignore_behalf", type: "Yes" },
    },
    {
        displayValue: "Why are you making this application?",
        formValue: "why-apply",
        type: "dropdown",
        options: [
            {
                formValue: "9 Did not receive decision",
                displayValue: "You did not receive a decision",
            },
            {
                formValue: "9 Disagree with decision",
                displayValue: "You do not agree with the decision made",
            },
        ],
    },
    {
        displayValue: "When did you make your application?",
        formValue:
            "10 If you formally applied for information what date did you apply to the agency",
        type: "input",
    },
    {
        displayValue: "When did you receive the decision?",
        formValue: "11 Date they gave decision",
        type: "input",
        if: { formValue: "why-apply", type: "9 Disagree with decision" },
    },
    {
        displayValue: "When date did the agency make the decision?",
        caption: "You have a maximum of 40 working days to make a decision",
        formValue: "12 Date of agency decision",
        type: "input",
        if: { formValue: "why-apply", type: "9 Disagree with decision" },
        validation: "40-days",
    },
    {
        displayValue: "How did you receive the agency's decision?",
        formValue: "how-receive",
        type: "dropdown",
        if: { formValue: "why-apply", type: "9 Disagree with decision" },
        options: [
            {
                formValue: "13 By email",
                displayValue: "By email",
            },
            {
                formValue: "13 By post",
                displayValue: "By post",
            },
            {
                formValue: "13 Other",
                displayValue: "Other",
            },
        ],
    },
    {
        displayValue:
            "Please provide details on how you received the agency's decision",
        formValue: "13 If other, details",
        type: "input",
        if: { formValue: "how-receive", type: "13 Other" },
    },
    {
        displayValue:
            "Are there any other documents relevant to this application?",
        formValue: "14 Identify relevant documents",
        type: "input",
    },
    {
        displayValue:
            "Have you applied to NSW Civil and Administrative Tribunal (NCAT) for internal review?",
        formValue: "ignore_ncat",
        type: "dropdown",
        options: [
            { formValue: "Yes", displayValue: "Yes" },
            { formValue: "No", displayValue: "No" },
        ],
    },
    {
        displayValue: "Please provide details about the NCAT application",
        formValue:
            "15 Have you sought an internal review by the agency or a review by the NSW Civil and Administrative Tribunal NCAT If yes please provide details Maximum 5000 Characters Note If you have sought a review by NCAT the IPC cannot review the same decision You must seek an internal review before coming to us unless you are the person who asked for the information Note If you have printed this form and are completing it by hand please write your extended response on a separate A4 page and attach to this form",
        type: "textarea",
        if: { formValue: "ignore_ncat", type: "Yes" },
    },
    {
        displayValue: "Why are you requesting an external review?",
        formValue:
            "16 This section of the form will be removed and a copy provided to the Agency as part of the IPCs notification of an application for external review This is to assist the Agency in responding to the IPCs external review Please provide your reasons for requesting an external review Maximum 10000 Characters Note If you have printed this form and are completing it by hand please write your extended response on a separate A4 page and attach to this form",
        type: "textarea",
    },
    {
        displayValue:
            "Do you consent for this application to be provided to the agency?",
        caption:
            "it will assist the Information Commissioner to have your consent for this section of your application to be provided to the agency so that the Commissioner can collect all of the information required to deal with your application",
        formValue: "consent",
        type: "dropdown",
        options: [
            {
                formValue:
                    "If you do not consent to the above please tick here",
                displayValue: "Yes",
            },
        ],
    },
    {
        displayValue:
            "Do you wish to participate in a survey about your experience making this request?",
        formValue: "ignore_survey",
        type: "dropdown",
        options: [
            { formValue: "Yes", displayValue: "Yes" },
            { formValue: "No", displayValue: "No" },
        ],
    },
    {
        displayValue: "Please enter your name",
        formValue: "18 Full name",
        type: "input",
        if: { formValue: "ignore_survey", type: "Yes" },
    },
    {
        displayValue: "Please enter today's date",
        formValue: "18 Date",
        type: "input",
        if: { formValue: "ignore_survey", type: "Yes" },
    },
];

const NSWReviewForm: FunctionComponent<Props> = ({ data }) => {
    const [pdfFile, setPdfFile] = useState<Uint8Array>();
    const [downloadUrl, setDownloadUrl] = useState("");
    let pdfDoc: PDFDocument;
    let pdfForm: PDFForm;

    useEffect(() => {
        const processForm = async () => {
            if (!data) {
                return;
            }
            pdfDoc = await PDFDocument.load(data);
            pdfForm = pdfDoc.getForm();
        };

        processForm();
    }, []);

    const handleSubmit = async (values: FormikValues) => {
        formValues.forEach((formEntry) => {
            if (
                !formEntry.formValue ||
                formEntry.formValue.includes("ignore_")
            ) {
                return;
            }
            switch (formEntry.type) {
                case "textarea":
                case "input": {
                    if (!values[formEntry.formValue]) {
                        return;
                    }

                    pdfForm
                        .getTextField(formEntry.formValue)
                        .setText(values[formEntry.formValue]);
                    break;
                }
                case "dropdown": {
                    if (!formEntry.options) {
                        return;
                    }

                    formEntry.options.forEach((option) => {
                        if (values[formEntry.formValue] === option.formValue) {
                            pdfForm
                                .getCheckBox(values[formEntry.formValue])
                                .check();
                        }
                    });
                    break;
                }
                case "file": {
                    break;
                }
            }
        });
        const pdfBytes = await pdfDoc.save();
        setPdfFile(pdfBytes);
        const docUrl = URL.createObjectURL(
            new Blob([pdfBytes], { type: "application/pdf" })
        );
        setDownloadUrl(docUrl);
        window.scrollTo(0, 0);
    };

    const completedFormText = () => {
        return (
            <p className={formTextCss}>
                A completed FOI review request form has been generated. Please
                sign it, attach any relevant payment information, and email it
                to{" "}
                <a
                    className={
                        "transition duration-500 italic text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
                    }
                    href={"mailto:ipcinfo@ipc.nsw.gov.au"}
                >
                    ipcinfo@ipc.nsw.gov.au
                </a>
            </p>
        );
    };

    return (
        <div className="p-20 max-w-5xl bg-white">
            <div>
                <div>
                    <h1 className={headerTextCss}>
                        Review an FOI request in New South Wales
                    </h1>
                </div>
                <div className="py-10 space-y-6">
                    <p className={"text-black"}>
                        Use this form if you want the outcome of your Freedom of
                        Information (FOI) request to be reviewed in New South
                        Wales under s 92 of the
                        <i>
                            {" "}
                            Government Information (Public Access) Act 2009
                        </i>{" "}
                        (GIPA Act) by the NSW Information Commissioner.
                    </p>
                    <p className={"text-black"}>
                        An external review involves the NSW Information
                        Commissioner reviewing your initial FOI application, as
                        well as the process the agency followed in deciding your
                        application. If the Information Commissioner finds some
                        issue with that process e.g., if the agency didn't
                        comply with their requirements under the GIPA Act, they
                        will advise the agency to reconsider your application.
                    </p>
                    <p className={"text-black"}>
                        You have <b>40 working days</b> from the time you
                        received the outcome of your review to file a request
                        with the IPC.
                    </p>
                    <p className={"text-black"}>
                        An external review is <i>free</i>.
                    </p>
                </div>
                {downloadUrl && pdfFile ? (
                    <PdfViewer
                        pdfDownloadUrl={downloadUrl}
                        pdfFile={pdfFile}
                        completedFormText={completedFormText}
                    />
                ) : (
                    <FOIForm
                        formValues={formValues}
                        handleOnSubmit={handleSubmit}
                    />
                )}
            </div>
        </div>
    );
};

export async function getStaticProps(): Promise<{ props: Props }> {
    const data = await fs.readFile("public/forms/nsw_review.pdf");
    return {
        props: {
            data: data.toString("base64"),
        },
    };
}

export default NSWReviewForm;
