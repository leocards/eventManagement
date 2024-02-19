import RPEvaluation from "./RPEvaluation";


export default function QuantitativeAssessmentRP({
    errors,
    rpEvaluation,
    setData = () => {},
    onRemoveErrorRpList = () => {},
}) {

    const onSetData = (key, value, id) => {
        let updatedRp = rpEvaluation.map((item) => {
            if(item.rp.id === id) {
                return {
                    ...item,
                    evaluation: {
                        ...item.evaluation,
                        [key]: value
                    }
                }
            }
            return item
        })

        setData('EvaluatedRp', updatedRp)
        onRemoveErrorRpList(id, key)
    }

    return (
        <div className="">
            {
                rpEvaluation.map(({rp, evaluation}, index) => {
                    let indexKey = index
                    return (
                        <div key={indexKey} className="bg-white ring-1 ring-slate-200 p-4 mt-5 relative rounded-lg">
                            {index === 0 && <div className="font-gotham mb-3">
                                QUANTITATIVE ASSESSMENT OF RESOURCE PERSON
                            </div>}
                            
                            <div className="absolute top-4 right-4 p-1 px-3 rounded text-white font-gotham text-sm bg-slate-600">{++indexKey} / {rpEvaluation.length}</div>
                            <div>
                                <RPEvaluation
                                    rp={rp}
                                    errors={errors}
                                    evaluation={evaluation}
                                    setData={(key, value) => onSetData(key, value, rp.id)}
                                />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}
