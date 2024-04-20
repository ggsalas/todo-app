import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";
import { redirect } from "next/navigation";
import { createUser, getUser } from "@/app/db";
import { SubmitButton } from "@/components/SubmitButton";

export default function Register() {
  async function register(formData: FormData) {
    "use server";
    let email = formData.get("email") as string;
    let password = formData.get("password") as string;
    let timezoneOffset = Number(formData.get("timezoneOffset"));
    let user = await getUser(email);

    if (user) {
      return "User already exists"; // TODO: Handle errors with useFormStatus
    } else {
      await createUser(email, password, timezoneOffset);
      redirect("/login");
    }
  }

  return (
    <div className="flex h-svh w-screen items-center justify-center bg-gray-50 p-4">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-500">
            Create an account with your email and password
          </p>
        </div>
        <LoginForm action={register}>
          <div>
            <label
              htmlFor="timezoneOffset"
              className="block text-xs text-gray-600 uppercase"
            >
              Timezone offset
            </label>
            <select
              name="timezoneOffset"
              id="timezoneOffset"
              className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
            >
              <option value="-12">UTC-12:00</option>
              <option value="-11">UTC-11:00</option>
              <option value="-10">UTC-10:00</option>
              <option value="-9">UTC-09:00</option>
              <option value="-8">UTC-08:00</option>
              <option value="-7">UTC-07:00</option>
              <option value="-6">UTC-06:00</option>
              <option value="-5">UTC-05:00</option>
              <option value="-4">UTC-04:00</option>
              <option value="-3">UTC-03:00</option>
              <option value="-2">UTC-02:00</option>
              <option value="-1">UTC-01:00</option>
              <option value="0">UTC±00:00</option>
              <option value="1">UTC+01:00</option>
              <option value="2">UTC+02:00</option>
              <option value="3">UTC+03:00</option>
              <option value="4">UTC+04:00</option>
              <option value="5">UTC+05:00</option>
              <option value="6">UTC+06:00</option>
              <option value="7">UTC+07:00</option>
              <option value="8">UTC+08:00</option>
              <option value="9">UTC+09:00</option>
              <option value="10">UTC+10:00</option>
              <option value="11">UTC+11:00</option>
              <option value="12">UTC+12:00</option>
            </select>
          </div>

          <SubmitButton>Sign Up</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {"Already have an account? "}
            <Link href="/login" className="font-semibold text-gray-800">
              Sign in
            </Link>
            {" instead."}
          </p>
        </LoginForm>
      </div>
    </div>
  );
}
