import EvaluationQuestions from "@/js/EvaluationQuestions";
import styled from "styled-components"
import { DisplayRP } from "./RPListProfile";
import InputLabel from "@/Components/InputLabel";
import LikertScale from "./LikertScale";

export default function RPEvaluation({ rp, evaluation, setData, errors }) {
    const { QAResourcePersonQuestions } = EvaluationQuestions;

    return (
        <div>
            <DisplayRP selectedRp={rp} />

            {
                QAResourcePersonQuestions.map((question, index) => {
                    const keyOfRP = Object.keys(evaluation);
                    const questionKey = keyOfRP[index];

                    const isError = (key) => {
                        return errors.some((item) => item.id === rp.id && item.question === key)
                    }

                    return (
                        <QuestionsContainer
                            key={index}
                            $active={evaluation[questionKey]}
                            $error={isError(questionKey)}
                        >
                            <InputLabel
                                value={(index !== 7 ? index + 1 + ". " : "") + question}
                                className="after:content-['*'] after:ml-0.5 after:text-red-500"
                            />

                            {
                                index !== 7 ? (
                                    <LikertScale
                                        selected={evaluation[questionKey]}
                                        onSelect={(like) => {
                                            setData(questionKey, like)
                                        }}
                                    />
                                ) : (
                                    <div className="form-input-float mt-4 flex group">
                                        <textarea
                                            className="!py-2.5 bg-transparent"
                                            placeholder="Text here"
                                            value={evaluation.comment}
                                            onInput={({ target }) => {
                                                setData("comment", target.value)
                                            }}
                                        />
                                    </div>
                                )
                            }

                            <span className="absolute -top-4" id={"rp"+rp.id+''+questionKey}></span>
                        </QuestionsContainer>
                    )
                })
            }
        </div>
    )
}

const QuestionsContainer = styled.div.attrs(({ $active, $error }) => ({
    className: `${$active?'ring-blue-400 bg-blue-100/20':$error ? 'ring-red-400 bg-red-100/20':'bg-gray-100/40 ring-slate-200/70'} p-3 ring-1 mt-5 rounded-md relative`
}))``