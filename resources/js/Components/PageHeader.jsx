import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function PageHeader({ children, links = [], title, onHome }) {
    return (
        <div className="mb-5 flex items-center justify-between" id="pageHeader">
            <div className="self-start select-none">
                <div className="text-2xl font-gotham text-blue-900">
                    {title}
                </div>
                <div className="text-sm text-slate-400">
                    <ul className="flex items-center">
                        <li
                            onClick={onHome}
                            className={
                                "flex items-center " +
                                (onHome
                                    ? "cursor-pointer hover:text-blue-500"
                                    : "")
                            }
                        >
                            <HomeIcon className="w-4 h-4" />
                            <ChevronRightIcon className="w-4 h-4" />
                        </li>
                        {links.map((Item, index) => {
                            let isNotLast =
                                links.length > 1 && links.length != ++index
                                    ? true
                                    : false;
                            return (
                                <li
                                    onClick={
                                        onHome && isNotLast ? onHome : null
                                    }
                                    className={
                                        "flex items-center " +
                                        (isNotLast
                                            ? "cursor-pointer hover:text-blue-500"
                                            : "")
                                    }
                                    key={index}
                                >
                                    {Item}
                                    {isNotLast ? (
                                        <div>
                                            <ChevronRightIcon className="w-4 h-4" />
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {children}
        </div>
    );
}
