import { ComponentProps } from "react";

interface iconThProps extends ComponentProps<'th'>{}

export function IconTh(props:iconThProps){
  return(
    <th {...props}className='py-3 px-4 text-sm font-semibold text-left'/>
  )
}