import { TimelineOption, TimelineOptionType } from './OptionDef'
import { create } from 'zustand'

type Actions = {
    setForwardUnfinishedTasks: (forward: boolean) => void
}

const useGlobalOption = create<TimelineOptionType & Actions>((set) => ({
    forwardUnfinishedTasks: false,
    setForwardUnfinishedTasks:
        (forward: boolean) => (state: typeof TimelineOption) => ({
            forwardUnfinishedTasks: forward
        })
}))

export default useGlobalOption
