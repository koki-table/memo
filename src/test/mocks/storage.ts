const mockLocalStorage = vi.spyOn<WindowLocalStorage, 'localStorage'>(window, 'localStorage', 'get')

let mockStorage: Record<string, string>
const mockSetItem = vi.fn((key: string, value: string) => {
  mockStorage = { [key]: value }
})

const mockGetItem = vi.fn((key: string) => {
  return mockStorage[key]
})

const mockRemoveItem = vi.fn((key: string) => {
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete mockStorage[key]
})

const originalLocalStorage = { ...window.localStorage } as const

mockLocalStorage.mockImplementation(() => ({
  ...originalLocalStorage,
  getItem: mockGetItem,
  setItem: mockSetItem,
  removeItem: mockRemoveItem,
}))

export { mockLocalStorage }
