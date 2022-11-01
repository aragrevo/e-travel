import Link from "next/link";
import { useRouter } from "next/router";
import { Switch } from "./Switch";

const menu = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/favorites",
    title: "Favorites",
  },
];

export const Navbar = () => {
  const router = useRouter();
  const changeDarkMode = (value: boolean) => {
    value
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  };
  return (
    <nav className="absolute top-0 left-0 z-10 flex w-full flex-wrap items-center text-base font-semibold shadow-sm">
      {menu.map(({ path, title }) => (
        <Link
          className={`${
            router.asPath === path ? "after:scale-x-100" : "after:scale-x-0"
          } relative mx-2 py-2 transition-all after:absolute after:bottom-0 after:left-0 after:w-full after:border-b-2 after:border-black after:transition-all after:duration-700 after:content-['']`}
          href={path}
          key={path}
        >
          {title}
        </Link>
      ))}
      <Switch className="ml-auto mr-2.5" action={changeDarkMode} />
    </nav>
  );
};
