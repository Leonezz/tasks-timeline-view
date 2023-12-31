import React from "react";

function YearUnfinishedTip({
    unfinishedTaskCnt,
    unfinishedDayCnt,
}: {
    unfinishedTaskCnt: number,
    unfinishedDayCnt: number,
}) {
    if (unfinishedTaskCnt > 0) {
        return (
            <span className="flex gap-1">
                <a key={1} className="text-danger text-sm font-bold">
                    {unfinishedTaskCnt}
                </a>
                <a key={2} className="text-default text-sm">
                    {"unfinished tasks in"}
                </a>
                <a key={3} className="text-danger text-sm font-bold">
                    {unfinishedDayCnt}
                </a>
                <a key={4} className="text-default text-sm">
                    {"days."}
                </a>
            </span>
        )
    }
    return (
        <a className=" text-success text-sm font-bold">
            All Finished! 👍
        </a>
    )
}

export default YearUnfinishedTip;