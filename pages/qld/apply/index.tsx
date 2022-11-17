import { FormikValues } from "formik";
import { promises as fs } from "fs";
import { PDFDocument, PDFForm } from "pdf-lib";
import React, { FunctionComponent, useEffect, useState } from "react";
import FOIForm, { formTextCss } from "../../../components/GenericForm";
import PdfViewer from "../../../components/PdfViewer";
import { Form, headerTextCss } from "../../nsw/apply";

interface Props {
    data: string;
}

const formValues: Form[] = [
    {
        displayValue: "1. Personal information",
        formValue: "",
        type: "header",
    },
    {
        displayValue: "Agency that you are applying to",
        formValue: "Agency",
        type: "input",
    },
    {
        displayValue: "Title",
        formValue: "title",
        type: "input",
    },
    {
        displayValue: "Given Name",
        formValue: "given-name",
        type: "input",
    },
    {
        displayValue: "Last Name",
        formValue: "family-name",
        type: "input",
    },
    {
        displayValue: "Organisation",
        caption:
            "If you are making this request on behalf of an organisation or company, please provide their name here",
        formValue: "organisation",
        type: "input",
    },
    {
        displayValue: "Address",
        formValue: "address",
        type: "input",
    },
    {
        displayValue: "What is your preferred contact method?",
        formValue: "contact_method",
        type: "dropdown",
        options: [
            { formValue: "Email", displayValue: "Email" },
            { formValue: "Post", displayValue: "Post" },
            { formValue: "Mobile", displayValue: "Mobile" },
            { formValue: "Fax", displayValue: "Fax" },
            { formValue: "Phone", displayValue: "Phone" },
        ],
    },
    {
        displayValue: "Contact details",
        formValue: "contact-method",
        type: "input",
    },
    {
        displayValue: "Which of the following best describes your application?",
        formValue: "app-type",
        type: "dropdown",
        options: [
            {
                formValue: "a",
                displayValue:
                    "All of the documents I’m applying for contain my personal information OR I’m seeking access on someone else’s behalf, and all the documents contain that person’s personal information",
            },
            {
                formValue: "b",
                displayValue:
                    "Some of the documents I’m applying for do not contain my personal information OR I’m seeking access on someone else’s behalf, and some of the documents do not contain that person’s personal information",
            },
            {
                formValue: "c",
                displayValue:
                    "None of the documents I’m applying for contain my personal information OR I’m seeking access on someone else’s behalf, and none of the documents contain that person’s personal information",
            },
        ],
    },
    {
        displayValue: "",
        caption: "No fee is payable for this type of application",
        formValue: "",
        type: "header",
        if: { formValue: "app-type", type: "a" },
    },
    {
        displayValue: "",
        caption: "A fee is payable for this type of application",
        formValue: "",
        type: "header",
        if: { formValue: "app-type", type: "b" },
    },
    {
        displayValue: "",
        caption: "A fee is payable for this type of application",
        formValue: "",
        type: "header",
        if: { formValue: "app-type", type: "c" },
    },
    {
        displayValue:
            "Are you lodging this request on behalf of another person?",
        formValue: "rep",
        type: "dropdown",
        options: [
            { formValue: "behalf_yes", displayValue: "Yes" },
            { formValue: "behalf_no", displayValue: "No" },
        ],
    },
    {
        displayValue: "Applicant's Given Name",
        formValue: "app_given",
        type: "input",
        if: { formValue: "rep", type: "behalf_yes" },
    },
    {
        displayValue: "Applicant's Last Name",
        formValue: "app_last",
        type: "input",
        if: { formValue: "rep", type: "behalf_yes" },
    },
    {
        displayValue:
            "Are you seeking access for the use or benefit of another person, company or body?",
        formValue: "another-person-cb",
        type: "dropdown",
        options: [
            { formValue: "another_person_yes", displayValue: "Yes" },
            { formValue: "another_person_no", displayValue: "No" },
        ],
        if: { formValue: "app-type", type: "b" },
    },
    {
        displayValue:
            "Are you seeking access for the use or benefit of another person, company or body?",
        formValue: "another-person-c",
        type: "dropdown",
        options: [
            { formValue: "another_person_yes", displayValue: "Yes" },
            { formValue: "another_person_no", displayValue: "No" },
        ],
        if: { formValue: "app-type", type: "c" },
    },
    {
        displayValue: "What is the name of the other person, company or body?",
        formValue: "another_person_name",
        type: "input",
        if: { formValue: "another-person-b", type: "another_person_yes" },
    },
    {
        displayValue: "What is the name of the other person, company or body?",
        formValue: "another_person_name",
        type: "input",
        if: { formValue: "another-person-c", type: "another_person_yes" },
    },
    {
        displayValue: "3. Information requested",
        formValue: "",
        type: "header",
    },
    {
        displayValue:
            "What is the subject matter of the documents you are seeking?",
        formValue: "request_details",
        type: "textarea",
        caption: "Please provide as much information as possible.",
    },
    {
        displayValue: "What are the type of documents?",
        caption: "e.g., email, memos, etc",
        formValue: "type_documents",
        type: "input",
    },
    {
        displayValue: "What is the date range you want us to search between?",
        caption:
            "The more specific the better - if a range is too large, your request may be denied for being too time consuming.",
        formValue: "time_period",
        type: "input",
    },
    {
        displayValue: "Where do you think the documents are located?",
        formValue: "doc_location",
        type: "input",
    },
    {
        displayValue: "Do you have any extra information?",
        caption: "Please provide as much information as possible",
        formValue: "extra_info",
        type: "input",
    },
    {
        displayValue: "How would you like to access these documents?",
        formValue: "AccessMethod",
        type: "dropdown",
        options: [
            {
                formValue: "Inspect documents",
                displayValue: "Inspect the documents",
            },
            {
                formValue: "Photocopy of documents charges may apply",
                displayValue: "A copy of the documents",
            },
            {
                formValue: "Documents sent to me by email",
                displayValue: "Documents sent to me via email",
            },
            {
                formValue: "Copy of the documents on DVD",
                displayValue: "A copy of the documents on a DVD",
            },
            {
                formValue: "Copy of the documents on CD",
                displayValue: "A copy of the documents on a CD",
            },
        ],
    },
];

const QldApplyForm: FunctionComponent<Props> = ({ data }) => {
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
                A completed FOI request form has been generated. Please sign it,
                attach any relevant payment information, and email it to the
                relevant agency.
            </p>
        );
    };

    return (
        <div className="p-20 max-w-5xl bg-white">
            <div>
                <div>
                    <h1 className={headerTextCss}>
                        Make an FOI request in Queensland
                    </h1>
                </div>
                <div className="py-10 space-y-6">
                    <p className={"text-black"}>
                        Use this form if you want to make a Freedom of
                        Information (FOI) request in Queensland under the
                        <i> Right to Information Act 2009</i> (Qld).
                    </p>
                    <p className={"text-black"}>
                        After completing this form, a PDF file will be generated
                        which can be submitted to the agency in question.
                    </p>
                    <p className={"text-black"}>
                        The agency has 25 business days to process your request.
                        If your request is not processed within this time frame,
                        or your request is denied, you may be able to file a
                        review request. For more information, see{" "}
                        <a
                            className={
                                "transition duration-500 text-blue-500 hover:text-black hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"
                            }
                            href={"/qld/review"}
                        >
                            here
                        </a>
                        .
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
    const data = await fs.readFile("public/forms/qld.pdf");
    return {
        props: {
            data: data.toString("base64"),
        },
    };
}

export default QldApplyForm;
