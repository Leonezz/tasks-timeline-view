export const RepeatIcon = ({
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
    <path d='m17 2 4 4-4 4'></path>
    <path d='M3 11v-1a4 4 0 0 1 4-4h14'></path>
    <path d='m7 22-4-4 4-4'></path>
    <path d='M21 13v1a4 4 0 0 1-4 4H3'></path>
  </svg>
)
