import React, { Fragment,  } from 'react';
import API from '../services';

import {  MDBContainer,MDBCol,MDBRow,MDBAlert, MDBDataTableV5 ,MDBJumbotron,MDBBadge,MDBBtn} from "mdbreact";

import Swal from 'sweetalert2';

class listEmployee extends React.Component {
    
    state={
        data : {
            columns: [
              {
                label: 'Name',
                field: 'employee1',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Phone Number',
                field: 'phone_number',
                sort: 'asc',
                width: 270
              },
              {
                label: 'Company',
                field: 'company',
                sort: 'asc',
                width: 270
              },
              {
                label: 'Country',
                field: 'country',
                sort: 'asc',
                width: 200
              },
              {
                label: 'State',
                field: 'state',
                sort: 'asc',
                width: 100
              },
              {
                label: 'City',
                field: 'city',
                sort: 'city',
                width: 50
              },
              {
                label: 'Action',
                field: 'action',
                sort: 'action',
                width: 50
              }
            ],
            rows: ""
          }
    }
  

    update(id){
      window.location = `/update/${id}`;
    }
    
    delete(id){
      Swal.fire({
        title: 'Do you want to Delete ?',
        showCancelButton: true,
        confirmButtonText: `Delete`,
      }).then((result) => {
        if (result.isConfirmed) {
          API.deleteEmployee(id).then(res=>{
            Swal.fire('Deleted!', '', 'success')
            setTimeout(()=>{
              window.location = `/`;
            },1500)
          }).catch(err=>{
            return Swal.fire('Failed!', '', 'info')
          })
        } 
    })
    }

    add(){
      window.location = `/create`;
    }

    componentDidMount(){
        API.getListEmployee('').then(res=>{
          let Resdata = res;
            if(res){

                let data = {...this.state.data}
                let addEvent = [];

                Resdata.forEach(m =>{
                    let result = {}
                    result['employee1'] = <h6><b>{m.employee1}</b></h6>
                    result['phone_number'] = <h6><b>{m.phone_number}</b></h6>
                    result['company'] = <h6><b>{m.company}</b></h6>
                    result['country'] = <h6><b>{m.company}</b></h6>
                    result['state'] = <h6><b>{m.state}</b></h6>
                    result['city'] = <h6><b>{m.city}</b></h6>
                    result['id'] = <h6><b>{m.id}</b></h6>

                    result['action'] = <h5 className="d-flex"><MDBBtn color="primary" onClick={()=>this.update(m.id)}  size="sm">Update</MDBBtn> <MDBBtn color="unique" onClick={()=>this.delete(m.id)} size="sm">Delete</MDBBtn></h5>

                    addEvent.push(result)
                })
                
                data['rows'] = addEvent
                
                this.setState({data})
            }
        }).catch(err=>{
            alert(err)
        })
    }

render() {  
    let states =  this.state.data
    return (
    <Fragment>
        <MDBContainer>
            <MDBJumbotron className="p-4">
                <MDBRow className="mt-1">
                    <MDBCol className="mb-2">
                        <MDBAlert color="primary">
                            <h5 className="mt-2"><b>Employee List</b></h5> 
                        </MDBAlert>
                    </MDBCol >
                </MDBRow>
                <MDBRow>
                  <MDBCol className="text-right mb-3">
                      <MDBBtn color="indigo" onClick={()=>this.add()} size="sm">Add Contact</MDBBtn>
                  </MDBCol>
                  
                </MDBRow>
                <MDBDataTableV5 
                style={{"cursor":"pointer"}}
                striped
                bordered
                hover
                data={states}
                />
            </MDBJumbotron>
        </MDBContainer>
    </Fragment>)
  }
}

// Exporting the component
export default listEmployee;
