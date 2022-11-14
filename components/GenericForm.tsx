import { Field, Formik, FormikValues } from 'formik'
import React, { FunctionComponent }    from 'react'
import { Form }                        from '../pages/nsw/form'

interface Props {
    formValues: Form[]

    handleOnSubmit(values: FormikValues): Promise<void>
}

export const formTextCss =
                 'text-xl md:text-2xl text-white hover:text-white hover:bg-opacity-20 font-inter'

export const captionTextCss =
                 'text-sm md:text-md text-white hover:text-white hover:bg-opacity-20 font-inter'

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
                                    <div>
                                        <h2 className={`${formTextCss} text-center`}>{formEntry.displayValue}</h2>
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
                                        <div key={idx} className="py-5">
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
                                        <div key={idx} className="py-5">
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
                                        <div role="group" aria-labelledby="checkbox-group"
                                             className="flex flex-col py-5"
                                             key={idx}>
                                            <label className={formTextCss}
                                                   htmlFor={formEntry.formValue}>{formEntry.displayValue}</label>
                                            {
                                                formEntry.caption && <p className={captionTextCss}>{formEntry.caption}</p>
                                            }
                                            <div className="flex flex-col pl-6">
                                                {
                                                    formEntry.options.map((entry) => {
                                                        return (
                                                            <label className={formTextCss}>
                                                                <input type="radio" name={formEntry.formValue}
                                                                       value={entry}
                                                                       onClick={handleChange}
                                                                       className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 mr-5"/>
                                                                {entry}
                                                            </label>
                                                        )
                                                    })
                                                }
                                            </div>
                                            {errors[formEntry.formValue]
                                             && touched[formEntry.formValue]
                                             && errors[formEntry.formValue]}
                                        </div>
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
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    )
}

export default FOIForm