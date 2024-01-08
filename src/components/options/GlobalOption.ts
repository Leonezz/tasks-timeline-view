import { TimelineOption, TimelineOptionType } from './OptionDef'
import { create } from 'zustand'

type Actions = {
    setForwardUnfinishedTasks: (forward: boolean) => void
    setDateIconStyle: (style: typeof TimelineOption.dateIconStyle) => void
}

const useGeneralOption = create<TimelineOptionType & Actions>((set) => ({
    forwardUnfinishedTasks: TimelineOption.forwardUnfinishedTasks,
    setForwardUnfinishedTasks: (forward: boolean) =>
        set(() => ({ forwardUnfinishedTasks: forward })),
    dateIconStyle: TimelineOption.dateIconStyle,
    setDateIconStyle: (style) => set(() => ({ dateIconStyle: style }))
}))

export default useGeneralOption
