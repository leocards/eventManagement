import moment from "moment";

export default function PrintHeader() {
    return (
        <div className="flex items-center">
            <img src="/storage/logo.png" className="w-12 shrink-0" />
            <img src="/storage/4ps.png" className="w-52 shrink-0" />

            {/* <div className="overflow-hidden relative">
                <img src="/storage/DSWD4PsBPLogo.png" className="w-[20rem] object-cover shrink-0" />
            </div> */}

            <div className="ml-auto">{moment().format("LL")}</div>
        </div>
    );
}
