import { Field, Formik }                                 from 'formik'
import { promises as fs }                                from 'fs'
import { PDFDocument, PDFForm }                          from 'pdf-lib'
import React, { FunctionComponent, useEffect, useState } from 'react'

interface Props {
    data: string
}

const NSWForm: FunctionComponent<Props> = ({ data }) => {
    const [downloadUrl, setDownloadUrl] = useState('')
    let pdfDoc: PDFDocument
    let pdfForm: PDFForm
    // console.log(data)
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

    return (
        <div>
            <Formik
                initialValues={{
                    agency           : '',
                    surname          : '',
                    givenName        : '',
                    title            : [],
                    address          : '',
                    postcode         : '',
                    telephone        : '',
                    fax              : '',
                    email            : '',
                    aboriginal       : [],
                    specialNeeds     : '',
                    getCorrespondence: false
                }}
                validate={values => {

                }}
                onSubmit={async (values, { setSubmitting }) => {
                    setTimeout(() => {
                        setSubmitting(false)
                    }, 400)
                    const fields = pdfForm.getFields()
                    pdfForm.getTextField('Agency').setText(values.agency)
                    pdfForm.getTextField('Other names').setText(values.givenName)
                    pdfForm.getTextField('Surname').setText(values.surname)
                    const pdfBytes = await pdfDoc.save()
                    const docUrl = URL.createObjectURL(
                        new Blob([pdfBytes], { type: 'application/pdf' })
                    )
                    setDownloadUrl(docUrl)
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit} className="flex flex-col ">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="agency">Agency that you
                                are looking to get information from</label>
                            <Field
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                type="text"
                                name="agency"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.agency}
                            />
                            {errors.agency && touched.agency && errors.agency}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="givenName">First
                                Name</label>
                            <Field
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                type="text"
                                name="givenName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.givenName}
                            />
                            {errors.givenName && touched.givenName && errors.givenName}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="surname">Last
                                Name</label>
                            <Field
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                type="text"
                                name="surname"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.surname}
                            />
                            {errors.surname && touched.surname && errors.surname}
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
            {
                downloadUrl && <a href={downloadUrl}>Download</a>
            }
        </div>
    )
}

export async function getStaticProps(): Promise<{ props: Props }> {
    const data = await fs.readFile('public/forms/nsw.pdf')
    // const data = await
    // fetch("https://www.ipc.nsw.gov.au/sites/default/files/2020-08/GIPA_Access_Application_Form_other_agency_August_2020_Fillable.pdf").then((res)
    // => res.arrayBuffer()) const pdfDoc = await PDFDocument.load(data) const form = pdfDoc.getForm() const fields =
    // form.getFields() const fieldNames = fields.map((field) => field.getName()) console.log(data)
    return {
        props: {
            data: data.toString('base64')
        }
    }
}

export default NSWForm
