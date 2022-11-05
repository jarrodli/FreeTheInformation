import { Field, Formik, FormikValues }                   from 'formik'
import { promises as fs }                                from 'fs'
import { PDFDocument, PDFForm }                          from 'pdf-lib'
import React, { FunctionComponent, useEffect, useState } from 'react'
import FOIForm                                           from '../../../components/GenericForm'

interface Props {
    data: string
}

export interface Form {
    displayValue: string,
    formValue: string,
    type: string,
    options?: string[],
    validation?: string,
    if?: string
}

export const formValues: Form[] = [
    {
        displayValue: 'Agency that you are looking to get information from',
        formValue   : 'Agency',
        type        : 'input',
        validation  : 'agency'
    },
    { displayValue: 'First Name', formValue: 'Other names', type: 'input' },
    { displayValue: 'Last Name', formValue: 'Surname', type: 'input' },
    { displayValue: 'Title', formValue: 'Title', type: 'dropdown', options: ['Mr', 'Mrs', 'Ms', 'Dr'] },
    { displayValue: 'Address', formValue: 'Postal address', type: 'input' },
    { displayValue: 'Postcode', formValue: 'Postcode', type: 'input' },
    { displayValue: 'Contact Number', formValue: 'Daytime telephone', type: 'input' },
    { displayValue: 'Fax Number', formValue: 'Facsimile', type: 'input' },
    { displayValue: 'Email', formValue: 'Email', type: 'input', validation: 'email' },
    {
        displayValue: 'Do you need any other forms of assistance with this application?',
        formValue   : 'Special needs',
        type        : 'input'
    },
    { displayValue: 'Do you agree to get correspondence in regards to this request?', formValue: 'Agree to correspondence', type: 'dropdown', options: ['Yes', 'No'] },
    {
        displayValue: 'You are required to provide some proof of identity.',
        formValue   : 'Proof of Identity',
        type        : 'file',
        options     : ['Australian drivers licence', 'Current Australian passport', 'Other proof of signature and current address details']
    },
    { displayValue: 'What information are you looking for?', formValue: 'Application', type: 'textarea' },
    {
        displayValue: 'Are you seeking personal information?',
        formValue   : 'Personal information',
        type        : 'dropdown',
        options     : ['Yes', 'No']
    },
    {
        displayValue: 'Have you made an application for information at another agency requesting the same information? If yes, please enter the agency below.',
        formValue   : 'Name of agency',
        type        : 'input'
    },
    {
        displayValue: 'How would you like to access these documents?',
        formValue   : 'AccessMethod',
        type        : 'dropdown',
        options     : ['Inspect the documents', 'A copy of the documents', 'Access in another way please specify']
    },
    {
        displayValue: 'Please provide specify how you would like access to these documents',
        formValue   : 'Specify',
        type        : 'input',
        if          : 'Access in another way please specify'
    },
    {
        displayValue: 'A $30 payment is required. How would you like to pay for this?',
        formValue   : 'Payment',
        type        : 'dropdown',
        options     : ['Cash', 'Cheque', 'Money order']
    },
    {
        displayValue: 'Under section 54 of the GIPA Act, if the information you are requesting contains information about another person, business or agency, the agency may be required to consult with third parties before deciding your application. The purpose of this consultation is for the agency to determine whether the third party has an objection to disclosure of some or all of the information being requested.',
        formValue   : 'Third parties',
        type        : 'dropdown',
        options     : ['Yes', 'No']
    },
    { displayValue: 'Disclosure log', formValue: 'Disclosure Log', type: 'dropdown', options: ['Yes 3', 'No 3'] },
    {
        displayValue: 'Are you suffering from financial hardship?',
        formValue   : 'Financial Hardship',
        type        : 'dropdown',
        options     : ['Yes 3', 'No 3']
    },
    {
        displayValue: 'Does this FOI request provide special benefit to the public?',
        formValue   : 'Special benefit to the public',
        type        : 'input'
    }
]

const NSWForm: FunctionComponent<Props> = ({ data }) => {
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
        }

        processForm()
    }, [])

    const handleSubmit = async (values: FormikValues) => {
        formValues.forEach((formEntry) => {
            if (formEntry.type !== 'input') return
            pdfForm.getTextField(formEntry.formValue).setText(values[formEntry.formValue])
        })
        const pdfBytes = await pdfDoc.save()
        const docUrl = URL.createObjectURL(
            new Blob([pdfBytes], { type: 'application/pdf' })
        )
        setDownloadUrl(docUrl)
    }

    return (
        <div className="min-h-screen w-screen bg-midnights bg-fixed md:bg-background md:bg-no-repeat md:bg-cover">
            <div className="flex flex-row items-center justify-center p-20 max-w-3/4">
                <FOIForm formValues={formValues} handleOnSubmit={handleSubmit}/>
                {
                    downloadUrl && <a href={downloadUrl}>Download</a>
                }
            </div>
        </div>
    )
}

export async function getStaticProps(): Promise<{ props: Props }> {
    const data = await fs.readFile('public/forms/nsw.pdf')
    return {
        props: {
            data: data.toString('base64')
        }
    }
}

export default NSWForm
