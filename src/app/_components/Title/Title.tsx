'use client'

import { StoreType } from "_/lib/redux/reduxStore";
import { useSelector } from "react-redux"



export default function Title() {

const res = useSelector( (Store: StoreType) => Store.authReducer);

console.log(res , "this is token from title")

  return (
    <div>User Name {res.toString()}</div>
  )
}
