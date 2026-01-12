import { create } from 'zustand'
import type { TaskItem } from '../@types/task-item'

type VaultConfig = {
  taskLists: Set<TaskItem['list']>
}
type VaultConfigActions = {
  setTaskLists: (list: Set<TaskItem['list']>) => void
}

export const useVaultConfigStore = create<VaultConfig & VaultConfigActions>(
  (set) => ({
    // Removed 'get' parameter
    taskLists: new Set(),
    setTaskLists: (list) => set((prev) => ({ ...prev, taskLists: list }))
  })
)
