import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Paginate({ contentList, disabled, onNext = () => {}, onPrevious = () => {} })
{
    const { from, to, total } = contentList??{from: null, to: null, total: null}
    const { next, previous } = disabled??{next: null, previous: null}

    const onClickButton = (page) => {
        if(page == "next" && next) {
            onNext()
        } else if(page == "prev" && previous) {
            onPrevious()
        }
    }

    return (
        <div className="border-t pt-2.5 flex items-center">
            <div className="ml-auto flex items-center gap-3">
                <button disabled={!previous} onClick={() => onClickButton("prev")} className="px-1 py-1 hover:bg-gray-200 rounded disabled:opacity-40 disabled:pointer-events-none">
                    <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <div className="select-none"> {from}-{to} of {total}</div>
                <button disabled={!next} onClick={() => onClickButton("next")} className="px-1 py-1 hover:bg-gray-200 rounded disabled:opacity-40 disabled:pointer-events-none">
                    <ChevronRightIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}