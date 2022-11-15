import { Field, Formik, FormikValues } from 'formik'
import React, { FunctionComponent } from 'react'
import { Form }                     from '../pages/nsw/apply'

interface Props {
    formValues: Form[]

    handleOnSubmit(values: FormikValues): Promise<void>
}

export const headerTextCss = 'text-xl md:text-2xl font-inter'

export const formTextCss =
                 'font-inter'

export const captionTextCss =
                 'text-sm md:text-md font-normal py-4'

//TODO: add autocomplete api for address? https://developers.google.com/maps/documentation/javascript/place-autocomplete

const FOIForm: FunctionComponent<Props> = ({ formValues, handleOnSubmit }) => {
    const initialValues = formValues.map((val) => {
        return { [val.formValue]: '' }
    })
    return (
        <Formik
            initialValues={Object.assign({}, ...initialValues)}
            validate={values => {

            }}
            onSubmit={async (values, { setSubmitting }) => {
                await handleOnSubmit(values)
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
                    {
                        formValues.map((formEntry, idx) => {
                            if (formEntry.type === 'header') {
                                return (
                                    <div className="pb-2 border-b-2 border-black mb-4">
                                        <h2 className={`${headerTextCss}`}>{formEntry.displayValue}</h2>
                                    </div>
                                )
                            }
                            if (!formEntry.formValue) {
                                return
                            }
                            if (formEntry.if && values[formEntry.if.formValue] !== formEntry.if.type) {
                                return
                            }
                            switch (formEntry.type) {
                                case 'input': {
                                    return (
                                        <div key={idx} className="py-3">
                                            <label className={formTextCss}
                                                   htmlFor={formEntry.formValue}>{formEntry.displayValue}</label>
                                            {
                                                formEntry.caption && <p className={captionTextCss}>{formEntry.caption}</p>
                                            }
                                            <Field
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-10 my-3"
                                                type="text"
                                                name={formEntry.formValue}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values[formEntry.formValue]}
                                            />
                                            {errors[formEntry.formValue]
                                             && touched[formEntry.formValue]
                                             && errors[formEntry.formValue]}
                                        </div>
                                    )
                                }
                                case 'textarea': {
                                    return (
                                        <div key={idx} className="py-3">
                                            <label className={formTextCss}
                                                   htmlFor={formEntry.formValue}>{formEntry.displayValue}</label>
                                            {
                                                formEntry.caption && <p className={captionTextCss}>{formEntry.caption}</p>
                                            }
                                            <textarea
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm my-3"
                                                rows={6}
                                                name={formEntry.formValue}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values[formEntry.formValue]} // TODO: split results based on
                                                                                    // word count
                                            />
                                            {errors[formEntry.formValue]
                                             && touched[formEntry.formValue]
                                             && errors[formEntry.formValue]}
                                        </div>
                                    )
                                }
                                case 'dropdown': {
                                    if (!Array.isArray(formEntry.options)) {
                                        return
                                    }
                                    return (
                                        <div className={"py-3"}>
                                            <label htmlFor={formEntry.formValue} className={formTextCss}>
                                                {formEntry.displayValue}
                                            </label>
                                            {
                                                formEntry.caption && <p className={captionTextCss}>{formEntry.caption}</p>
                                            }
                                            <select
                                                id={formEntry.formValue}
                                                name={formEntry.formValue}
                                                onChange={handleChange}
                                                defaultValue={formEntry.options[0].formValue}
                                                className="mt-3 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                            >
                                                {
                                                    formEntry.options.map((entry) => {
                                                         return (
                                                                <option value={entry.formValue}>
                                                                    {entry.displayValue}
                                                                </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        //     {errors[formEntry.formValue]
                                        //      && touched[formEntry.formValue]
                                        //      && errors[formEntry.formValue]}
                                        // </div>
                                    )
                                }
                                case 'file': {
                                    return (
                                        <div key={idx}>
                                            <label
                                                className={formTextCss}
                                                htmlFor="file_input">{formEntry.displayValue}</label>
                                            {
                                                formEntry.caption && <p className={captionTextCss}>{formEntry.caption}</p>
                                            }
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                          stroke-width="2"
                                                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                                                </svg>
                                                <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                    Attach a file</p>
                                                <input type="file" className="opacity-0"/>
                                            </div>
                                            {errors[formEntry.formValue]
                                             && touched[formEntry.formValue]
                                             && errors[formEntry.formValue]}
                                        </div>
                                    )
                                }
                                default: {
                                    console.log(formEntry.type)
                                    return (
                                        <div>

                                        </div>
                                    )
                                }
                            }

                        })
                    }
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-[#17305B] px-6 py-3 my-5 text-base font-medium text-white shadow-sm hover:bg-[#1F3D6A] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    )
}

export default FOIForm