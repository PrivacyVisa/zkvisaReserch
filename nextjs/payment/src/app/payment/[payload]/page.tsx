import React from 'react'

import MainPaymentContainer from '@/Components/Payment/MainContainer'
import { IUrlUserPayload } from '@/interface/transaction/transaction'

export default async function page({
    params,
  }: {
    params: Promise<{ payload : string }>
  }) {

  const UserPayload : IUrlUserPayload = JSON.parse(decodeURIComponent((await params).payload))
  
  return (
    <section>
        <MainPaymentContainer UserPayload={UserPayload}/>
    </section>
    )
}