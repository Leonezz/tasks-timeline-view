import IconOnlyBadge from "./IconOnlyBadge";
import TagBadge from "./TagBadge";
import { Fragment, MouseEventHandler, useMemo } from "react";
import { getFileTitle } from '../../util/string';
import { iconMap } from "../asserts/icons";
import IconDateBadge from "./IconDateBadge";
import IconTextBadge from "./IconTextBadge";
import { TaskItem } from "../../tasks/TaskItem";
import React from "react";

function TaskInfoLine({
    item,
    onModifyTask,
}: {
    item: TaskItem
    onModifyTask?: MouseEventHandler,
}) {

    const dates = item.dateTime;

    const buildBadge = (
        date: moment.Moment | undefined,
        ariaLabelPrefix: string,
        icon: JSX.Element,
        color?: string,
    ) => {
        if (!date) return <Fragment />;
        return <IconDateBadge key={ariaLabelPrefix}
            ariaLabelPrefix={ariaLabelPrefix}
            date={date}
            icon={icon}
            color={color || "default"}
        />;
    };

    const createDateBadge = useMemo(
        () => buildBadge(dates?.created, "create at ", iconMap.taskIcon),
        [dates?.created]
    );
    const startDateBadge = useMemo(
        () => buildBadge(dates?.start, "start at ", iconMap.startIcon),
        [dates?.start]
    );
    const scheduledDateBadge = useMemo(
        () => buildBadge(dates?.scheduled, "scheduled to ", iconMap.scheduledIcon),
        [dates?.scheduled]
    );
    const dueDateBadge = useMemo(
        () => buildBadge(dates?.due, "due at ", iconMap.dueIcon),
        [dates?.due]
    );
    const completeDateBadge = useMemo(
        () => buildBadge(dates?.completion, "complete at ", iconMap.doneIcon, "text-success"),
        [dates?.completion]
    );

    return (
        <div className="flex flex-col flex-wrap gap-1">
            <div key="datetime" className="flex flex-wrap gap-1">
                {onModifyTask &&
                    <IconOnlyBadge key={1} onclick={onModifyTask} />}
                {createDateBadge}
                {startDateBadge}
                {scheduledDateBadge}
                {dueDateBadge}
                {completeDateBadge}
                {item.recurrence &&
                    <IconTextBadge key={7}
                        ariaLabelPrefix="recurrent: "
                        ariaLabel={item.recurrence}
                        label={item.recurrence}
                        icon={iconMap.repeatIcon}
                    />}
                {item.priority &&
                    <IconTextBadge key={8}
                        ariaLabelPrefix="priority: "
                        ariaLabel={item.priority.toString()}
                        label={item.priority.toString() + " Priority"}
                        icon={iconMap.priorityIcon}
                    />}
                <IconTextBadge key={9}
                    ariaLabel={item.position.visual}
                    label={getFileTitle(item.position.visual)}
                    icon={iconMap.fileIcon}
                />
            </div>
            <div key="tags" className="flex-wrap">
                {Array.from(item.tags).map(
                    (t, i) => {
                        return (
                            // <TaskItemEventHandlersContext.Consumer key={i}>
                            // {({ handleTagClick }) => (
                            <TagBadge key={i}
                                tag={t}
                                tagPalette={{} as Map<string, string>}
                            // onTagClick={handleTagClick}
                            />
                            // )}
                            // </TaskItemEventHandlersContext.Consumer>
                        )
                    })}
            </div>
        </div>
    )
}

export default TaskInfoLine;