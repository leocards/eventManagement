import Modal, { ModalHeader } from "../../Modal";
import styled from "styled-components";

export default function GraphDetails({show = true, label = '', maxWidth = 'xl', children, onClose = () => {}}) {

    return (
        <Modal show={show} maxWidth={maxWidth}>
            <div className="p-4">
                <ModalHeader onClose={onClose}>
                    {label}
                </ModalHeader>

                <div className="overflow-y-auto max-h-[75vh]">
                    { children }
                </div>

            </div>
        </Modal>
    )
}

export const Label = ({type, data, ml = false}) => <div className={`flex gap-2 items-center ${ml?'sm:ml-3':''}`}>
    <ChartLegend $type={type} />
    <div className="capitalize text-sm">{type}</div>
    <div>{data}</div>
</div>

export const Items = ({ question, male, female, total }) => {
    return (
        <div className="mb-3">
            <div className="font-medium mb-1">{question}</div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                <Label type="male" data={`${male??0}`} />
                <Label type="female" ml data={`${female??0}`} />
                <Label type="total" ml data={`${total??0}`} />
            </div>
        </div>
    )
}

export const ChartLegend = styled.div.attrs(({ $type }) => ({
    className: `h-4 w-12 border ${
        $type == "male"
            ? "bg-[rgba(255,99,132,0.5)] border-[rgba(255,99,132,1)]"
            : $type == "female"
            ? "bg-[rgba(54,162,235,0.5)] border-[rgba(54,162,235,1)]"
            : "bg-[rgba(255,205,86,0.5)] border-[rgba(255,205,86,1)]"
    } `,
}))``;