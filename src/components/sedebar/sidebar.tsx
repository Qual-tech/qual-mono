import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="fixed top-0 z-10 flex h-screen w-16 overflow-hidden rounded-l-2xl bg-[#FFEC8A]">
      <ul className="absolute top-1/2 flex h-fit w-full -translate-y-1/2 -rotate-90 justify-center gap-6 text-lg text-slate-700">
        <li>
          <Link href="#">
            <span className="flex whitespace-nowrap">Tentang kami</span>
          </Link>
        </li>

        <li>
          <Link href="#">
            <span className="flex whitespace-nowrap">Bantuan</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
