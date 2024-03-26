import LoginButton from "./LoginButton";
// import F1 from "../../public/f1.jpg";

export const LoginForm = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-eggplant">
      <form className="w-full md:w-1/3 rounded-lg">
        <h2 className="text-2xl text-center font-bold text-buff mb-8">Login</h2>
        <div className="px-12 pb-10">
          <div className="w-full mb-2">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Email Address"
                className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <div className="w-full mb-2">
            <div className="flex items-center">
              <input
                type="password"
                placeholder="Password"
                className="w-full border rounded px-3 py-2 mb-4 text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <LoginButton buttonText="Login" />
          <LoginButton buttonText="Register" />
        </div>
      </form>
    </div>
  );
};

// export default LoginForm;