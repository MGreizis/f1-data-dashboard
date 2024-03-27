import Login from "../login/LoginPage";
// import F1 from "../assets/f1.jpg";

export const Home = () => {
  return (
    <>
      <h2 className="text-xl font-bold text-eggplant text-center my-4">
        F1 Dashboard
      </h2>
      <div className="flex max-h-full flex-col items-center justify-center">
        <Login />
      </div>
    </>
  );
};
