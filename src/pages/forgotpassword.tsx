import { IoIosArrowBack } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { Formik, Form, Field } from 'formik'
import { Link } from 'react-router-dom'

const Forgot = () => {

  const initialValues = {
    email: "",
    password: "",
  }

  const onSubmit = () => { }

  return (
    <div className="px-4">
      <Link to="" className="py-3 block"><IoIosArrowBack className="w-6 h-6" /></Link>
      <h2 className="py-[18px] text-[34px] font-bold">Forgot password</h2>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {
          (formik) => {
            const { dirty } = formik
            dirty
            return (
              <Form className="pt-14">
                <p className="mb-4 text-sm fomt-medium leading-5">Please, enter your email address. You will receive a link to create a new password via email.</p>
                <div className="relative mb-2 pt-[14px] rounded bg-white shadow-sm flex flex-col">
                  <label className="px-5 text-[#9B9B9B] text-xs" htmlFor="email">Email</label>
                  <Field className="px-5 pb-4 pt-1 font-medium text-sm leading-[20px] focus:outline-none active:outline-none" type="text" name="email" id="email" required placeholder="" />
                  <IoCheckmarkSharp color="#2AA952" className="w-6 h-6 absolute right-5 top-1/2 -translate-y-1/2" />
                </div>
                <button type="submit" className="my-14 bg-[#DB3022] text-white cursor-pointer text-sm fomt-medium rounded-3xl shadow py-[14px] w-full">LOGIN</button>
              </Form>
            )
          }
        }
      </Formik>
    </div>
  )
}

export default Forgot
