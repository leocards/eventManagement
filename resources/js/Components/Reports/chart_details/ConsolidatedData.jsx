import { useEffect } from "react";
import GraphDetails, { Items } from "./GraphDetails";

export default function ConsolidatedDataDetails({ data, show, onClose = () => {}}) {
    return (
        <GraphDetails show={show} onClose={onClose} label="Consolidated Data">
            <Items 
                question="How well the activity objectives were met."
                male={data?.q1.Male}
                female={data?.q1.Female}
                total={data?.q1.total}
            />
            <Items 
                question="Extent the activity has met your needs so far."
                male={data?.q2.Male}
                female={data?.q2.Female}
                total={data?.q2.total}
            />
            <Items 
                question="Relevance of activity to improve job."
                male={data?.q3.Male}
                female={data?.q3.Female}
                total={data?.q3.total}
            />
            <Items 
                question="Appropriateness of training methodologies."
                male={data?.q4.Male}
                female={data?.q4.Female}
                total={data?.q4.total}
            />
            <Items 
                question="Opportunities to participate in discussions."
                male={data?.q5.Male}
                female={data?.q5.Female}
                total={data?.q5.total}
            />
            <Items 
                question="Schedule of Acivities."
                male={data?.q6.Male}
                female={data?.q6.Female}
                total={data?.q6.total}
            />
            <Items 
                question="Effectiveness of Training Management."
                male={data?.q7.Male}
                female={data?.q7.Female}
                total={data?.q7.total}
            />
            <Items 
                question="Logistics: Meals"
                male={data?.q8.Male}
                female={data?.q8.Female}
                total={data?.q8.total}
            />
            <Items 
                question="Logistics: Accommodation."
                male={data?.q9.Male}
                female={data?.q9.Female}
                total={data?.q9.total}
            />
            <Items 
                question="Logistics: Function Hall."
                male={data?.q10.Male}
                female={data?.q10.Female}
                total={data?.q10.total}
            />
            <Items 
                question="Logistics: Event and Logistic Support."
                male={data?.q11.Male}
                female={data?.q11.Female}
                total={data?.q11.total}
            />
            <Items 
                question="Overall evaluation of this training."
                male={data?.q12.Male}
                female={data?.q12.Female}
                total={data?.q12.total}
            />
        </GraphDetails>
    );
}
