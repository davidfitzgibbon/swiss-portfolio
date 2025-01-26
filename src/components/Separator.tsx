type Props = {}

export function Separator({}: Props) {
  return (
    
      <div className="separator fill-red w-[calc(100%_-_2rem)] my-8 ml-[1rem] flex justify-between">
        <svg viewBox="0 0 100 100" className='w-8'>
          <rect x="0" y="33" width="100" height="33" />
          <rect x="33" y="0" width="33" height="100" />
        </svg>
        <svg viewBox="0 0 100 100" className='w-8'>
          <rect x="0" y="33" width="100" height="33" />
          <rect x="33" y="0" width="33" height="100" />
        </svg>
      </div>
    
  )
}