import React, { useEffect, useState } from 'react'

export default function Pagination( props ) {

  const { loadPages , totalPages , currentPage , changePage , previousPage , nextPage } = props;
  const [ pages , setPages ] = useState([]);

  useEffect(()=>{
    setPages( loadPages ); // se va a memorizar solo lo que develva la funcion para no estar ejecutandola cada vez que el componente se renderice
  },[loadPages])

  const styles = ( activated = false )=>{

    if ( activated ){ activated = 'active'; }

      return `pointer page-item page-link ${activated}`;

    }

  return (
    <>
        <ul className='pagination'>
          { currentPage !== 1 ? <li role='button' className={styles()} onClick={previousPage}>Prev</li> : '' } 
          {
                
              pages.map((page, index)=>{
                return (
                  
                  <li role='button' className={styles( true && page === currentPage )} key={index+1} onClick={() => changePage(page)}>{page}</li>  
                  
                )
              })
            
          }
          { currentPage !== totalPages ? <li role='button' className={styles()} onClick={nextPage}>Next</li> : ''  }
        </ul>
    </>
  )
}
