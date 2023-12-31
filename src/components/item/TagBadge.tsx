/**
 * @deprecated
 */
import React from "react";
import { iconMap } from "../asserts/icons";
import TaskItemInfoBadge from "./TaskItemInfoBadge";

function TagIcon() {
    return iconMap.tagIcon;
}

function TagBadge({
    tag,
    tagPalette,
    onTagClick
}: {
    tag: string,
    tagPalette: Map<string, string>,
    onTagClick?: (t: string) => void,
}) {
    const tagText = tag.replace("#", "");

    return (
        <TaskItemInfoBadge
            label={tagText}
            icon={<TagIcon></TagIcon>}
            onClick={(e) => {
                e.stopPropagation();
                onTagClick && onTagClick(tag);
            }}
            ariaLabel={tag}
            // className="shadow-sm bg-primary-200"
            color="primary"
        />
    )
}

export default TagBadge;