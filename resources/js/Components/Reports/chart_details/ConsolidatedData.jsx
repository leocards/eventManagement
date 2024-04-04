import GraphDetails from "./GraphDetails";
import styled from "styled-components";

export default function ConsolidatedDataDetails({ data, show, onClose = () => {}}) {
    return (
        <GraphDetails show={show} onClose={onClose} label="Consolidated Data">
            <div>
                <div>How well the activity objectives were met.</div>
                <div className="flex items-center gap-6">
                    <Label type="male" data={data?.q1.Male} />
                    <Label type="female" ml />
                    <Label type="total" ml />
                </div>
            </div>
            <div>
                <div>Extent the activity has met your needs so far.</div>
                <div className="flex justify-between items-center"></div>
            </div>
            <div>
                <div>Relevance of activity to improve job.</div>
                <div className="flex justify-between items-center"></div>
            </div>
            <div>
                <div>Appropriateness of training methodologies.</div>
                <div className="flex justify-between items-center"></div>
            </div>
            <div>
                <div>Opportunities to participate in discussions.</div>
                <div className="flex justify-between items-center"></div>
            </div>
            <div>
                <div>Schedule of Acivities.</div>
                <div className="flex justify-between items-center"></div>
            </div>
            <div>
                <div>Effectiveness of Training Management.</div>
                <div className="flex justify-between items-center"></div>
            </div>
            <div>
                <div>Logistics: Meals.</div>
                <div className="flex justify-between items-center"></div>
            </div>
            <div>
                <div>Logistics: Accommodation.</div>
                <div className="flex justify-between items-center"></div>
            </div>
            <div>
                <div>Logistics: Function Hall.</div>
                <div className="flex justify-between items-center"></div>
            </div>
            <div>
                <div>Logistics: Event and Logistic Support.</div>
                <div className="flex justify-between items-center"></div>
            </div>
            <div>
                <div>Overall evaluation of this training.</div>
                <div className="flex justify-between items-center"></div>
            </div>
        </GraphDetails>
    );
}

const Label = ({type, data, ml = false}) => <div className={`flex gap-2 items-center ${ml?'ml-3':''}`}>
    <ChartLegend $type={type} />
    <div className="capitalize text-sm">{type}</div>
    <div>{data}</div>
</div>

const ChartLegend = styled.div.attrs(({ $type }) => ({
    className: `h-4 w-12 border ${
        $type == "male"
            ? "bg-[rgba(255,99,132,0.5)] border-[rgba(255,99,132,1)]"
            : $type == "female"
            ? "bg-[rgba(54,162,235,0.5)] border-[rgba(54,162,235,1)]"
            : "bg-[rgba(255,205,86,0.5)] border-[rgba(255,205,86,1)]"
    } `,
}))``;
