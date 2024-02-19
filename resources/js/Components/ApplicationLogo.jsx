export default function ApplicationLogo({size}) {
    return (
        <div className="">
            <img src="/storage/logo.png" className={size??"w-9"} alt="" />
        </div>
    );
}
