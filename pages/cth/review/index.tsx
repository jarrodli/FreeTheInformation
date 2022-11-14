import { FormikValues }                                  from 'formik'
import { promises as fs }                                from 'fs'
import { PDFDocument, PDFForm }                          from 'pdf-lib'
import React, { FunctionComponent, useEffect, useState } from 'react'
import FOIForm                                           from '../../../components/GenericForm'
import PdfViewer                                         from '../../../components/PdfViewer'
import { textCss }                                       from '../../guide/Guide'
import { Form }                                          from '../../nsw/apply'


interface Props {
    data: string
}

const formValues: Form[] = [
    {
        displayValue: 'Personal information',
        formValue   : '',
        type        : 'header'
    },
    { displayValue: 'Full name', formValue: 'Full Name', type: 'input' },
    {
        displayValue: 'What is your preferred contact method',
        formValue   : 'preferred contact method',
        type        : 'dropdown',
        options     : [
            { formValue: 'Email_2', displayValue: 'Email' },
            { formValue: 'Phone', displayValue: 'Phone' },
            { formValue: 'Post_2', displayValue: 'Post' },
            { formValue: 'Mobile phone', displayValue: 'Mobile Phone' }

        ]
    },
    { displayValue: 'Contact Number (daytime)', formValue: 'Phone daytime 1', type: 'input' },
    { displayValue: 'Mobile', formValue: 'Mobile_1', type: 'input' },
    { displayValue: 'Email', formValue: 'Email_3 ', type: 'input', validation: 'email' },
    { displayValue: 'Postal address', formValue: 'Postal Address 1', type: 'input' },
    {
        displayValue: 'Other contact details (e.g., fax or international address)',
        formValue   : 'Other contact details',
        type        : 'input'
    },
    {
        displayValue: 'Have you contacted the OAIC before about this matter and received a reference number? Please enter it here.',
        formValue   : 'reference_number',
        type        : 'input'
    },
    {
        displayValue: 'Do you have a representative for this matter?',
        caption     : 'Please attach a copy of their authority to act on your behalf',
        formValue   : 'behalf',
        type        : 'dropdown',
        options     : [{ formValue: 'Yes', displayValue: 'Yes' }, { formValue: 'No', displayValue: 'No' }]
    },
    {
        displayValue: 'Please provide their name',
        formValue   : 'representative_name',
        type        : 'input',
        if          : { formValue: 'behalf', type: 'Yes' }
    },
    {
        displayValue: 'Please provide their organisation',
        formValue   : 'Representative organisation name',
        type        : 'input',
        if          : { formValue: 'behalf', type: 'Yes' }
    },
    {
        displayValue: 'What is your relationship with this person?',
        formValue   : 'representative_relationship',
        type        : 'input',
        if          : { formValue: 'behalf', type: 'Yes' }
    },
    {
        displayValue: 'What is their preferred contact method',
        formValue   : 'preferred contact method rep',
        type        : 'dropdown',
        options     : [
            { formValue: 'Email_4', displayValue: 'Email' },
            { formValue: 'Phone_2', displayValue: 'Phone' },
            { formValue: 'Post_3', displayValue: 'Post' },
            { formValue: 'Mobile phone_2', displayValue: 'Mobile Phone' }

        ],
        if          : { formValue: 'behalf', type: 'Yes' }
    },
    { displayValue: 'Representative Contact Number (daytime)', formValue: 'rep_phone', type: 'input' },
    { displayValue: 'Mobile', formValue: 'rep_mobile', type: 'input' },
    { displayValue: 'Email', formValue: 'rep_email', type: 'input', validation: 'email' },
    { displayValue: 'Postal address', formValue: 'Postal Address 1_2', type: 'input' },
    {
        displayValue: 'Other contact details (e.g., fax or international address)',
        formValue   : 'Other contact details eg Fax or international address',
        type        : 'input'
    },
    {
        displayValue: 'Agency or Minister Information',
        formValue   : '',
        type        : 'header'
    },
    { displayValue: 'Name of Agency/Minister', formValue: 'Name of Agency  Minister', type: 'input' },
    { displayValue: 'Contact Number (daytime)', formValue: 'Phone daytime 1_3', type: 'input' },
    { displayValue: 'Email', formValue: 'Email_6', type: 'input', validation: 'email' },
    { displayValue: 'Postal address', formValue: 'Postal Address 1_3', type: 'input' },
    {
        displayValue: 'Have you previously contacted the agency/minister and received a reference number for your application?',
        formValue   : 'decision_number',
        type        : 'input'
    },
    {
        displayValue: 'Have you received a decision?',
        formValue   : 'received_dec',
        type        : 'dropdown',
        options     : [{ formValue: 'Yes_2', displayValue: 'Yes' }, { formValue: 'No_2', displayValue: 'No' }]
    },
    {
        displayValue: 'When was the decision due?',
        formValue   : 'decision_due_date',
        type        : 'input',
        if          : { formValue: 'received_dec', type: 'No_2' }
    },
    {
        displayValue: 'When was the decision given?',
        formValue   : 'decision_received',
        type        : 'input',
        if          : { formValue: 'received_dec', type: 'Yes_2' }
    },
    {
        displayValue: 'Why are you applying for a review?',
        formValue   : 'why',
        type        : 'dropdown',
        options     : [
            {
                formValue   : 'the agency or Minister has not provided me with a decision',
                displayValue: 'The Agency or Minister has not provided me with a decision'
            },
            {
                formValue   : 'the agency or Minister refused me access to documents or parts of documents',
                displayValue: 'the agency or Minister refused me access to documents or parts of documents'
            },
            {
                formValue   : 'the agency or Minister has refused to make corrections to my personal information',
                displayValue: 'the agency or Minister has refused to make corrections to my personal information'
            },
            {
                formValue   : 'I believe I have been charged incorrectly',
                displayValue: 'I believe I have been charged incorrectly'
            },
            {
                formValue   : 'the agency or Minister granted me access to documents but I have not received them',
                displayValue: 'the agency or Minister granted me access to documents but I have not received them'
            },
            {
                formValue   : 'the agency or Minister granted access to a qualified person and not directly to me',
                displayValue: 'the agency or Minister granted access to a qualified person and not directly to me'
            },
            {
                formValue   : 'the agency or Minister refused to extend the time for me to seek an internal review',
                displayValue: 'the agency or Minister refused to extend the time for me to seek an internal review'
            }
            ,
            {
                formValue   : 'the agency or Minister decided to release information about me or my business',
                displayValue: 'the agency or Minister decided to release information about me or my business'
            }
        ]
    },
    {

        displayValue: 'Please provide a summary of why you think the decision was wrong',
        formValue   : 'information',
        type        : 'textarea',
        if          : { formValue: 'received_dec', type: 'Yes_2' }
    },
    {

        displayValue: 'How would you like this to be resolved?',
        formValue   : 'What action or result would you like from the Information Commissioner 1',
        type        : 'textarea'
    }
]

