import React from 'react'
import { useAssets, AssetsUI, User } from '@terra-money/use-station'
import { isExtension } from '../../utils/env'
import { localSettings } from '../../utils/localStorage'
import { useRemovePadding } from '../../hooks'
import ErrorComponent from '../../components/ErrorComponent'
import Loading from '../../components/Loading'
import Info from '../../components/Info'
import AvailableList from './AvailableList'
import VestingList from './VestingList'

const Assets = ({ user }: { user: User }) => {
  useRemovePadding()

  const { hideSmallBalances: hideSmall = false } = localSettings.get()
  const { error, loading, ui } = useAssets(user, { hideSmall })

  const render = ({ card, available, vesting }: AssetsUI) => (
    <>
      {card && <Info icon="info_outline" {...card} card={!isExtension} />}
      {available && <AvailableList {...available} />}
      {vesting && <VestingList {...vesting} />}
    </>
  )

  return error ? (
    <ErrorComponent />
  ) : loading ? (
    <Loading card />
  ) : ui ? (
    render(ui)
  ) : null
}

export default Assets
