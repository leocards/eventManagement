import PageHeader from "@/Components/PageHeader";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { defaults } from "chart.js/auto";

export default function Reports({ auth, report, children }) {

    return (
        <Authenticated user={auth.user}>
            <Head title="Reports" />
            <PageHeader title="Reports" links={["Report", `${report}`]} />

            <div className="h-9 flex gap-2">
                <button
                    onClick={() => router.get(route("reports.evaluation"))}
                    className={
                        "px-3 rounded-md " +
                        (report == "Evaluation"
                            ? "bg-blue-500/20 text-blue-600"
                            : "hover:bg-blue-600/5")
                    }
                >
                    Evaluation
                </button>
                <button
                    onClick={() => router.get(route("reports.accomplishment"))}
                    className={
                        "px-3 rounded-md " +
                        (report == "Accomplishment"
                            ? "bg-blue-500/20 text-blue-600"
                            : "hover:bg-blue-600/5")
                    }
                >
                    Accomplishment
                </button>
            </div>

            {children}
        </Authenticated>
    );
}
