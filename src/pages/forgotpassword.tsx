import { IoIosArrowBack } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage, FormikState } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

type ValuesType = {
  email: string
}

const Forgot = () => {
  const navigate = useNavigate()
  const initialValues = {
    email: "",
    password: "",
  }

  const validationSchema = Yup.object({
    email: Yup.string().email("Not a valid email address. Should be your@email.com").required("This field is required"),
  })

  const onSubmit = (values: ValuesType, { resetForm }: { resetForm: (nextState?: Partial<FormikState<ValuesType>>) => void }) => {
    console.log(values);
    resetForm()
  }
  return (
    <div className="px-4">
      <div className="py-3">
        <IoIosArrowBack fontSize="24px" onClick={() => navigate(-1)} className="w-6 h-6 cursor-pointer" />
      </div>
      <h2 className="py-[18px] text-[34px] font-bold">Forgot password</h2>
      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        {
          (formik) => {
            const { isSubmitting, errors, touched } = formik
            return (
              <Form className="pt-14">
                <p className="mb-4 text-sm fomt-medium leading-5">Please, enter your email address. You will receive a link to create a new password via email.</p>
                <div style={{ border: (errors.email && touched.email) ? '2px solid red' : 'none' }} className="relative mb-2 pt-[14px] rounded bg-white shadow-sm flex flex-col">
                  <label className="px-5 text-[#9B9B9B] text-xs" htmlFor="email">Email</label>
                  <Field className="px-5 pb-4 pt-1 font-medium text-sm leading-[20px] focus:outline-none active:outline-none" type="text" name="email" id="email" required placeholder="" />
                  {(!errors.email && touched.email) ?
                    <IoCheckmarkSharp color="#2AA952" className="w-6 h-6 absolute right-5 top-1/2 -translate-y-1/2" /> : ""}
                </div>
                <ErrorMessage className="text-red-600 text-sm inline-block mb-4" key="email_field--error_id" id="email_field--error_id" component="small" name="email" />
                <button disabled={isSubmitting} type="submit" className="bg-[#DB3022] disabled:bg-gray-400 disabled:opacity-30 disabled:cursor-not-allowed text-white cursor-pointer text-sm fomt-medium rounded-3xl shadow py-[14px] w-full">SIGN UP</button>
              </Form>
            )
          }
        }
      </Formik>
    </div>
  )
}

export default Forgot
