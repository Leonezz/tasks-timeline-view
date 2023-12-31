import React from "react";
import { Progress } from "@nextui-org/react";

function YearHeaderProgress({
    finished,
    total,
}: {
    finished: number,
    total: number
}) {
    return (
        <Progress
            label="Progress of this year."
            value={finished}
            maxValue={total}
            showValueLabel={true}
            valueLabel={finished.toString() + " / " + total.toString()}
            size="sm"
            classNames={{
                base: "pt-2",
                label: "text-sm",
            }}
        />
    )
}

export default YearHeaderProgress;