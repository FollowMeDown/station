import React, { FC, ReactNode } from 'react'
import PaginationButtons from './PaginationButtons'
import { Pagination as PaginationParams } from '../use-station/src'
import { toNumber, ceil, div, minus, plus, gt } from '../use-station/src'

type Props = {
  title?: string
  empty?: ReactNode
  link?: (page: number) => { pathname: string; search: string }
  action?: (page: number) => void
}

const Pagination: FC<PaginationParams & Props> = (props) => {
  const { title, empty, link, action, children, ...pagination } = props
  const { page, limit, totalCnt } = pagination
  const total = toNumber(ceil(div(totalCnt, limit)))

  const getLinks = () =>
    link && {
      prev: link(toNumber(minus(page, 1))),
      next: link(toNumber(plus(page, 1))),
    }

  const getActions = () =>
    action && {
      prev: () => action(toNumber(minus(page, 1))),
      next: () => action(toNumber(plus(page, 1))),
    }

  const renderEmpty = () =>
    empty ? <>{empty}</> : <p>{title ? `No ${title}s` : 'No Data'}</p>

  return gt(totalCnt, 0) ? (
    <>
      {children}
      <PaginationButtons
        links={getLinks()}
        actions={getActions()}
        current={toNumber(page)}
        total={total}
      />
    </>
  ) : (
    renderEmpty()
  )
}

export default Pagination
