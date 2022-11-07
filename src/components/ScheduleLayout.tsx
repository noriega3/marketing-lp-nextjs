import React, { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const ScheduleLayout = ({ children }: Props) => {
  return (
    <div className="zcr zcr__schedule-container">
      {children}
    </div>
  )
}

export default ScheduleLayout
