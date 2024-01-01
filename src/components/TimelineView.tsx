import React, { useMemo, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import moment from "moment";
import YearAccordion from "./year/YearAccordion";
import InputPanel from "./input/InputPanel";
import FilterSelectorList from './filter_sort/FilterSortSelectorList';
import { FilterSortOptions, SelectedFilterSortOptions } from "./filter_sort/types";
import { TaskItem } from "../tasks/TaskItem";
import { TaskItemInfo, TaskItemDateFilter } from "../tasks/TaskItemUtil";
import '../extension/array.extension'
import { innerDateFormat } from "../util/defs";

interface Props {
    taskList: TaskItem[]
}

export const TimelineView = ({
    taskList,
}: Props) => {
    console.log("TimeLine item list: ", taskList)
    const tags = taskList.flatMap(item => Array.from(item.tags)).unique();
    const files = taskList.map(item => item.position.visual).unique();
    const priorities = taskList.map(item => item.priority.toString()).unique();
    const status = taskList.map(item => item.status.toString()).unique();

    taskList = taskList.map((t) => {
        if (!t.dateTime?.misc) t.dateTime.misc = new Map();
        t.dateTime.misc.set("today", moment());
        return t;
    })

    const sortedInvolvedDates = taskList.flatMap((t) => {
        return TaskItemInfo.getTaskDateList(t).unique()
    })
        .unique()
        .sort((a, b) => {
            if (a.isBefore(b)) return -1;
            else if (a.isAfter(b)) return 1;
            return 0;
        });

    const sortedInvolvedYears: number[] = sortedInvolvedDates.flatMap((d) => {
        return d.year();
    })
        .unique()
        .sort((a, b) => a - b);

    console.log("years: ", sortedInvolvedYears, sortedInvolvedDates);
    const yearDateTaskMap: Map<number, Map<string, TaskItem[]>> =
        new Map(
            sortedInvolvedYears.map((y) => {
                return {
                    key: y,
                    value: new Map(
                        sortedInvolvedDates
                            .filter((d) => d.year() === y)
                            .map((d) => {
                                return {
                                    key: d.format(innerDateFormat),
                                    value: taskList.filter(TaskItemDateFilter.filterDate(d))
                                }
                            })
                            .map(e => [e.key, e.value])
                    )
                };
            }).map(e => [e.key, e.value])
        );

    const [selectedFilters, setSelectedFilters] = useState(
        {
            tags: [],
            files: [],
            priorities: [],
            status: [],
            sortCmp: "aaa",
            reversed: false,
        } as SelectedFilterSortOptions);

    const FilterSortSelectorListCached = useMemo(
        () => <FilterSelectorList
            options={{
                tags: tags,
                files: files,
                priorities: priorities,
                status: status,
                sortCmp: ["aaa", "vvv", "ccc"],
                reversed: false,
            } as FilterSortOptions}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
        />,
        [tags, files, priorities, status]
    )

    return (
        <NextUIProvider>
            <div className="gap-2 flex flex-col">
                <InputPanel
                    newItemDestinationOptions={["a", "b", "ccc"]}
                />
                {FilterSortSelectorListCached}
                <div>{selectedFilters.files}{selectedFilters.priorities}{selectedFilters.status}{selectedFilters.tags}</div>
            </div>
            {sortedInvolvedYears.map((y) => (
                <YearAccordion key={y}
                    year={y}
                    dateTaskMap={yearDateTaskMap.get(y) || {} as Map<string, TaskItem[]>}
                />
            ))}
        </NextUIProvider>
    )
}