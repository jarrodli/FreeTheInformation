import Image from "next/image";
import { ChangeEvent, useState } from "react";

const nswNavigation = [
    { name: "Make a Request", href: "/nsw/apply" },
    { name: "Review a Request", href: "/nsw/review" },
];

const cthNavigation = [
    { name: "Make a Request", href: "/cth/apply" },
    { name: "Review a Request", href: "/cth/review" },
];

const qldNavigation = [
    { name: "Make a Request", href: "/qld/apply" },
    { name: "Review a Request", href: "/qld/review" },
];

const nav = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Code", href: "https://github.com/jarrodli/FreeTheInformation" },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

type States = "NSW" | "Cth" | "Qld";

const states = ["NSW", "Cth", "Qld"];

const Header = () => {
    const [currState, setCurrState] = useState<States>("Cth");
    return (
        <header className="flex-1 w-full">
            <nav
                className="flex flex-row items-center mx-auto border-b border-white px-8"
                aria-label="Top"
            >
                <div className="flex w-full items-center justify-between py-6">
                    <div className="w-full space-x-8 lg:block">
                        {nav.map((n) => {
                            return (
                                <a
                                    key={n.name}
                                    href={n.href}
                                    className="text-base font-medium text-white hover:text-indigo-50"
                                >
                                    {n.name}
                                </a>
                            );
                        })}
                    </div>
                </div>
                <div className={"flex flex-row items-center justify-end"}>
                    <div className="flex flex-row space-x-8 mx-4 items-center text-center">
                        {currState === "NSW"
                            ? nswNavigation.map((link) => (
                                  <a
                                      key={link.name}
                                      href={link.href}
                                      className="text-base font-medium text-white hover:text-indigo-50"
                                  >
                                      {link.name}
                                  </a>
                              ))
                            : currState === "Cth"
                            ? cthNavigation.map((link) => (
                                  <a
                                      key={link.name}
                                      href={link.href}
                                      className="text-base font-medium text-white hover:text-indigo-50"
                                  >
                                      {link.name}
                                  </a>
                              ))
                            : qldNavigation.map((link) => (
                                  <a
                                      key={link.name}
                                      href={link.href}
                                      className="text-base font-medium text-white hover:text-indigo-50"
                                  >
                                      {link.name}
                                  </a>
                              ))}
                    </div>
                    <select
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            e.preventDefault();
                            setCurrState(e.target.value as States);
                        }}
                        id="location"
                        name="location"
                        className="mt-1 block rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-black"
                        defaultValue="Canada"
                    >
                        <option>Cth</option>
                        <option>NSW</option>
                        <option>Qld</option>
                    </select>
                </div>
            </nav>
        </header>
    );
};

export default Header;
