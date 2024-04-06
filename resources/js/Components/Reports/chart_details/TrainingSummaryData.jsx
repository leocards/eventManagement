import { useEffect } from "react";
import GraphDetails, { Items } from "./GraphDetails";

export default function TrainingSummaryDataDetails({ data, show, onClose = () => {} }) {
    const getCounts = (level, isTotal = true, type) => {

        if(data) {
            if(data[level]) {
                if(isTotal)
                    return data[level].countMale + data[level].countFemale
                else 
                    return data[level]['count'+type]
            }
        }

        return 0
    }
    return (
        <GraphDetails show={show} maxWidth="2xl" onClose={onClose} label="Training Activity Rating Summary by Sex">
            <Items 
                question="Excellent"
                male={`${getCounts('5', false, 'Male')} (${data?data['5']?.Male||0:0}%)`}
                female={`${getCounts('5', false, 'Female')} (${data?data['5']?.Female||0:0}%)`}
                total={`${getCounts('5')} (${!data?0:((data["5"]?.Male||0)+(data["5"]?.Female||0))}%)`}
            />
            <Items 
                question="Very Satisfactory"
                male={`${getCounts('4', false, 'Male')} (${data?data['4']?.Male||0:0}%)`}
                female={`${getCounts('4', false, 'Female')} (${data?data['4']?.Female||0:0}%)`}
                total={`${getCounts('4')} (${!data?0:((data["4"]?.Male||0)+(data["4"]?.Female||0))}%)`}
            />
            <Items 
                question="Satisfactory"
                male={`${getCounts('3', false, 'Male')} (${data?data['3']?.Male||0:0}%)`}
                female={`${getCounts('3', false, 'Female')} (${data?data['3']?.Female||0:0}%)`}
                total={`${getCounts('3')} (${!data?0:((data["3"]?.Male||0)+(data["3"]?.Female||0))}%)`}
            />
            <Items 
                question="Poor"
                male={`${getCounts('2', false, 'Male')} (${data?data['2']?.Male||0:0}%)`}
                female={`${getCounts('2', false, 'Female')} (${data?data['2']?.Female||0:0}%)`}
                total={`${getCounts('2')} (${!data?0:((data["2"]?.Male||0)+(data["2"]?.Female||0))}%)`}
            />
            <Items 
                question="Fair"
                male={`${getCounts('1', false, 'Male')} (${data?data['1']?.Male||0:0}%)`}
                female={`${getCounts('1', false, 'Female')} (${data?data['1']?.Female||0:0}%)`}
                total={`${getCounts('1')} (${!data?0:((data["1"]?.Male||0)+(data["1"]?.Female||0))}%)`}
            />
        </GraphDetails>
    );
}
