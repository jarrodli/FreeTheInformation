import { FormikValues }                                  from 'formik'
import { promises as fs }                                from 'fs'
import { PDFDocument, PDFForm }                          from 'pdf-lib'
import React, { FunctionComponent, useEffect, useState } from 'react'
import FOIForm                                           from '../../../components/GenericForm'
import PdfViewer                                         from '../../../components/PdfViewer'
import { textCss }                                       from '../../guide/Guide'

interface Props {
    data: string
}

export interface Form {
    displayValue: string,
    formValue: string,
    type: string,
    options?: { formValue: string, displayValue: string }[],
    validation?: string,
    caption?: string,
    if?: { formValue: string, type: string }
}

export const headerTextCss = "text-4xl font-inter font-semibold"

export const formValues: Form[] = [
    {
        displayValue: '1. Personal information',
        formValue   : '',
        type        : 'header'
    },
    {
        displayValue: 'Agency that you are requesting information from',
        formValue   : 'Agency',
        type        : 'input',
        validation  : 'agency', // TODO: autocomplete,
        caption     : ''
    },
    { displayValue: 'First Name', formValue: 'Other names', type: 'input' },
    { displayValue: 'Last Name', formValue: 'Surname', type: 'input' },
    {
        displayValue: 'Title',
        formValue   : 'Title',
        type        : 'dropdown',
        options     : [
            { formValue: 'Mr', displayValue: 'Mr' }, {
                formValue   : 'Mrs',
                displayValue: 'Mrs'
            }, { formValue: 'Ms', displayValue: 'Ms' }, { formValue: 'Dr', displayValue: 'Dr' }
        ]
    },
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
        options     : [{ formValue: 'Yes', displayValue: 'Yes' }, { formValue: 'No', displayValue: 'No' }]
    },
    {
        displayValue: 'You are required to provide some proof of identity.',
        formValue   : 'Proof of Identity',
        type        : 'file',
        options     : [
            { formValue: 'Australian drivers licence', displayValue: 'Australian Drivers Licence' },
            { formValue: 'Current Australian passport', displayValue: 'Current Australian passport' },
            {
                formValue   : 'Other proof of signature and current address details',
                displayValue: 'Other proof of signature and current address details'
            }
        ]
    },
    {
        displayValue: '2. Information requested',
        formValue   : '',
        type        : 'header'
    },
    {
        displayValue: 'What information are you looking for?', formValue: 'Application', type: 'textarea',
        caption     : 'Please provide as much information as possible. This includes things like date ranges, where the documents may be held or the subject matter the documents relate to.',
    },
    {
        displayValue: 'Are you seeking personal information?',
        formValue   : 'Personal information',
        type        : 'dropdown',
        options     : [{ formValue: 'Yes', displayValue: 'Yes' }, { formValue: 'No', displayValue: 'No' }] // TODO:
                                                                                                           // check
                                                                                                           // form
                                                                                                           // values
                                                                                                           // are
                                                                                                           // correct
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
        options     : [
            { formValue: 'Inspect the documents', displayValue: 'Inspect the documents' },
            { formValue: 'A copy of the documents', displayValue: 'A copy of the documents' },
            { formValue: 'Access in another way please specify', displayValue: 'Access in another way please specify' }
        ]
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
        options     : [
            { formValue: 'Cash', displayValue: 'Cash' },
            { formValue: 'Cheque', displayValue: 'Cheque' },
            { formValue: 'Money order', displayValue: 'Money order' }
        ]
    },
    {
        displayValue: 'Third party',
        caption     : 'Under section 54 of the GIPA Act, if the information you are requesting contains information about another person, business or agency, the agency may be required to consult with third parties before deciding your application. The purpose of this consultation is for the agency to determine whether the third party has an objection to disclosure of some or all of the information being requested.',
        formValue   : 'Third parties',
        type        : 'dropdown',
        options     : [{ formValue: 'Yes', displayValue: 'Yes' }, { formValue: 'No', displayValue: 'No' }] // TODO:
        // check
        // form
        // values
        // are
        // correct
    },
    {
        displayValue: 'Do you consent to this information being released on the Information and Privacy Commissioner\'s website?',
        caption     : 'Details about this application may be recorded and published on the Information and Privacy Commission website. You may object to this. For an example of what a disclosure log looks like, see: https://www.ipc.nsw.gov.au/sites/default/files/2022-03/IPC_Disclosure_Log_March%202022.pdf',
        formValue   : 'Disclosure Log',
        type        : 'dropdown',
        options     : [{ formValue: 'Yes 3', displayValue: 'Yes' }, { formValue: 'No 3', displayValue: 'No' }]
    }, // what does this map to?
    {
        displayValue: 'Are you suffering from financial hardship?',
        caption     : 'If you are suffering financial, you may be entitled ot a 50% reduction in your processing charge ($30/hour). Please attach proof, such as your pensioners card or a Centrelink card.',
        formValue   : 'Financial Hardship',
        type        : 'dropdown',
        options     : [{ formValue: 'Yes 3', displayValue: 'Yes' }, { formValue: 'No 3', displayValue: 'No' }]
    },
    {
        displayValue: 'Does this FOI request provide special benefit to the public?',
        caption     : 'If your FOI request provides special benefit to the public, you may be entitled to a 50% reduction in your processing charge ($30/hour).',
        formValue   : 'Special benefit to the public',
        type        : 'dropdown',
        options     : [//FROM Shoebridge v Forestry Corporation [2016]
            // NSWCATAD 93 (Shoebridge) at 23
            {
                formValue   : 'My application refers to public health and safety;\n',
                displayValue: 'My application refers to public health and safety;\n'
            },
            {
                formValue   : 'My application refers to the use of public funds;\n',
                displayValue: 'My application refers to the use of public funds;\n'
            },
            {
                formValue   : 'My application seeks to examine proper record keeping and legislative compliance generally by the agency in the exercise of its functions;\n',
                displayValue: 'My application seeks to examine proper record keeping and legislative compliance generally by the agency in the exercise of its functions;\n'
            },
            {
                formValue   : 'My application seeks to examine the existence of a special interest group and the benefits of accountability and transparency of decision-making by government, in particular Members of Parliament; and\n',
                displayValue: 'My application seeks to examine the existence of a special interest group and the benefits of accountability and transparency of decision-making by government, in particular Members of Parliament; and\n'
            },
            {
                formValue   : 'My application seeks to examine the need to ensure that citizens have sufficient information to enable them to actively participate and contribute to consideration of relevant issues through submissions or enquiry.',
                displayValue: 'My application seeks to examine the need to ensure that citizens have sufficient information to enable them to actively participate and contribute to consideration of relevant issues through submissions or enquiry.'
            },
            {
                formValue   : 'Other',
                displayValue: 'Other'
            }
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
            if (!formEntry.formValue || formEntry.formValue.includes('ignore_')) {
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
            A completed FOI request form has been generated. Please sign it, attach any relevant payment information, and send it to the relevant agency.
        </p>
    }


    return (
        <div className="p-20 max-w-5xl bg-white ">
            <div>
                <div>
                    <h1 className={headerTextCss}>Make an FOI request in New South Wales</h1>
                </div>
                <div className="py-10 space-y-6">
                    <p>
                        Use this form if you want to make a Freedom of Information (FOI) request in New South Wales under the
                        <i> Government Information (Public Access) Act 2009</i> (GIPA Act).
                    </p>
                    <p>
                        After completing this form, a PDF file will be generated which can be submitted to the agency in question.
                    </p>
                    <p>
                        The agency has 20 working days to process your request. If your request is not processed within this time frame, or your request is denied, you may be able to file a
                        review request. For more information, see <a href={'/nsw/review'}>here</a>.
                    </p>
                </div>
                {
                    downloadUrl && pdfFile ? <PdfViewer pdfDownloadUrl={downloadUrl} pdfFile={pdfFile} completedFormText={completedFormText}/> :
                    <FOIForm
                        formValues={formValues}
                        handleOnSubmit={handleSubmit}/>
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
