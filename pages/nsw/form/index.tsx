import { FormikValues }                                  from 'formik'
import { promises as fs }                                from 'fs'
import { PDFDocument, PDFForm }                          from 'pdf-lib'
import React, { FunctionComponent, useEffect, useState } from 'react'
import FOIForm                                           from '../../../components/GenericForm'
import PdfViewer                                         from '../../../components/PdfViewer'
interface Props {
    data: string
}

export interface Form {
    displayValue: string,
    formValue: string,
    type: string,
    options?: string[],
    validation?: string,
    caption?: string,
    if?: { formValue: string, type: string }
}

export const formValues: Form[] = [
    {
        displayValue: 'Personal information',
        formValue   : '',
        type        : 'header'
    },
    {
        displayValue: 'Agency that you are applying to',
        formValue   : 'Agency',
        type        : 'input',
        validation  : 'agency', // TODO: autocomplete,
        caption     : ''
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
    {
        displayValue: 'Do you agree to get correspondence in regards to this request?',
        formValue   : 'Agree to correspondence',
        type        : 'dropdown',
        options     : ['Yes', 'No']
    },
    {
        displayValue: 'You are required to provide some proof of identity.',
        formValue   : 'Proof of Identity',
        type        : 'file',
        options     : ['Australian drivers licence', 'Current Australian passport', 'Other proof of signature and current address details']
    },
    {
        displayValue: 'Information requested',
        formValue   : '',
        type        : 'header'
    },
    { //TODO: maybe move out to clicky thing
        displayValue: 'Have you checked if the information you are looking for is already available online?',
        formValue   : 'ignore_application',
        type        : 'dropdown',
        options     : ['Yes', 'No'],
        caption     : 'Please check on the agency\'s website that the information you are looking for is not already available.'
    },
    {
        displayValue: 'What information are you looking for?', formValue: 'Application', type: 'textarea',
        if          : { formValue: 'ignore_application', type: 'Yes' }
    },
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
        displayValue: 'Please specify how you would like access to these documents',
        formValue   : 'Specify',
        type        : 'input',
        if          : { formValue: 'AccessMethod', type: 'Access in another way please specify' }
    },
    {
        displayValue: 'A $30 payment is required. How would you like to pay for this?',
        formValue   : 'Payment',
        type        : 'dropdown',
        options     : ['Cash', 'Cheque', 'Money order']
    },
    {
        displayValue: 'Third party',
        caption     : 'Under section 54 of the GIPA Act, if the information you are requesting contains information about another person, business or agency, the agency may be required to consult with third parties before deciding your application. The purpose of this consultation is for the agency to determine whether the third party has an objection to disclosure of some or all of the information being requested.',
        formValue   : 'Third parties',
        type        : 'dropdown',
        options     : ['Yes', 'No']
    },
    {
        displayValue: 'Do you consent to this information being released on the Information and Privacy Commissioner\'s website?',
        caption     : 'Details about this application may be recorded and published on the Information and Privacy Commission website. You may object to this.',
        formValue   : 'Disclosure Log',
        type        : 'dropdown',
        options     : ['Yes 3', 'No 3']
    }, // what does this map to?
    {
        displayValue: 'Are you suffering from financial hardship?',
        caption     : 'If you are suffering financial, you may be entitled ot a 50% reduction in your processing charge ($30/hour). Please attach proof, such as your pensioners card or a Centrelink card.',
        formValue   : 'Financial Hardship',
        type        : 'dropdown',
        options     : ['Yes 3', 'No 3']
    },
    {
        displayValue: 'Does this FOI request provide special benefit to the public?',
        caption     : 'If your FOI request provides special benefit to the public, you may be entitled ot a 50% reduction in your processing charge ($30/hour).',
        formValue   : 'Special benefit to the public',
        type        : 'dropdown',
        options     : [
            'My application refers to public health and safety;\n', //FROM Shoebridge v Forestry Corporation [2016]
                                                                    // NSWCATAD 93 (Shoebridge) at 23
            'My application refers to the use of public funds;\n',
            'My application seeks to examine proper record keeping and legislative compliance generally by the agency in the exercise of its functions;\n',
            'My application seeks to examine the existence of a special interest group and the benefits of accountability and transparency of decision-making by government, in particular Members of Parliament; and\n',
            'My application seeks to examine the need to ensure that citizens have sufficient information to enable them to actively participate and contribute to consideration of relevant issues through submissions or enquiry.',
            'Other'
        ]
    },
    {
        displayValue: 'Please specify what special benefit your application brings',
        formValue   : 'benefit_specify',
        type        : 'input',
        if          : { formValue: 'Special benefit to the public', type: 'Other' }
    }
]

const NSWForm: FunctionComponent<Props> = ({ data }) => {
    const [downloadUrl, setDownloadUrl] = useState('')
    const [pdfFile, setPdfFile] = useState<Uint8Array>()
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
            // console.log(fields)
            // console.log(fieldNames)
        }

        processForm()
    }, [])

    const handleSubmit = async (values: FormikValues) => {
        formValues.forEach((formEntry) => {
            if (!formEntry.formValue) {
                return
            }
            switch (formEntry.type) {
                case 'textarea':
                case 'input': {
                    if (!values[formEntry.formValue]) {
                        return
                    }
                    if (formEntry.formValue === 'Application') {
                        pdfForm.getTextField('Application 1').setText(values[formEntry.formValue])
                        break
                    }
                    if (formEntry.formValue === 'Special benefit to the public' && values[formEntry.formValue]) {
                        pdfForm.getCheckBox('Special benefit to the public').check()
                        pdfForm.getTextField('Reason').setText(values[formEntry.formValue])
                        break
                    }
                    pdfForm.getTextField(formEntry.formValue).setText(values[formEntry.formValue])
                    break
                }
                case 'dropdown': {
                    if (!formEntry.options) {
                        return
                    }
                    if (formEntry.formValue === 'Special benefit to the public') {
                        if (values[formEntry.formValue] === 'Other') {
                            pdfForm.getCheckBox('Special benefit to the public').check()
                            pdfForm.getTextField('Reason').setText(values['benefit_specify'])
                        } else if (values[formEntry.formValue]) {
                            pdfForm.getCheckBox('Special benefit to the public').check()
                            pdfForm.getTextField('Reason').setText(values[formEntry.formValue])
                        }
                        return
                    }
                    formEntry.options.forEach((option) => {
                        if (values[formEntry.formValue] === option) {
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

    return (
        <div className="p-20 max-w-4xl">
            {/*<div className="">*/}
            {/*    <p className={textCss}>To make a FOI request </p>*/}
            {/*</div>*/}
            {
                downloadUrl && pdfFile ? <PdfViewer pdfDownloadUrl={downloadUrl} pdfFile={pdfFile}/> : <FOIForm formValues={formValues}
                                                                                   handleOnSubmit={handleSubmit}/>
            }
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
