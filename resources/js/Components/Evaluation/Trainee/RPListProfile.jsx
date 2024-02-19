export const DisplayRP = ({ selectedRp }) => {
    return (
        <div className="mb-10">
            <div className=" uppercase">
                Resource Person:{" "}
                <span className="font-semibold normal-case">
                    {selectedRp?.name}
                </span>
            </div>
            <div className=" uppercase">
                Position:{" "}
                <span className="font-semibold normal-case">
                    {selectedRp?.position}
                </span>
            </div>
            <div className="w-80 h-80 mx-auto mt-4">
                <img
                    src={selectedRp?.profile}
                    className="w-full h-full rounded-md object-contain"
                    alt=""
                />
            </div>
        </div>
    );
};