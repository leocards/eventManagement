import {
    VerySatisfied,
    Satisfied,
    Neutral,
    Dissatisfied,
    VeryDissatisfied,
    VerySatisfiedFilled,
    SatisfiedFilled,
    VeryDissatisfiedFilled,
    DissatisfiedFilled,
    NeutralFilled,
} from "@/Components/SentimentsIcons";

export default function LikertScale({ selected, error, onSelect = () => {} }) {
    return (
        <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row mt-4 justify-end sm:justify-between md:px-10 text-gray-400/80">
            <LikertButton
                label="Poor"
                active={selected === 1}
                onClick={() => onSelect(1)}
            >
                {selected === 1 ? <VeryDissatisfiedFilled /> : <VeryDissatisfied />}
            </LikertButton>
            <LikertButton
                label="Fair"
                active={selected === 2}
                onClick={() => onSelect(2)}
            >
                {selected === 2 ? <DissatisfiedFilled /> : <Dissatisfied />}
            </LikertButton>
            <LikertButton
                label="Satisfactory"
                active={selected === 3}
                onClick={() => onSelect(3)}
            >
                {selected === 3 ? <NeutralFilled /> : <Neutral />}
            </LikertButton>
            <LikertButton
                label="Very Satisfactory"
                active={selected === 4}
                onClick={() => onSelect(4)}
            >
                {selected === 4 ? <SatisfiedFilled /> : <Satisfied />}
            </LikertButton>
            <LikertButton
                label="Excellent"
                active={selected === 5}
                onClick={() => onSelect(5)}
            >
                {selected === 5 ? <VerySatisfiedFilled /> : <VerySatisfied />}
            </LikertButton>
        </div>
    );
}

const LikertButton = ({ active, children, label, ...props }) => {
    const activeState = "text-blue-500";
    const inactiveState = "hover:text-gray-700";

    return (
        <button
            {...props}
            className={
                "text-xs font-medium flex sm:flex-col items-center group sm:gap-0 gap-3 " +
                (active ? activeState : inactiveState)
            }
        >
            {children}
            <div
                className={
                    active
                        ? activeState
                        : "text-gray-500 group-hover:text-current text-wrap sm:text-xs text-base"
                }
            >
                {label}
            </div>
        </button>
    );
};
