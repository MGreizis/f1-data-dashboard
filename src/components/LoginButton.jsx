import { useNavigate } from "react-router-dom";

const LoginButton = ({ buttonText, path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <button type="submit"
      className="w-full py-2 mt-4 rounded-full bg-buff text-eggplant focus:outline-none"
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};

export default LoginButton;
