import { FunctionComponent, useState } from 'react'
import { Document, Page }              from 'react-pdf'
import { textCss }                     from '../pages/guide/Guide'

interface Props {
    pdfDownloadUrl: string,
    pdfFile: Uint8Array,
    completedFormText(): JSX.Element
}

const PdfViewer: FunctionComponent<Props> = ({pdfDownloadUrl, pdfFile, completedFormText}) => {


    return (
        <div className='flex flex-col items-center align-start h-screen'>
            <div>
                {completedFormText()}
            </div>
            <div className='mt-10'>
                <button
                    onClick={() => window.location.assign(pdfDownloadUrl)}
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-[#17305B] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-[#1F3D6A] focus:outline-none focus:ring-2 focus:ring-[#AC315A] focus:ring-offset-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                    </svg>
                    View completed form
                </button>
            </div>
        </div>
    )

}

export default PdfViewer