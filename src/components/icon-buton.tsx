import { ComponentProps } from "react";

  
interface iconButtonprops extends ComponentProps<'button'>{
  transparent?:boolean
}
  export function IconButton({transparent, ...props}:iconButtonprops){
    return(
      <button 
      {...props}
      className={transparent
      ?'bg-black/20 border border-white/10 rounded-md p-1.5'
      :'bg-white/20 border border-white/10 rounded-md p-1.5'
      }
      
      />
    )
  }