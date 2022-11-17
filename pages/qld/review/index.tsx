import { FormikValues }                                  from 'formik'
import { promises as fs }                                from 'fs'
import { PDFDocument, PDFForm }                          from 'pdf-lib'
import React, { FunctionComponent, useEffect, useState } from 'react'
import FOIForm, { formTextCss }                          from '../../../components/GenericForm'
import PdfViewer                                         from '../../../components/PdfViewer'
import { Form, headerTextCss }                           from '../../nsw/apply'

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
        displayValue: 'Title',
        formValue   : 'title',
        type        : 'input'
    },
    {
        displayValue: 'Given Name',
        formValue   : 'given-name',
        type        : 'input'
    },
    {
        displayValue: 'Last Name',
        formValue   : 'last-name',
        type        : 'input'
    },
    {
        displayValue: 'Phone number',
        formValue   : 'phone-number',
        type        : 'input'
    },
    {
        displayValue: 'Email address',
        formValue   : 'email-address',
        type        : 'input'
    },
    {
        displayValue: 'What is your referred mode of contact?',
        formValue   : 'Preferred mode of contact',
        type        : 'input'
    },
    {
        displayValue: 'Address',
        formValue   : 'address',
        type        : 'input'
    },
    {
        displayValue: 'City/town',
        formValue   : 'city',
        type        : 'input'
    },
    {
        displayValue: 'State',
        formValue   : 'state',
        type        : 'input'
    },
    {
        displayValue: 'Postcode',
        formValue   : 'postcode',
        type        : 'input'
    },
    {
        displayValue: 'Do you need an interpreter?',
        formValue   : 'interpreter',
        type        : 'dropdown',
        options     : [{ formValue: 'intp-yes', displayValue: 'Yes' }, { formValue: 'intp-no', displayValue: 'No' }]
    },
    {
        displayValue: 'What language interpreter do you need?',
        formValue   : 'int-lang',
        type        : 'input',
        if          : { formValue: 'interpreter', type: 'Yes' }
    },
    {
        displayValue: 'Do you have a disability or special need? Please indicate what assistance you require.',
        formValue   : 'Disability or other special need',
        type        : 'input'
    },
    {
        displayValue: 'Do you have a representative for this matter?',
        formValue   : 'ignore-behalf',
        type        : 'dropdown',
        options     : [{ formValue: 'Yes', displayValue: 'Yes' }, { formValue: 'No', displayValue: 'No' }]
    },
    {
        displayValue: 'Agent\'s details',
        formValue   : '',
        type        : 'header',
        if          : { formValue: 'behalf', type: 'Yes' }
    },
    {
        displayValue: 'Title',
        formValue   : 'Agent title',
        type        : 'input',
        if          : { formValue: 'behalf', type: 'Yes' }
    },
    {
        displayValue: 'Given Name',
        formValue   : 'Agent first name',
        type        : 'input',
        if          : { formValue: 'behalf', type: 'Yes' }
    },
    {
        displayValue: 'Last Name',
        formValue   : 'Agent last name',
        type        : 'input',
        if          : { formValue: 'behalf', type: 'Yes' }
    },
    {
        displayValue: 'Company',
        formValue   : 'Company name',
        type        : 'input',
        if          : { formValue: 'behalf', type: 'Yes' }
    },
    {
        displayValue: 'Phone number',
        formValue   : 'Agent phone number',
        type        : 'input',
        if          : { formValue: 'behalf', type: 'Yes' }
    },
    {
        displayValue: 'Email address',
        formValue   : 'Agent email address',
        type        : 'input',
        if          : { formValue: 'behalf', type: 'Yes' }
    },
    {
        displayValue: 'Address',
        formValue   : 'Agent postal address - line 1',
        type        : 'input',
        if          : { formValue: 'behalf', type: 'Yes' }
    },
    {
        displayValue: 'City/town',
        formValue   : 'Agent postal address - city',
        type        : 'input',
        if          : { formValue: 'behalf', type: 'Yes' }
    },
    {
        displayValue: 'State',
        formValue   : 'Agent postal address - state',
        type        : 'input',
        if          : { formValue: 'behalf', type: 'Yes' }
    },
    {
        displayValue: 'Postcode',
        formValue   : 'Agent postal address - postcode',
        type        : 'input',
        if          : { formValue: 'behalf', type: 'Yes' }
    },
    {
        displayValue: '2. Initial application details',
        formValue   : '',
        type        : 'header',
    },
    { displayValue: 'Name of Agency/Minister you requested information from', formValue: 'Agency', type: 'input' },
    { displayValue: 'When did you apply?', formValue: 'date-applied', type: 'input' },
    {
        displayValue: 'Have you received a decision within the required timeframe?',
        formValue   : 'received_dec',
        type        : 'dropdown',
        options     : [{ formValue: 'timeframe-yes', displayValue: 'Yes' }, { formValue: 'timeframe-no', displayValue: 'No' }]
    },
    {
        displayValue: 'When was the decision due?',
        formValue   : 'due_date',
        type        : 'input',
        if          : { formValue: 'received_dec', type: 'timeframe-no' }
    },
    {
        displayValue: 'Did you receive an Agency or Minister\'s reference number? If so, please enter it below.',
        formValue   : 'ref_num',
        type        : 'input'
    },
    {
        displayValue: 'Do you know the Agency contact person/decision maker? If so, please enter their name below.',
        formValue   : 'Agency contact',
        type        : 'input'
    },
    {
        displayValue: 'When was the date on the decision letter?',
        formValue   : 'Date on decision letter',
        type        : 'input'
    },
    {
        displayValue: 'When did you receive the decision letter?',
        formValue   : 'Date you received the decision letter',
        type        : 'input'
    },
    {
        displayValue: 'Did you apply for an internal review of the agency or Minister\'s decision?',
        formValue   : 'int_rev',
        type        : 'dropdown',
        options     : [{ formValue: 'int-review-yes', displayValue: 'Yes' }, { formValue: 'int-review-no', displayValue: 'No' }]
    },
    {
        displayValue: 'When did you apply for an internal review?',
        formValue   : 'Date you applied for internal review',
        type        : 'input',
        if          : { formValue: 'int_rev', type: 'int-review-yes' }
    },
    {
        displayValue: 'Did you receive an internal review decision within the required time period?',
        caption: 'An agency has 20 business days to complete an internal review',
        formValue   : 'int_rev_decision',
        type        : 'dropdown',
        options     : [{ formValue: 'int-review-decision-yes', displayValue: 'Yes' }, { formValue: 'int-review-decision-no', displayValue: 'No' }]
    },
    {
        displayValue: 'When was the internal review decision due?',
        formValue   : 'Date internal review was due',
        type        : 'input',
        if          : { formValue: 'int_rev_decision', type: 'int-review-decision-no' }
    },
    {
        displayValue: 'Who was the decision maker for the internal review decision?',
        formValue   : 'Agency contact - internal review',
        type        : 'input',
        if          : { formValue: 'int_rev_decision', type: 'int-review-decision-yes' }
    },
    {
        displayValue: 'What was the date on the internal review decision letter?',
        formValue   : 'Date internal review decision letter',
        type        : 'input',
        if          : { formValue: 'int_rev_decision', type: 'int-review-decision-yes' }
    },
    {
        displayValue: '3. Details about your request',
        formValue   : '',
        type        : 'header',
    },
    {
        displayValue: 'Please provide some background about why you are seeking an external review.',
        formValue   : 'request_details',
        type        : 'textarea'
    },
    {
        displayValue: 'Please provide provide any additional details that may be useful.',
        formValue   : 'other_info',
        type        : 'textarea'
    },
]


