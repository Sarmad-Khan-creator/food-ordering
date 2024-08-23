import { getOrdersValue } from '@/actions/orders.actions'
import React from 'react'

const Orders = async () => {
    await getOrdersValue()
  return (
    <div>Orders</div>
  )
}

export default Orders