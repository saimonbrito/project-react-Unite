import  {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search} from 'lucide-react'
import { ChangeEvent, EventHandler, useState } from 'react'
import { attendees } from '../data/attendees'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from  'dayjs/plugin/relativeTime'



dayjs.extend(relativeTime)
dayjs.locale('pt-br')



export function AttendeeList(){
  const  [valorDoInput, setValorDoInput] = useState('')
  const  [page, setPage] = useState(1)

  const totalPage = Math.ceil(attendees.length / 10)
    
  function buscarValorDoInput(event:ChangeEvent<HTMLInputElement>){
   setValorDoInput(event.target.value)
  }
   
  function goToFirstPage(){
    setPage(1)
  }
  function goToLastPage(){
    setPage(totalPage)
  }
  function goToPreviousPage(){
    setPage(page - 1)
  }
  function goToNextPage(){
    setPage(page + 1)
  }

  return(
    <div className=' flex flex-col gap-4'>
      <div className="flex gap-3 items-center">
      <h1 className="text-2xl font-bold">Participantes</h1>
      <div className="px=3 w-72 py-1.5 border border-white/10 flex gap-3 rounded-lg ">
      <Search className='size-6 text-emerald-300'/>
      <input  onChange={buscarValorDoInput} className="bg-transparent flex-1 outline-none border-0 p-0 text-sm" placeholder="Buscar participantes" type="text" />
      </div>
       {valorDoInput}
    </div>
    
     <div className='border border-white/10 rounded-lg'>
      <table className='w-full'>
        <thead>
          <tr className=' border-d border-white/10'>
            <th style={{width:48}} className='py-3 px-4 text-sm font-semibold text-left'>
              <input type="checkbox" className='size-4 bg-black/20 rounded bordrder border-white/10 accent-orange-400'/>
            </th>
            <th className='py-3 px-4 text-sm font-semibold text-left'>Codigo</th>
            <th className='py-3 px-4 text-sm font-semibold text-left'>Participantes</th>
            <th className='py-3 px-4 text-sm font-semibold text-left'>Data de inscrição</th>
            <th className='py-3 px-4 text-sm font-semibold text-left'>Data de check-in</th>
            <th style={{width:64}} className='py-3 px-4 text-sm font-semibold text-left'></th>

          </tr>
        </thead>
        <tbody>
            {attendees.slice((page - 1) * 10, page * 10 ).map((attendee)=>{
              return(
                <tr key={attendee.id} className='border border-white/10  hover:bg-white/5'>
                  <td className='py-3 px-4 text-sm text-zinc-300'>
                   <input type="checkbox" className='size-4 bg-black/20 rounded bordrder border-white/10 accent-orange-400' />
                  </td>
                  <td className='py-3 px-4 text-sm text-zinc-300'>{attendee.id}</td>
                  <td className='py-3 px-4 text-sm text-zinc-300'>
                    <div className='flex flex-col gap-1'>
                      <span className='font-semibold text-white'>{attendee.name}</span>
                      <span>{attendee.email}</span>
                    </div>
                  </td>
                  <td className='py-3 px-4 text-sm text-zinc-300'>{dayjs().to(attendee.createdAt)}</td>
                  <td className='py-3 px-4 text-sm text-zinc-300'>{dayjs().to(attendee.checkedInAt)}</td>
                  <td className='py-3 px-4 text-sm text-zinc-300'>
                    <button className='bg-black/20 border border-white/10 rounded-md p-1.5'>
                      <MoreHorizontal className='size-4'/>
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
        <tfoot>
          <tr >
          <td className='py-3 px-4 text-sm text-zinc-300' colSpan={3}>
          <span>Mostrando 10 de {attendees.length} </span>
            </td>
            
            <td className='py-3 px-4 text-sm text-zinc-300 text-right' colSpan={3}>    

             <div className=' inline-flex items-center gap-8'>
             <span> Pagina {page} de {} </span>

             <div className=' flex gap-1.5'>
             <button 
               
             onClick={goToFirstPage} disabled={page === 1} className='bg-white/10 border border-white/10 rounded-md p-1.5'>
                      <ChevronsLeft className='size-4'/>
              </button>
              <button onClick={goToPreviousPage} disabled={page === 1 } className='bg-white/10 border border-white/10 rounded-md p-1.5'>
                      <ChevronLeft className='size-4'/> 
              </button>
              <button onClick={goToNextPage} disabled={page === totalPage} className='bg-white/10 border border-white/10 rounded-md p-1.5'>
                      <ChevronRight className='size-4'/>
              </button>
              <button onClick={goToLastPage} disabled={page === totalPage} className='bg-white/10 border border-white/10 rounded-md p-1.5'>
                      <ChevronsRight className='size-4'/>
              </button>
             </div>
             </div>
           </td>         
          </tr>
        </tfoot>

      </table>

     </div>

    </div>
  )
}