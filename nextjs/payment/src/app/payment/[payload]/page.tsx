import React from 'react'

import MainPaymentContainer from '@/Components/Payment/MainContainer'
import { CartDataType } from '@/interface/transaction/transaction'

export default async function page({
    params,
  }: {
    params: Promise<{ payload : string }>
  }) {

  const payload : CartDataType = JSON.parse(decodeURIComponent((await params).payload))
  
  return (
    <section>
        <MainPaymentContainer payload={payload}/>
    </section>
    )
}