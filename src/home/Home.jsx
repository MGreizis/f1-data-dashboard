import Login from "../login/LoginPage";
import F1 from "../assets/f1.jpg";

export const Home = () => (
  // !! implement F1 BG picture later
  <>
    <h2 className="text-xl font-bold text-eggplant text-center mb-4">Welcome to the Home Page</h2>
      <div className="flex h-full flex-col items-center justify-center bg-indigo-100" style={{ backgroundImage: `url(${F1})` }}>
    <Login />
  </div>
  </>
);
