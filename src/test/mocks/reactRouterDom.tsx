import { ReactNode } from 'react'

export const mockUseNavigate = vi.fn()
export const mockLinkClick = vi.fn()

vi.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  ...vi.importActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
  }),
  useNavigate: mockUseNavigate,
  Outlet: () => <h1>Outlet</h1>,
  Link: ({ children, to }: { children?: ReactNode; to: string }) => (
    <a href={to} onClick={() => mockLinkClick(to)}>
      {children}
    </a>
  ),
}))
