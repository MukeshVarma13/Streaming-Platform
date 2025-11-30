import { Outlet } from "react-router";

const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-zinc-900 p-8 sm:p-10 rounded-lg shadow-xl max-w-md w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthPage;
