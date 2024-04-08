import  {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search} from 'lucide-react'
import { ChangeEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from  'dayjs/plugin/relativeTime'

import { Table } from '../table/table'
import { IconButton } from './icon-buton'
import { IconTh } from './iconTh'
import { IconTd } from './iconTd'




dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface attendees {
  id: string
  name: string
  email: string
  createdAt: string 
  checkedInAt: string | null
}

export function AttendeeList(){

  const  [valorDoInput, setValorDoInput] = useState(()=>{
    const url = new URL(window.location.toString())

    if(url.searchParams.has('search')){
     return url.searchParams.get('search') ?? ''
    }
    return ''
  })
  const  [page, setPage] = useState(()=>{
    const url = new URL(window.location.toString())

    if(url.searchParams.has('page')){
     return Number(url.searchParams.get('page'))
    }
    return 1
  })

const [total, setTotal]=useState(0)
  const [attendees, setAttendees] = useState<attendees[]>([])

  const totalPage = Math.ceil(total/ 10)

  useEffect(()=>{
    const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')

    url.searchParams.set('pageIndex', String(page -1))

    if(valorDoInput.length > 0){
    url.searchParams.set('query',valorDoInput)
    }


    fetch(url)
    .then(response => response.json())
    .then(data => {
      setAttendees(data.attendees)
      setTotal(data.total)
      console.log(data.attendees)
    })
  },[page,valorDoInput])

  function setCurrentSearch(search: string){
    const url = new URL(window.location.toString())

    url.searchParams.set('search',search)

    window.history.pushState({},"", url)
    setValorDoInput(search)
  }

  function setCurrentePage(page: number){
    const url = new URL(window.location.toString())

    url.searchParams.set('page',String(page))

    window.history.pushState({},"", url)
    setPage(page)
  }
    
  function buscarValorDoInput(event:ChangeEvent<HTMLInputElement>){
    setCurrentSearch(event.target.value)
   setCurrentePage(1)
  }
   
  function goToFirstPage(){
    setCurrentePage(1)
  }
  function goToLastPage(){
    setCurrentePage(totalPage)
  }
  function goToPreviousPage(){
    setCurrentePage(page - 1)
  }
  function goToNextPage(){
    setCurrentePage(page + 1)
  }

  return(
    <div className=' flex flex-col gap-4'>
      <div className="flex gap-3 items-center">
      <h1 className="text-2xl font-bold">Participantes</h1>
      <div className="px=3 w-72 py-1.5 border border-white/10 flex gap-3 rounded-lg ">
      <Search className='size-6 text-emerald-300'/>
      <input  onChange={buscarValorDoInput} 
      value={valorDoInput} 
      className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0" placeholder="Buscar participantes" type="text" />
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
            {attendees.map((attendee)=>{
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
                  <IconTd>{attendee.checkedInAt === null
                  ? <samp className='text-zinc-400'>não fez check-in</samp>
                  : dayjs().to(attendee.checkedInAt)
                  }
                  </IconTd>
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
          <span>Mostrando {attendees.length} de {total  } </span>
            </IconTd>
            
            <IconTd className='text-right' colSpan={3}>    

             <div className=' inline-flex items-center gap-8'>
             <span> Pagina {page} de {totalPage} </span>

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