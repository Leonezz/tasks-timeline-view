import React from "react";
import IconTextBadge from "../item/IconTextBadge";
import { iconMap } from "../asserts/icons";

function DateTaskStatisticsLine({
    todoCnt,
    scheduledCnt,
    doingCnt,
    overdueCnt,
    unplannedCnt,
    completeCnt,
}: {
    todoCnt: number,
    scheduledCnt: number
    doingCnt: number,
    overdueCnt: number,
    unplannedCnt: number,
    completeCnt: number,
}) {
    const totalCnt = todoCnt + doingCnt + overdueCnt + unplannedCnt + completeCnt;
    if (totalCnt === completeCnt) {
        return (
            <span className="success">All done today! 👍</span>
        )
    }
    const ariaLabelSuffix = "tasks on this date.";
    let badgeKey = 1;
    return (
        <div
            className="gap-2"
        >
            {overdueCnt > 0 && <IconTextBadge key={badgeKey++}
                icon={iconMap.overdueIcon}
                label={overdueCnt.toString()}
                ariaLabelPrefix={overdueCnt.toString()}
                ariaLabel={" overdue " + ariaLabelSuffix}
            // className="text-danger"
            />}
            {scheduledCnt > 0 && <IconTextBadge key={badgeKey++}
                icon={iconMap.scheduledIcon}
                label={scheduledCnt.toString()}
                ariaLabelPrefix={scheduledCnt.toString()}
                ariaLabel={" scheduled " + ariaLabelSuffix}
            />}
            {todoCnt > 0 && <IconTextBadge key={2}
                icon={iconMap.scheduledIcon}
                label={todoCnt.toString()}
                ariaLabelPrefix={todoCnt.toString()}
                ariaLabel={" todo " + ariaLabelSuffix}
            // className="text-warning"
            />}
            {doingCnt > 0 && <IconTextBadge key={3}
                icon={iconMap.processIcon}
                label={doingCnt.toString()}
                ariaLabelPrefix={doingCnt.toString()}
                ariaLabel={" doing " + ariaLabelSuffix}
            // className="text-secondary"
            />}
            {unplannedCnt > 0 && <IconTextBadge key={4}
                icon={iconMap.unplannedIcon}
                label={unplannedCnt.toString()}
                ariaLabelPrefix={unplannedCnt.toString()}
                ariaLabel={" unplanned " + ariaLabelSuffix}
            // className="text-primary"
            />}
            {completeCnt > 0 && <IconTextBadge key={5}
                icon={iconMap.doneIcon}
                label={completeCnt.toString()}
                ariaLabelPrefix="Finished "
                ariaLabel={completeCnt.toString()}
                ariaLabelSuffix="tasks on this date."
            // className="text-success"
            />}
        </div>
    )
}

export default DateTaskStatisticsLine;