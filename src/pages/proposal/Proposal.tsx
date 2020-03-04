import React from 'react'
import { useParams } from 'react-router-dom'
import { useProposal, useMenu, ProposalUI } from '@terra-money/use-station'
import { useGoBack } from '../../hooks'
import ErrorComponent from '../../components/ErrorComponent'
import Loading from '../../components/Loading'
import Page from '../../components/Page'
import ProposalHeader from './ProposalHeader'
import ProposalFooter from './ProposalFooter'
import Deposit from './Deposit'
import Votes from './Votes'
import Actions from './Actions'
import VotesTable from '../../tables/VotesTable'
import Depositors from '../../tables/Depositors'

const Proposal = () => {
  useGoBack('/governance')

  const { Proposal: title } = useMenu()
  const { id } = useParams<{ id: string }>()
  const { error, loading, ui } = useProposal(id)

  const render = (ui: ProposalUI) => {
    const { vote, deposit, tallying } = ui

    return (
      <>
        <ProposalHeader {...ui} />

        {vote && (
          <>
            <Votes {...vote} />
            <VotesTable id={id} count={vote.count} />
          </>
        )}

        {deposit && (
          <div className="row">
            <div className="col col-4">
              <Deposit {...deposit} />
            </div>
            <div className="col col-8">
              <Depositors id={id} />
            </div>
          </div>
        )}

        {tallying && <ProposalFooter {...tallying} />}
      </>
    )
  }

  return (
    <Page title={title} action={ui && <Actions {...ui} />}>
      {error ? (
        <ErrorComponent card />
      ) : loading ? (
        <Loading card />
      ) : (
        ui && render(ui)
      )}
    </Page>
  )
}

export default Proposal
