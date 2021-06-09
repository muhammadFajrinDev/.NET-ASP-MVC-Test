import React, { Fragment } from 'react';
import API from '../services';

import {  MDBContainer,MDBCol,MDBRow,MDBBtn,MDBIcon,MDBAlert,MDBJumbotron,MDBCollapse } from "mdbreact";

import Swal from 'sweetalert2';

class Add extends React.Component {

    state={
        data : {
            employee1 :"",
            phone_number:"",
            company:"",
            country:"",
            zip_code: "",
            state: "",
            city: "",
            id:"",
        },
        isUpdate:false,
    }

    componentDidMount(){
        // Get Code id
       let id = this.props.match.params.id;
       if(!id == ''){
           API.getEmployee(this.props.match.params.id).then(res=>{
                if(res){
                    this.setState({isUpdate:true,data:res})
                }
           }).catch(err=>{
                alert(err)
            })
       }else{
        let randoms = new Date().getTime();
        let data = {...this.state.data}; 
        data['id'] = randoms;
        this.setState({data:data})
       }
    }

    postEmployee(){
        API.postEmployee(this.state.data).then(res=>{
            this.setState({
                isUpdate :false,
                data : {
                    employee1 :"",
                    phone_number:"",
                    company:"",
                    country:"",
                    zip_code: "",
                    state: "",
                    city: "",
                    id:"",
                }
            })
            window.location = `/`;
        }).then(err=>{
            console.log(err)
        })
    }

    updateEmployee(){
        API.updateEmployee(this.state.data,this.props.match.params.id).then(res=>{
            Swal.fire('Success !', '', 'success')
            setTimeout(()=>{
                window.location = `/update/${this.props.match.params.id}`;
            },1500)
        }).then(err=>{
            console.log(err)
        })
    }

    handleSubmit = (e) => { 
        e.preventDefault() 
        Swal.fire({
            title: 'Do you want to Submit ?',
            showCancelButton: true,
            confirmButtonText: `Save`,
          }).then((result) => {
            if (result.isConfirmed) {
                if(this.state.isUpdate){
                    this.updateEmployee();
                }else{
                    this.postEmployee();
                }
            } 
        })
    }

    handleChange(e){
    
        let form = {...this.state.data}; 
        form[e.target.name] = e.target.value;

        this.setState({data:form})
    }

    backList(){
        window.location = `/`;
    }

    getBase64 = async file => {
        return await new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
            reader.readAsDataURL(file);
        
            // on reader load somthing...
            reader.onload = () => {
            // Make a fileInfo Object
            baseURL = reader.result;
         
            resolve(baseURL);
          };
        });
      };

    handleFileInputChange = async e => {
        let { zip_code } = this.state.data;
    
        zip_code = e.target.files[0];
        if(zip_code.type != 'image/png'){
            return Swal.fire('File must be image or PNG', '', 'info') 
        }
        await this.getBase64(zip_code)
          .then(result => {
            let form = {...this.state.data}; 
            form['zip_code'] = result;
            this.setState({data:form})
          })
          .catch(err => {
            alert(err)
          });

      };

render() {  
    let {employee1,phone_number,company,country,zip_code,state,city} = this.state.data
    console.log(this.state)
    return (
    <Fragment>
        <MDBContainer>
            <MDBJumbotron className="p-4">
            <MDBRow className="mt-1">
                <MDBCol className="mb-2">
                    <MDBAlert color="primary">
                        {
                        this.state.isUpdate ? (
                            <h5 className="mt-2"><b>Update Data</b></h5>
                        ) : (
                            <h5 className="mt-2"><b>Insert Data</b></h5>
                        )
                        }
                        
                    </MDBAlert>
                </MDBCol >
            </MDBRow>
            <form onSubmit={this.handleSubmit}  onChange={(a)=>this.handleChange(a)}>
            <MDBRow className="text-center">
            <MDBCol>
                {
                    this.state.data.zip_code.length != 0 && (
                        <img style={{width:300,height:300}} src={zip_code} alt="thumbnail" className="img-thumbnail" />

                    ) 
                }
            </MDBCol>
            <MDBCol md="12" className="mt-5">
                    <div className="form-group">
                    <label htmlFor="employee1">Upload Photo : {this.state.file}</label>
                    <input type="file" name="file" className="ml-4" onChange={this.handleFileInputChange} />
                    </div>
            </MDBCol>
            </MDBRow>
            <MDBRow className="d-flex justify-content-between mb-4 p-4">
                <MDBCol md="12">
                    <div className="form-group">
                    <label htmlFor="employee1">Name</label>
                    <input   
                        type="text"
                        className="form-control"
                        id="employee1"
                        name="employee1"
                        value={employee1}
                        required
                    />
                    </div>
                </MDBCol>
                <MDBCol md="12">
                <div className="form-group">
                <label htmlFor="company">Company</label>
                <input     
                    type="text"
                    className="form-control"
                    id="company"
                    name="company"
                    value={company}
                    required
                />
                </div>
                </MDBCol>
                <MDBCol md="12">
                <div className="form-group">
                <label htmlFor="phone_number">Phone Number</label>
                <input      
                    type="text"
                    className="form-control"
                    id="phone_number"
                    name="phone_number"
                    value={phone_number}
                    required
                />
                </div>
                </MDBCol>
                <MDBCol md="12">
                <div className="form-group">
                <label htmlFor="country">Country</label>
                <input          
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={country}
                    required
                />
                </div>
                </MDBCol>
                <MDBCol md="12">
                <div className="form-group">
                <label htmlFor="state">State</label>
                <input                  
                    type="text"
                    className="form-control"
                    id="state"
                    name="state"
                    value={state}
                    required
                />
                </div>
                </MDBCol>
                <MDBCol md="12">
                <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={city}
                    required
                />
                </div>
                </MDBCol>
            </MDBRow>
                <hr/>
            <MDBRow className="d-flex justify-content-center">
                <MDBBtn color="indigo" className="" onClick={()=>this.backList()} size="lg">Back </MDBBtn>
                {
                    this.state.isUpdate ? (
                        <input class="btn btn-primary " type="submit" value="Update"/>
                    ) : (
                        <input class="btn btn-primary " type="submit" value="Submit"/>
                    )
                }
            </MDBRow>

            </form>
            </MDBJumbotron>
        </MDBContainer>
    </Fragment>)
  }
}

// Exporting the component
export default Add;