const CthReviewForm: FunctionComponent<Props> = ({ data }) => {
    const [pdfFile, setPdfFile] = useState<Uint8Array>()
    const [downloadUrl, setDownloadUrl] = useState('')
    let pdfDoc: PDFDocument
    let pdfForm: PDFForm

    useEffect(() => {
        const processForm = async () => {
            if (!data) {
                return
            }
            pdfDoc = await PDFDocument.load(data)
            pdfForm = pdfDoc.getForm()
            const fields = pdfForm.getFields()
            const fieldNames = fields.map((field) => field.getName())
            console.log(fieldNames)
        }

        processForm()
    }, [])

    const handleSubmit = async (values: FormikValues) => {
        formValues.forEach((formEntry) => {
            if (!formEntry.formValue || formEntry.formValue.includes('ignore_')) {
                return
            }
            switch (formEntry.type) {
                case 'textarea':
                case 'input': {
                    if (!values[formEntry.formValue]) {
                        return
                    }

                    pdfForm.getTextField(formEntry.formValue).setText(values[formEntry.formValue])
                    break
                }
                case 'dropdown': {
                    if (!formEntry.options) {
                        return
                    }

                    formEntry.options.forEach((option) => {
                        if (values[formEntry.formValue] === option.formValue) {
                            pdfForm.getCheckBox(values[formEntry.formValue])
                                .check()
                        }
                    })
                    break
                }
                case 'file': {
                    break
                }
            }

        })
        const pdfBytes = await pdfDoc.save()
        setPdfFile(pdfBytes)
        const docUrl = URL.createObjectURL(
            new Blob([pdfBytes], { type: 'application/pdf' })
        )
        setDownloadUrl(docUrl)
    }

    const completedFormText = () => {
        return <p className={textCss}>
            A completed FOI review request form has been generated. Please sign it, attach any relevant payment
            information, and email it
        </p> //TODO: fix
    }


    return (
        <div className="p-20 max-w-4xl">
            {
                downloadUrl && pdfFile ? <PdfViewer pdfDownloadUrl={downloadUrl} pdfFile={pdfFile}
                                                    completedFormText={completedFormText}/> :
                <div>
                    <div>
                        <p className={textCss}>

                        </p>
                    </div>
                    <FOIForm
                        formValues={formValues}
                        handleOnSubmit={handleSubmit}/>
                </div>
            }
        </div>

    )
}

export async function getStaticProps(): Promise<{ props: Props }> {
    const data = await fs.readFile('public/forms/oaic_review.pdf')
    return {
        props: {
            data: data.toString('base64')
        }
    }
}

export default CthReviewForm
