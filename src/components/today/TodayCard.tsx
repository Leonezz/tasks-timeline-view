import { Card, CardHeader, Chip } from "@nextui-org/react";
import moment from "moment";
import React, { useState } from "react";
import { visualDateFormat } from "../../util/defs";
function TodayCard({
    unfinishedCnt
}: {
    unfinishedCnt: number
}) {
    const [isTodayActivate, setTodayActivate] = useState(false);
    return (
        <Card
            classNames={{
                base: 'shadow-none bg-origin-content bg-transparent'
            }}
        >
            <CardHeader
                className="items-center flex flex-col flex-1 py-1 cursor-default select-none"
            >
                <Chip
                    classNames={{
                        base: "shadow-none bg-transparent",
                        content: "text-3xl font-bold " +
                            (isTodayActivate ? "text-primary" : "text-black"),
                    }}
                    onClick={() => setTodayActivate(!isTodayActivate)}
                >
                    Today
                </Chip>
                <div className="text-md text-default-500">
                    {moment().format(visualDateFormat)}
                </div>
            </CardHeader>
        </Card>
    )
}

export default TodayCard;