import React from "react";
import { MouseEventHandler } from "react";
import moment from "moment";
import IconTextBadge from "./IconTextBadge";
import { innerDateFormat } from '../../util/defs'


function IconDateBadge({
    icon,
    labelPrefix,
    labelSuffix,
    ariaLabelPrefix,
    ariaLabelSuffix,
    date,
    onClick,
    color: iconColor,
}: {
    icon: JSX.Element,
    labelPrefix?: string,
    labelSuffix?: string,
    ariaLabelPrefix?: string,
    ariaLabelSuffix?: string,
    date: moment.Moment,
    onClick?: MouseEventHandler,
    color?: string,
}) {

    labelPrefix = labelPrefix || "";
    labelSuffix = labelSuffix || "";
    ariaLabelPrefix = ariaLabelPrefix || "";
    ariaLabelSuffix = ariaLabelPrefix || "";

    const label = date.format(innerDateFormat);

    return (
        <IconTextBadge
            icon={icon}
            labelPrefix={labelPrefix}
            labelSuffix={labelSuffix}
            ariaLabelPrefix={ariaLabelPrefix}
            ariaLabelSuffix={ariaLabelSuffix}
            label={label}
            ariaLabel={label}
            color={iconColor}
        />
    )
}

export default IconDateBadge;