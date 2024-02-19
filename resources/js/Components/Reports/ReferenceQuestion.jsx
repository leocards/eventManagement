import EvaluationQuestions from "@/js/EvaluationQuestions.js";
import Modal from "../Modal";
import { XMarkIcon } from "@heroicons/react/20/solid";
import styled from "styled-components";

export default function ReferenceQuestion({ type, show, onClose }) {
    const rq = {
        assessment: EvaluationQuestions.QATrainingActivityQuestions,
        resource: EvaluationQuestions.QAResourcePersonQuestions,
        consolidated: EvaluationQuestions.QAAQuestions,
    }[type];

    const title = {
        assessment: "QUALITATIVE ASSESSMENT OF THE TRAINING ACTIVITY",
        resource: "QUANTITATIVE ASSESSMENT OF RESOURCE PERSON",
        consolidated: "QUANTITATIVE ASSESSMENT OF THE ACTIVITY",
    }[type];

    const consolidatedLabel = {
        "7": "a",
        "8": "b",
        "9": "c",
        "10": "d",
    }

    return (
        <Modal show={show} maxWidth="lg">
            <div className="p-4">
                <div className="text-lg font-semibold flex items-center uppercase mb-5 pr-1">
                    <div>Reference Question</div>
                    <button
                        onClick={onClose}
                        className="p-2 ml-auto hover:bg-gray-100 rounded-full transition duration-150"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="overflow-y-auto max-h-[70vh]">
                    <div className="font-semibold mb-4">{title}</div>

                    {rq.map((question, index) => (
                        <div key={index} className="mb-4 gap-3">
                            {type == "resource" && index == 7 ? (
                                <LabelText>Comment/Suggestion</LabelText>
                            ) : type == "consolidated" && index == 11 ? (
                                <LabelText>Overall</LabelText>
                            ) : type == "consolidated" && index >= 7 ? (
                                <LabelText>Question 8<span className="lowercase">{consolidatedLabel[index]}</span></LabelText>
                            ) : (
                                <LabelText className="">
                                    Question {++index}
                                </LabelText>
                            )}
                            <div>{question}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
}

const LabelText = styled.div.attrs((props) => ({
    className: `uppercase text-xs text-gra y-600/80 font-gotham p-1 bg-gray-200 w-fit px-2 rounded mb-1`,
}))``;
