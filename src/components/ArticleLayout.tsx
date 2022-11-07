import React, { ReactNode, useContext } from 'react'
import LoadingOverlay from './LoadingOverlay'
import { scheduleContext } from '../state/schedule.context'
import { uiContext } from '../state/ui.context'

type Props = {
  children?: ReactNode
  fullWidth?: boolean
  className?: string
}

const ArticleLayout = ({ children, fullWidth, className }: Props) => {
  const { apiStatus } = useContext(scheduleContext);
  const { isFixedHeader } = useContext(uiContext);

  return (
    <main className={`main article-page ${isFixedHeader ? 'fixed' : ''}`}>
      <article className={className}>
        <div className={`container ${fullWidth ? 'fullWidth' : ''}`}>
          {apiStatus.startsWith('pending') && <LoadingOverlay />}
          {children}
        </div>
      </article>
    </main>
  )
}

export default ArticleLayout
