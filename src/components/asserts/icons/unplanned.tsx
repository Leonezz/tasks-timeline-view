export const UnplannedIcon = ({
  width = 14,
  height = 14
}: {
  width?: number
  height?: number
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M4.18 4.18A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18'></path>
    <path d='M21 15.5V6a2 2 0 0 0-2-2H9.5'></path>
    <path d='M16 2v4'></path>
    <path d='M3 10h7'></path>
    <path d='M21 10h-5.5'></path>
    <line x1='2' y1='2' x2='22' y2='22'></line>
  </svg>
)
