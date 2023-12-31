/**
 * @deprecated
 */
import React, { ReactElement } from "react";
import TaskItemInfoBadge from "./TaskItemInfoBadge";

function CalenderIcon({ icon }: { icon: JSX.Element }) {
    icon.props["width"] = 14
    icon.props["height"] = 14
    return icon;
}

function DateStatusBadge(
    {
        className,
        ariaLabel,
        label,
        icon
    }: {
        className: string,
        ariaLabel: string,
        label: string,
        icon: JSX.Element
    }
): ReactElement {
    return (
        <TaskItemInfoBadge ariaLabel={ariaLabel}
            icon={<CalenderIcon icon={icon}></CalenderIcon>}
            label={label}>
        </TaskItemInfoBadge>
    );
}

export default DateStatusBadge;