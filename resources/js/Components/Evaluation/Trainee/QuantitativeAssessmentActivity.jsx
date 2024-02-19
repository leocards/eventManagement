import InputLabel from "@/Components/InputLabel";
import EvaluationQuestions from "@/js/EvaluationQuestions";
import LikertScale from "./LikertScale";

export default function QuantitativeAssessmentActivity({
    data,
    setData,
    errorList = [],
    onRemoveErrorList = () => {},
    onBack = () => {},
}) {
    const { QAAQuestions } = EvaluationQuestions;

    return (
        <div className="bg-white ring-1 ring-slate-200 p-4 mt-5 rounded-lg">
            <div className="font-gotham mb-10">
                QUANTITATIVE ASSESSMENT OF THE ACTIVITY
            </div>

            {QAAQuestions.map((question, index) => {
                const keysOfQAA = Object.keys(data.Quantitative);
                const questionKey = keysOfQAA[index];

                return (
                    <div
                        key={index}
                        className={
                            "p-3 ring-1 mt-5 relative rounded-md " +
                            (errorList.includes(questionKey)
                                ? "ring-red-400 bg-red-100/20"
                                : data.Quantitative[questionKey]
                                ? "ring-blue-400 bg-blue-100/20 "
                                : "bg-gray-100/40 ring-slate-200/70 ")
                        }
                    >
                        <span
                            className="absolute -top-4 pointer-events-none"
                            id={questionKey}
                        ></span>
                        <InputLabel
                            htmlFor={questionKey}
                            value={index + 1 + ". " + question}
                            className="after:content-['*'] after:ml-0.5 after:text-red-500"
                        />

                        <LikertScale
                            selected={data.Quantitative[questionKey]}
                            onSelect={(like) => {
                                setData("Quantitative", {
                                    ...data.Quantitative,
                                    [questionKey]: like,
                                })
                                onRemoveErrorList(questionKey)
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
}
