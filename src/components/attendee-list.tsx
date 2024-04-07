import  {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search} from 'lucide-react'
import { ChangeEvent, EventHandler, useState } from 'react'
import { attendees } from '../data/attendees'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from  'dayjs/plugin/relativeTime'

import { Table } from '../table/table'
import { IconButton } from './icon-buton'
import { IconTh } from './iconTh'
import { IconTd } from './iconTd'



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
    
    </div>
    
     <Table>
        <thead>
          <tr className=' border-d border-white/10'>
            <th style={{width:48}} className='py-3 px-4 text-sm font-semibold text-left'>
              <input type="checkbox" className='size-4 bg-black/20 rounded bordrder border-white/10 accent-orange-400'/>
            </th>
             <IconTh>Codigo</IconTh>
            <IconTh>Participantes</IconTh>
            <IconTh >Data de inscrição</IconTh>
            <IconTh >Data de check-in</IconTh>
            <IconTh style={{width:64}}>exemplo</IconTh>

          </tr>
        </thead>
        <tbody>
            {attendees.slice((page - 1) * 10, page * 10 ).map((attendee)=>{
              return(
                <tr key={attendee.id} className='border border-white/10  hover:bg-white/5'>
                  <IconTd>
                   <input type="checkbox" className='size-4 bg-black/20 rounded bordrder border-white/10 accent-orange-400' />
                  </IconTd>
                  <IconTd>{attendee.id}</IconTd>
                  <IconTd>
                    <div className='flex flex-col gap-1'>
                      <span className='font-semibold text-white'>{attendee.name}</span>
                      <span>{attendee.email}</span>
                    </div>
                  </IconTd>
                  <IconTd>{dayjs().to(attendee.createdAt)}</IconTd>
                  <IconTd>{dayjs().to(attendee.checkedInAt)}</IconTd>
                  <IconTd>
                  
                    <IconButton transparent>
                      <MoreHorizontal className='size-4'/>
                    </IconButton>
                  </IconTd>
                </tr>
              )
            })}
        </tbody>
        <tfoot>
          <tr >
          <IconTd colSpan={3}>
          <span>Mostrando 10 de {attendees.length} </span>
            </IconTd>
            
            <IconTd className='text-right' colSpan={3}>    

             <div className=' inline-flex items-center gap-8'>
             <span> Pagina {page} de {} </span>

             <div className=' flex gap-1.5'>
            
              <IconButton onClick={goToFirstPage} disabled={page === 1}>
              <ChevronsLeft className='size-4'/>
              </IconButton>

              <IconButton onClick={goToPreviousPage} disabled={page === 1 }>
                   <ChevronLeft className='size-4'/> 
              </IconButton>
              
              <IconButton onClick={goToNextPage} disabled={page === totalPage}>
              <ChevronRight className='size-4'/>
              </IconButton>
              
              <IconButton  onClick={goToLastPage} disabled={page === totalPage}>
              <ChevronsRight className='size-4'/>
              </IconButton>
                    
             </div>
             </div>
           </IconTd>         
          </tr>
        </tfoot>

      </Table>

    </div>
  )
}