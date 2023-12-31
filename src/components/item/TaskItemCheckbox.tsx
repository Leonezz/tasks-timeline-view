import React, { Fragment } from "react";
import { Checkbox } from "@nextui-org/react";
import TaskInfoLine from "./TaskInfoLine";
import { TaskItem } from "../../tasks/TaskItem";

function TaskItemCheckbox({
    item,
}: {
    item: TaskItem,
}) {
    const taskItemContent = item.visual || "";
    return (
        <Fragment>
            <div className="flex flex-row justify-between">
                <Checkbox
                    // className=" after:content-[''] after:my-1 after:w-1"
                    classNames={{
                        icon: "",
                        wrapper: "align-top"
                    }}
                >
                    <a className="pl-1">{taskItemContent}</a>
                </Checkbox>
                <div className="align-top text-sm text-default-300 font-mono text-nowrap">
                    {item.dateTime?.due ? item.dateTime.due.format("h:m, A") : ""}
                </div>
            </div>
            <div className="flex">
                <div
                    className="flex-shrink-0 w-5 mr-2 pt-1 pb-1 flex justify-center after:flex after:content[''] after:w-[1px] after:h-full after:bg-black"
                />
                <TaskInfoLine item={item} />
            </div>
        </Fragment>
    )
}

export default TaskItemCheckbox;