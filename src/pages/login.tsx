import { FaLongArrowAltRight } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";
import { Formik, Form, Field } from 'formik'
import { Link } from 'react-router-dom'

const Login = () => {

  const initialValues = {
    email: "",
    password: "",
  }

  const onSubmit = () => { }

  return (
    <div className="px-4">
      <Link to="" className="py-3 block"><IoIosArrowBack className="w-6 h-6" /></Link>
      <h2 className="py-[18px] text-[34px] font-bold">Login</h2>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {
          (formik) => {
            const { dirty } = formik
            dirty
            return (
              <Form className="pt-14">
                <div className="relative mb-2 pt-[14px] rounded bg-white shadow-sm flex flex-col">
                  <label className="px-5 text-[#9B9B9B] text-xs" htmlFor="email">Email</label>
                  <Field className="px-5 pb-4 pt-1 font-medium text-sm leading-[20px] focus:outline-none active:outline-none" type="text" name="email" id="email" required placeholder="" />
                  <IoCheckmarkSharp color="#2AA952" className="w-6 h-6 absolute right-5 top-1/2 -translate-y-1/2" />
                </div>
                <div className="relative mb-2 rounded bg-white shadow-sm flex flex-col">
                  <label className="px-5 text-[#9B9B9B] text-xs" htmlFor="password" hidden></label>
                  <Field className="px-5 py-[21.5px] font-medium text-sm leading-[20px] focus:outline-none active:outline-none" type="password" name="password" id="password" required placeholder="Password" />
                  <IoCheckmarkSharp color="#2AA952" className="w-6 h-6 absolute right-5 top-1/2 -translate-y-1/2" />
                </div>
                <p className="py-4 flex items-center justify-end text-sm font-medium"><Link to="/forgot">Forgot your password?<FaLongArrowAltRight className="ml-1 inline w-6 h-6" color="#DB3022" /></Link></p>
                <button type="submit" className="bg-[#DB3022] text-white cursor-pointer text-sm fomt-medium rounded-3xl shadow py-[14px] w-full">LOGIN</button>
              </Form>
            )
          }
        }
      </Formik>
    </div>
  )
}

export default Login
