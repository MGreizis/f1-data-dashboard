import LoginButton from "./LoginButton";

export const LoginForm = () => {
  return (
    <main className="w-[90%] min-h-96 flex items-center justify-center bg-taupe rounded-md">
      <form className="w-full md:w-1/3 rounded-lg">
        <h2 className="text-2xl text-center font-bold my-4">Login</h2>
        <div className="px-12 pb-10">
          <div className="w-full mb-2">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Email Address"
                className="w-full border border-amaranth rounded px-3 py-2 my-4 text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <div className="w-full mb-2">
            <div className="flex items-center">
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-amaranth rounded px-3 py-2 mb-4 text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <LoginButton buttonText="Login" path="/dashboard"/>
          <LoginButton buttonText="Register" path="/dashboard"/>
        </div>
      </form>
    </main>
  );
};