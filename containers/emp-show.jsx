import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '../components/button';
import {Table} from 'react-bootstrap';
class EmpShow extends Component {
  handleClick(e) {
    let emp = this.props.location ? this.props.location.state.detail : this.props.newUser 
    console.log('empdate' + emp)
   
    this.props.history.push({
      pathname: '/emp-edit/'+[emp.empId],
      state: { newUser: emp }
    })
  }
  render() {
    const emp = this.props.location ? this.props.location.state.detail : this.props.newUser 
    
  return (
    <div>
      <h2>Employee Details</h2>
  
      <p>EmpID: {emp.empId}</p>
      <p>Name: {emp.name}</p> 
      <p>Email: {emp.email}</p>
      <p>Delivery Unit: {emp.du.label}</p>
      <p>Project: {emp.project.label}</p>
      <p>Domain: {emp.domain.label}</p>
      <h3> Skill Details </h3>
      <Table bordered hover size="sm">
        <thead>
          <tr> 
            <th>Category</th>
            <th>Skills</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {emp.skills.map((skill, idx) => 
            <tr key={idx}>
              <td>{skill.category.label}</td>
              <td>{skill.techSkill.label}</td>
              <td>{skill.rating.label}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <button onClick={(e) => this.handleClick(e)}>
        Edit
      </button>
      {/* <button
       onClick={()=>this.props.dispatch({type:'EDIT_EMP',id:emp.empId})}>
       Edit</button> */}
  {/* <Button action={this.handleClick} type={'primary'}
              title={'Edit'} /> */}
      <Button action={()=>this.props.dispatch({type:'DELETE_EMP',id:emp.empId})} type={'danger'}
              title={'Delete'} />

    </div>
  );
 }
}
export default connect() (EmpShow);