const QldReviewForm: FunctionComponent<Props> = ({ data }) => {
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
            information, and email it to <a className={"transition duration-500 italic text-blue-500 hover:text-gray-400 hover:underline hover:decoration-2 hover:decoration-blue-500 hover:cursor-pointer"} href={'mailto:administration@oic.qld.gov.au'}>administration@oic.qld.gov.au</a>
        </p>
    }


    return (
        <div className="p-20 max-w-5xl bg-white">
            <div>
                <div>
                    <h1 className={headerTextCss}>Review an FOI request in Queensland</h1>
                </div>
                <div className="py-10 space-y-6">
                    <p className={'text-black'}>
                        Use this form if you want the outcome of your Freedom of Information (FOI) request to be reviewed in Queensland  under s 92 of the
                        <i> Right to Information Act 2009</i> (RTI Act) by the Qld Office of the Information Commissioner (OIC).
                    </p>
                    <p className={'text-black'}>
                        The OIC will conduct a merit review (e.g., look at
                        your request and reconsiders it and
                        determine what the correct decision should have been.
                    </p>
                    <p className={'text-black'}>
                        You have <b>20 working days</b> from the time you received the outcome of your review to file a request.
                    </p>
                    <p className={'text-black'}>
                        An external review is <i>free</i>.
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
    const data = await fs.readFile('public/forms/qld_review.pdf')
    return {
        props: {
            data: data.toString('base64')
        }
    }
}

export default QldReviewForm