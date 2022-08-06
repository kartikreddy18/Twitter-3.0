import { BsTwitter } from "react-icons/bs";
import { useMoralis } from "react-moralis";

const Login = () => {
  const { authenticate, isAuthenticating } = useMoralis();
  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center flex-col gap-2">
      <BsTwitter size="5rem" className="text-cyan-500" />
      <button
        className="text-slate-200 bg-gray-700 p-5 rounded font-semibold"
        disabled={isAuthenticating}
        onClick={() =>
          authenticate({
            type: "sol",
          })
        }
      >
        Connect with Phantom Wallet
      </button>
    </div>
  );
};

export default Login;
