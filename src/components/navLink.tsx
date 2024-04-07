import { ComponentProps } from "react";

interface navLinkProps extends ComponentProps<'a'>{

}

export function NavLink(props:navLinkProps){
  return(
    <a className='font-medium text-sm' {...props}/>
  )
  
}