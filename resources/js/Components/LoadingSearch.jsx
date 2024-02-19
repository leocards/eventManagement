const LoadingSearch = () => (
    <>
        {Array.from(Array(4).keys()).map((key) => (
            <div
                key={key}
                className="animate-pulse h-16 rounded-md flex items-center px-2 cursor-pointer bg-slate-100/70"
            >
                <div className="rounded-full w-12 h-12 shrink-0 overflow-hidden pointer-events-none bg-slate-200"></div>
                <div className="pl-2 w-full">
                    <div className="h-2.5 w-full rounded-lg bg-slate-200"></div>
                    <div className="h-2.5 mt-1.5 w-20 rounded-lg bg-slate-200"></div>
                </div>
            </div>
        ))}
    </>
);

export const LoadingList = ({
    column = 3,
    grid = "grid-cols-[8rem,8rem,1fr]",
}) => {
    return (
        <div>
            {["delay-100", "delay-200", "delay-300"].map((delay, index) => (
                <div
                    key={index}
                    className={
                        "grid h-12 rounded-md bg-gray-100/40 animate-pulse items-center mb-1 " +
                        delay +
                        " " +
                        grid
                    }
                >
                    {Array.from(Array(column).keys()).map((list, index) => (
                        <div
                            key={index}
                            className="flex items-center p-2 w-full"
                        >
                            <div className="rounded-full bg-gray-300 h-2 w-full"></div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export const LoadOnSubmit = () => {
    return (
        <div className="fixed top-0 left-0 bg-black/60 w-full h-full z-[55] flex select-none backdrop-blur-[1px]">
            <div className="mx-auto my-auto text-white font-semibold text-lg uppercase">
                Loading...
            </div>
        </div>
    );
};

export default LoadingSearch;
