import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import EvaluationQuestions from "@/js/EvaluationQuestions";

export default function QualitativeAssessmentActivity({
    data,
    setData,
    errors,
    onRemoveErrorList = () => {}
}) {
    const { QATrainingActivityQuestions } = EvaluationQuestions;

    return (
        <div className="bg-white ring-1 ring-slate-200 p-4 mt-5 rounded-lg">
            <div className="font-gotham">
                QUALITATIVE ASSESSMENT OF THE TRAINING ACTIVITY
            </div>
            <div className="mt-3 mb-10">
                Writing down your thoughts and ideas will allow you to
                crystallize learning further. Please take the time to process
                your feelings and articulate difficulties, challenges, and new
                learning from our sessions and activities. Thank you.
            </div>

            {QATrainingActivityQuestions.map((question, index) => {
                const keyOfQuestion = Object.keys(data.Qualitative);
                const questionKey = keyOfQuestion[index];

                const errorStyle = errors.includes(questionKey)
                    ? " ring-red-400 bg-red-100/20 "
                    : null;

                return (
                    <div
                        key={index}
                        className={
                            "p-3 ring-1 mt-5 relative rounded-md " +
                            (errorStyle ??
                                (data.Qualitative[questionKey]
                                    ? "ring-blue-400 bg-blue-100/20"
                                    : "bg-gray-100/40 ring-slate-200/70"))
                        }
                    >
                        <InputLabel
                            htmlFor={questionKey}
                            value={index + 1 + ". " + question}
                            className="after:content-['*'] after:ml-0.5 after:text-red-500"
                        />

                        <div className="mt-3">
                            <TextInput
                                value={data.Qualitative[questionKey]}
                                onInput={({ target }) => {
                                    if (!target.value) {
                                        target.classList.add(
                                            "!border-pink-600"
                                        );
                                    } else {
                                        target.classList.remove(
                                            "!border-pink-600"
                                        );
                                    }
                                    setData("Qualitative", {
                                        ...data.Qualitative,
                                        [questionKey]: target.value,
                                    });
                                    onRemoveErrorList(questionKey)
                                }}
                                className={
                                    "border rounded-md py-2 px-3 w-full focus:border-blue-600 outline-none " +
                                    (errorStyle? "border-red-300 focus:!border-red-600" : (data.Qualitative[questionKey]
                                        ? "border-blue-300"
                                        : "border-gray-300"))
                                }
                            />
                        </div>
                        <span className="absolute -top-4" id={questionKey}></span>
                    </div>
                );
            })}
        </div>
    );
}
