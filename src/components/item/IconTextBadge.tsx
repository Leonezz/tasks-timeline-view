import React from "react";
import { MouseEventHandler } from "react";
import TaskItemInfoBadge from "./TaskItemInfoBadge";


function IconTextBadge({
    icon,
    labelPrefix,
    label,
    labelSuffix,
    ariaLabelPrefix,
    ariaLabel,
    ariaLabelSuffix,
    onClick,
    color: iconColor,
}: {
    icon: JSX.Element,
    labelPrefix?: string,
    label: string,
    labelSuffix?: string,
    ariaLabelPrefix?: string,
    ariaLabel?: string,
    ariaLabelSuffix?: string,
    onClick?: MouseEventHandler,
    color?: string,
}) {
    labelPrefix = labelPrefix || "";
    labelSuffix = labelSuffix || "";
    ariaLabel = ariaLabel || "";
    ariaLabelPrefix = ariaLabelPrefix || "";
    ariaLabelSuffix = ariaLabelSuffix || "";

    return (
        <TaskItemInfoBadge
            icon={icon}
            label={labelPrefix + label + labelSuffix}
            ariaLabel={"" + ariaLabelPrefix + ariaLabel + labelSuffix}
            onClick={onClick}
            className={iconColor}
        />
    )
}

export default IconTextBadge;