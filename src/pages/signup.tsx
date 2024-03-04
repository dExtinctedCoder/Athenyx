import { FaLongArrowAltRight } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { Formik, Form, Field, ErrorMessage, FormikState } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

interface ValuesType {
  name: string
  email: string
  password: string
}

const Signup = () => {
  const navigate = useNavigate()
  const initialValues = {
    name: "",
    email: "",
    password: "",
  }

  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'name is too short').required('This field is required'),
    email: Yup.string().email("Invalid email format").required("This field is required"),
    password: Yup.string().min(7, "Password cannot be less than 7 characters").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/, "Password should contain at least one capital letter, one small letter and one number (e.g Johndoe1)").required("This field is required"),
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
      <h2 className="py-[18px] text-[34px] font-bold">Sign up</h2>
      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        {
          (formik) => {
            const { isSubmitting, errors, touched } = formik
            return (
              <Form className="pt-14">
                <div className="relative mb-2 pt-[14px] rounded bg-white shadow-sm flex flex-col">
                  <label className="px-5 text-[#9B9B9B] text-xs" htmlFor="name">Name</label>
                  <Field className="px-5 pb-4 pt-1 font-medium text-sm leading-[20px] focus:outline-none active:outline-none" type="text" name="name" id="name" placeholder="" required />
                  {(!errors.name && touched.name) ?
                    <IoCheckmarkSharp color="#2AA952" className="w-6 h-6 absolute right-5 top-1/2 -translate-y-1/2" /> : ""}
                </div>
                <ErrorMessage className="text-red-600 text-sm" key="name_field--error_id" id="name_field--error_id" component="small" name="name" />
                <div className="relative mb-2 pt-[14px] rounded bg-white shadow-sm flex flex-col">
                  <label className="px-5 text-[#9B9B9B] text-xs" htmlFor="email">Email</label>
                  <Field className="px-5 pb-4 pt-1 font-medium text-sm leading-[20px] focus:outline-none active:outline-none" type="text" name="email" id="email" placeholder="" required />
                  {(!errors.email && touched.email) ?
                    <IoCheckmarkSharp color="#2AA952" className="w-6 h-6 absolute right-5 top-1/2 -translate-y-1/2" /> : ""}
                </div>
                <ErrorMessage className="text-red-600 text-sm" key="email_field--error_id" id="email_field--error_id" component="small" name="email" />
                <div className="relative mb-2 rounded bg-white shadow-sm flex flex-col">
                  <label className="px-5 text-[#9B9B9B] text-xs" htmlFor="password" hidden></label>
                  <Field className="px-5 py-[21.5px] font-medium text-sm leading-[20px] focus:outline-none active:outline-none" type="password" name="password" id="password" placeholder="Password" required />
                  {(!errors.password && touched.password) ?
                    <IoCheckmarkSharp color="#2AA952" className="w-6 h-6 absolute right-5 top-1/2 -translate-y-1/2" /> : ""}
                </div>
                <ErrorMessage className="text-red-600 text-sm" key="password_field--error_id" id="password_field--error_id" component="small" name="password" />
                <p className="py-4 flex items-center justify-end text-sm font-medium"><Link to="/login">Already have an account? <FaLongArrowAltRight className="ml-1 inline w-6 h-6" color="#DB3022" /></Link></p>
                <button disabled={isSubmitting} type="submit" className="bg-[#DB3022] disabled:bg-gray-400 disabled:opacity-30 disabled:cursor-not-allowed text-white cursor-pointer text-sm fomt-medium rounded-3xl shadow py-[14px] w-full">SIGN UP</button>
              </Form>
            )
          }
        }
      </Formik>
    </div>
  )
}

export default Signup
