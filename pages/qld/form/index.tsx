import { FormikValues }                                  from 'formik'
import { promises as fs }                                from 'fs'
import { PDFDocument, PDFForm }                          from 'pdf-lib'
import React, { FunctionComponent, useEffect, useState } from 'react'
import FOIForm                                           from '../../../components/GenericForm'
import { textCss }                                       from '../../guide/Guide'

interface Props {
    data: string
}

const QLDForm: FunctionComponent<Props> = ({ data }) => {
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


    return (
        <div className="min-h-screen w-screen bg-midnights bg-fixed md:bg-background md:bg-no-repeat md:bg-cover">
            {/*<div className="flex flex-col items-center justify-center p-20 max-w-3/4">*/}
            {/*    <div>*/}
            {/*        <p className={textCss}>NSW FORM</p>*/}
            {/*    </div>*/}
            {/*    <FOIForm formValues={formValues} handleOnSubmit={handleSubmit}/>*/}
            {/*    {*/}
            {/*        downloadUrl && <a href={downloadUrl}>Download</a>*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    )
}

export async function getStaticProps(): Promise<{ props: Props }> {
    const data = await fs.readFile('public/forms/qld.pdf')
    return {
        props: {
            data: data.toString('base64')
        }
    }
}

export default QLDForm
