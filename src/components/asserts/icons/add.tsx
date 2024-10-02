export const AddIcon = ({
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
    <circle cx='12' cy='12' r='10'></circle>
    <line x1='12' y1='8' x2='12' y2='16'></line>
    <line x1='8' y1='12' x2='16' y2='12'></line>
  </svg>
)
