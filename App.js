import React, { useState,useEffect } from "react"   
import { TablePagination } from '@material-ui/core';

import './App.css';

function App() {
  const [isloading, setIsloading] = useState(true)
  const [ items, setItems ] = useState( [] )
  const [ page, setPage ] = useState( 0 );
  const [rowsPerPage,setRowsPerPage] = useState(3)
  
  
  useEffect( () => {
    fetch( 'https://reqres.in/api/users?per_page=12' )
      .then( res =>  res.json()  )
      .then( data => setItems( data.data ) )
      .catch( error => console.log( error ) )
    
      setIsloading(false)
  },[])

  const handleChangeRowsPerPage = event => {
  setRowsPerPage(parseInt(event.target.value))
  }
  
  const handlePageChange = ( event, newPage ) => {
    setPage(newPage)
  }

  const sortedData = ( items, page, rowsPerPage ) => {
    let slice = items.slice( page * rowsPerPage, ( page + 1 ) * rowsPerPage )
    return slice
  }
  
  const content = sortedData(items, page, rowsPerPage,)
  return (
    <div className="App">
      { isloading ? <div>Loading...</div> :
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Profile Photo</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>E-Mail</th>
            </tr>
          </thead>
          <tbody>
            { content.map( item => {
              return (
                <tr key={ item.id }>
                  <td>{ item.id }</td>
                  <td><img src={ item.avatar } /></td>
                  <td>{ item.first_name }</td>
                  <td>{ item.last_name }</td>
                  <td>{ item.email }</td>
                </tr>
              )
            } )
            }
          </tbody>
        </table>
      } 
    
      <TablePagination
        rowsPerPageOptions = {[3,6,9]}
        rowsPerPage = {rowsPerPage}
        component = "div"
        page={ page }
        onPageChange={ handlePageChange }
        onChangeRowsPerPage={ handleChangeRowsPerPage }
        count = {items.length}
      />
    </div>

    
  );
}

export default App;
