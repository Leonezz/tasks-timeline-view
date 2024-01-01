import React, { useMemo, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import moment from "moment";
import YearAccordion from "./year/YearAccordion";
import InputPanel from "./input/InputPanel";
import FilterSelectorList from './filter_sort/FilterSortSelectorList';
import { FilterSortOptions, SelectedFilterSortOptions } from "./filter_sort/types";
import { TaskItem } from "../tasks/TaskItem";
import { TaskItemInfo, TaskItemFilter, TaskItemSort } from "../tasks/TaskItemUtil";
import '../extension/array.extension'
import { innerDateFormat } from "../util/defs";
import TodayCard from "./today/TodayCard";

interface Props {
    taskList: TaskItem[]
}

export const TimelineView = ({
    taskList,
}: Props) => {
    console.log("TimeLine item list: ", taskList)

    const [selectedFilters, setSelectedFilters] = useState({
        tags: [],
        files: [],
        priorities: [],
        status: [],
        sortCmp: "",
        reversed: false,
    } as SelectedFilterSortOptions);

    const tags = taskList.flatMap(item => Array.from(item.tags)).unique();
    const files = taskList.map(item => item.position.visual).unique();
    const priorities = taskList.map(item => item.priority.toString()).unique();
    const status = taskList.map(item => item.status.toString()).unique();

    const sortCmpMethod = TaskItemSort.TaskItemSortMap[selectedFilters.sortCmp as keyof typeof TaskItemSort.TaskItemSortMap];
    let filteredTaskList = taskList
        .filter(TaskItemFilter.filterTags(selectedFilters.tags))
        .filter(TaskItemFilter.filterPriorities(selectedFilters.priorities))
        .filter(TaskItemFilter.filterStatus(selectedFilters.status))
        .sort(sortCmpMethod);
    if (selectedFilters.reversed) {
        filteredTaskList = filteredTaskList.reverse();
    }

    filteredTaskList = filteredTaskList.map((t) => {
        if (!t.dateTime?.misc) t.dateTime.misc = new Map();
        t.dateTime.misc.set("today", moment());
        return t;
    })

    const sortedInvolvedDates = filteredTaskList.flatMap((t) => {
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
                                    value: filteredTaskList.filter(TaskItemFilter.filterDate(d))
                                }
                            })
                            .map(e => [e.key, e.value])
                    )
                };
            }).map(e => [e.key, e.value])
        );

    const FilterSortSelectorListCached = useMemo(
        () => <FilterSelectorList
            options={{
                tags: tags,
                files: files,
                priorities: priorities,
                status: status,
                sortCmp: Object.keys(TaskItemSort.TaskItemSortMap),
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
                <TodayCard unfinishedCnt={10} />
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