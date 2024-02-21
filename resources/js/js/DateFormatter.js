import moment from "moment";

export const convertDate = (
    start = null,
    end = null,
    time_in = null,
    time_out = null,
    ll = false
) => {
    if (start && !end && !time_in && !time_out) {
        return moment(start).format(ll?"ll":"LL");
    } else if (start && end && !time_in && !time_out) {
        if (
            moment(start).format("YYYY") == moment(end).format("YYYY") &&
            moment(start).format("MMMM") == moment(end).format("MMMM")
        ) {
            return (
                moment(start).format(ll?"MMM D":"MMMM D") +
                " - " +
                moment(end).format("D, YYYY")
            );
        } else {
            return (
                moment(start).format(ll?"MMM D, YYYY":"MMMM D, YYYY") +
                " - " +
                moment(end).format(ll?"MMM D, YYYY":"MMMM D, YYYY")
            );
        }
    } else if (!start && !end && time_in && time_out) {
        return (
            moment(time_in).format("LT") +
            " - " +
            moment(time_out).format("LT")
        );
    }
};