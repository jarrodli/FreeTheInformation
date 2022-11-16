import { FormikValues }                                  from 'formik'
import { promises as fs }                                from 'fs'
import { PDFDocument, PDFForm }                          from 'pdf-lib'
import React, { FunctionComponent, useEffect, useState } from 'react'
import FOIForm, { formTextCss }                          from '../../../components/GenericForm'
import PdfViewer                                         from '../../../components/PdfViewer'
import { Form, headerTextCss } from '../../nsw/apply'


interface Props {
    data: string
}

const formValues: Form[] = [
    {
        displayValue: '1. Personal information',
        formValue   : '',
        type        : 'header'
    },
    {
        displayValue: 'Agency that you are applying to',
        formValue   : 'agency',
        type        : 'input'
    },
    {
        displayValue: 'Title',
        formValue   : 'title',
        type        : 'dropdown',
        options: [
            {formValue: 'mr', displayValue: 'Mr'},
            {formValue: 'Mrs', displayValue: 'Mrs'},
            {formValue: 'Ms', displayValue: 'Ms'},
            {formValue: 'Dr', displayValue: 'Dr'},
        ]
    },
    {
        displayValue: 'Full Name',
        formValue   : 'Full Name',
        type        : 'input'
    },
    {
        displayValue: 'Contact',
        formValue   : 'email_address',
        type        : 'input'
    },
    {
        displayValue: 'Address',
        formValue   : 'address',
        type        : 'input'
    },
    {
        displayValue: 'What is your preferred contact method?',
        formValue   : 'contact_method',
        type        : 'dropdown',
        options: [
            {formValue: 'prefer_email', displayValue: 'Email'},
            {formValue: 'prefer_post', displayValue: 'Post'}
        ]
    },
    {
        displayValue: 'Are you lodging this request on behalf of another person?',
        formValue   : 'rep',
        type        : 'dropdown',
        options: [
            {formValue: 'behalf_yes', displayValue: 'Yes'},
            {formValue: 'behalf_no', displayValue: 'No'}
        ]
    },
    {
        displayValue: '2. The applicant\'s details',
        formValue   : '',
        type        : 'header', //TODO: check this??/ should it be if behalf is yes?

    },
    {
        displayValue: 'Title',
        formValue   : 'title',
        type        : 'dropdown',
        options: [
            {formValue: 'app_mr', displayValue: 'Mr'},
            {formValue: 'app_mrs', displayValue: 'Mrs'},
            {formValue: 'app_ms', displayValue: 'Ms'},
            {formValue: 'app_mr', displayValue: 'Dr'},
        ]
    },

    {
        displayValue: 'Full Name',
        formValue   : 'app_full_name',
        type        : 'input'
    },
    {
        displayValue: 'Do you have authority to make an FOI request on the applicant\'s behalf? Please attach a copy of your authority to act.',
        formValue   : 'auth',
        type        : 'dropdown',
        options: [
            {formValue: 'authority_yes', displayValue: 'Yes'},
            {formValue: 'authority_no', displayValue: 'No'}
        ]
    },
    {
        displayValue: '3. Information requested',
        formValue   : '',
        type        : 'header'
    },
    {
        displayValue: 'What information are you looking for?', formValue: 'request_details', type: 'textarea',
        caption     : 'Please provide as much information as possible. This includes things like date ranges, where the documents may be held or the subject matter the documents relate to.',
    },
    {
        displayValue: 'Do you consent to us contacting third party agencies if necessary in processing your application?',
        formValue   : 'third_parties',
        type        : 'dropdown',
        options: [
            {formValue: 'third_party_yes', displayValue: 'Yes'},
            {formValue: 'third_party_no', displayValue: 'No'}
        ]
    },
]

const CthApplyForm: FunctionComponent<Props> = ({ data }) => {
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
        window.scrollTo(0, 0)
    }

    const completedFormText = () => {
        return <p className={formTextCss}>
            A completed FOI review request form has been generated. Please sign it, attach any relevant payment
            information, and email it to the agency in question.
        </p> //TODO: fix
    }


    return (
        <div className="p-20 max-w-5xl bg-white ">
            <div>
                <div>
                    <h1 className={headerTextCss}>Make an FOI request to a Commonwealth Agency</h1>
                </div>
                <div className="py-10 space-y-6">
                    <p className={'text-black'}>
                        Use this form if you want to make a Freedom of Information (FOI) request for a Commonwealth Agency under the
                        <i> Freedom of Information Act 1982</i> (Cth) (FOI Act).
                    </p>
                    <p className={'text-black'}>
                        After completing this form, a PDF file will be generated which can be submitted to the agency in question.
                    </p>
                    <p className={'text-black'}>
                        The agency has <b>30 days</b> to process your request. If your request is not processed within this time frame, or your request is denied, you may be able to file a
                        review request. For more information, see <a className="transition duration-500 italic text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer" href={'/cth/review'}>here</a>.
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
    const data = await fs.readFile('public/forms/cth_form.pdf')
    return {
        props: {
            data: data.toString('base64')
        }
    }
}

export default CthApplyForm
