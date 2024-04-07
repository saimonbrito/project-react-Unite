import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
interface iconTdProps extends ComponentProps<'td'>{}

export function IconTd(props:iconTdProps){
  return(
    <td {...props}className={twMerge('py-3 px-4 text-sm  text-zinc-300',props.className)}/>
  )
}