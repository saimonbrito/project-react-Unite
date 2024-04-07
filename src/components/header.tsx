import Logo from '../assets/logo.svg'
import { NavLink } from './navLink'

export function Header(){
  return(
    <div className='flex items-center gap-5 py-2'>
      <img src={Logo} alt="" />

      <nav className=' flex items-center gap-5'>
       <NavLink href='/eventos' >Eventos</NavLink>
       <NavLink href='/participante' >Participantes</NavLink>
      </nav>
    </div>
    
  )
}