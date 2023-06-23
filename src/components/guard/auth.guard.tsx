import { signIn, useSession } from "next-auth/react";

const AuthGuard: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  useSession({
    required: true,
    onUnauthenticated() {
      void signIn();
    },
  });

  return <>{children}</>;
};

export default AuthGuard;
