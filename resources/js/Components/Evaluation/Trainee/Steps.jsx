import styled from "styled-components";

export default function Steps({ steps }) {
    return (
        <div className="bg-white ring-1 ring-slate-200 p-4 mt-5 rounded-lg px-16 pb-9">
            <div className="flex justify-between w-full">
                <div className="relative w-full">
                    <Bullet
                        className="relative"
                        $active={steps >= 1 && "bg-blue-600 text-blue-700"}
                    >
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 font-medium text-sm uppercase w-fit whitespace-nowrap">
                            Step 1
                        </div>
                    </Bullet>

                    <div className={"absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 -z-5 "+(steps >= 2 ? "bg-blue-300" : "bg-gray-200/70" )}></div>
                </div>
                <div className="relative w-full">
                    <Bullet
                        className="relative"
                        $active={steps >= 2 ? "bg-blue-600 text-blue-700" : ""}
                    >
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 font-medium text-sm uppercase w-fit whitespace-nowrap">
                            Step 2
                        </div>
                    </Bullet>
                    <div className={"absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 -z-5 "+(steps === 3 ? "bg-blue-300" : "bg-gray-200/70" )}></div>
                </div>
                <div className="relative flex">
                    <Bullet className="ml-auto" $active={steps == 3 ? "bg-blue-600 text-blue-700" : ""}>
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 font-medium text-sm uppercase w-fit whitespace-nowrap">
                            Step 3
                        </div>
                    </Bullet>
                </div>
            </div>
        </div>
    );
}

const Bullet = styled.div.attrs((props) => ({
    className: `${props.$active?props.$active:'bg-gray-200'} rounded-full w-5 h-5 z-20`
}))``