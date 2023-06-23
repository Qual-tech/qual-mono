import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 ml-16 mr-2 flex items-center justify-between bg-[#FBFAF2] p-2 px-5">
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
            <div className="relative h-10 w-10 overflow-hidden rounded-full object-cover object-center">
              <Image
                className="object-cover object-center"
                fill
                src="https://safebooru.org//samples/4185/sample_a1789a1c4212c0de8d01217b7b0f87c4e7ce227c.jpg"
                alt="ina"
              />
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
