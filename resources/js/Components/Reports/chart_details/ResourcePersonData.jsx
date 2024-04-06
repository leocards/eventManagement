import { useEffect } from "react";
import GraphDetails, { Items } from "./GraphDetails";

export default function ResourcePersonDataDetails({ data, show, onClose = () => {} }) {
    return (
        <GraphDetails show={show} maxWidth="lg" onClose={onClose} label="Resource Person">
            <Items 
                question="Excellent"
                male={`${data?data['5']?.male||0:0}`}
                female={`${data?data['5']?.female||0:0}`}
                total={`${!data?0:((data["5"]?.male||0)+(data["5"]?.female||0))}`}
            />
            <Items 
                question="Very Satisfactory"
                male={`${data?data['4']?.male||0:0}`}
                female={`${data?data['4']?.female||0:0}`}
                total={`${!data?0:((data["4"]?.male||0)+(data["4"]?.female||0))}`}
            />
            <Items 
                question="Satisfactory"
                male={`${data?data['3']?.male||0:0}`}
                female={`${data?data['3']?.female||0:0}`}
                total={`${!data?0:((data["3"]?.male||0)+(data["3"]?.female||0))}`}
            />
            <Items 
                question="Poor"
                male={`${data?data['2']?.male||0:0}`}
                female={`${data?data['2']?.female||0:0}`}
                total={`${!data?0:((data["2"]?.male||0)+(data["2"]?.female||0))}`}
            />
            <Items 
                question="Fair"
                male={`${data?data['1']?.male||0:0}`}
                female={`${data?data['1']?.female||0:0}`}
                total={`${!data?0:((data["1"]?.male||0)+(data["1"]?.female||0))}`}
            />
        </GraphDetails>
    );
}
