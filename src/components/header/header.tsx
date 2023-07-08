import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const { data, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 ml-16 mr-2 flex items-center justify-between bg-[#FBFAF2] p-2 px-5 z-50">
      <Link href="/">
        <span className="font-semibold">Qual</span>
      </Link>

      <nav>
        <ul className="flex items-center gap-5">
          <li>
            <Link href="/test">Test</Link>
          </li>
          <li>
            <Link href="/">Pricing plan</Link>
          </li>

          <li>
            {status == "authenticated" ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(true)}
                  className="relative h-10 w-10 overflow-hidden rounded-full object-cover object-center"
                >
                  <Image
                    className="object-cover object-center"
                    fill
                    src={
                      data.user.image ??
                      "https://safebooru.org//samples/4185/sample_a1789a1c4212c0de8d01217b7b0f87c4e7ce227c.jpg"
                    }
                    alt="profile"
                  />
                </button>

                <div
                  className="absolute right-0 top-0 flex-col gap-y-2 rounded-md bg-white p-4 shadow-xl"
                  style={{ display: isMenuOpen ? "flex" : "none" }}
                >
                  <div className="ml-auto">
                    <button onClick={() => setIsMenuOpen(false)}>x</button>
                  </div>
                  <button onClick={() => void signOut()}>Keluar</button>
                </div>
              </div>
            ) : (
              <div>
                <button onClick={() => void signIn()}>Masuk</button>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
