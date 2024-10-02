export const ForwardIcon = ({
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
    <polyline points='15 17 20 12 15 7'></polyline>
    <path d='M4 18v-2a4 4 0 0 1 4-4h12'></path>
  </svg>
)
