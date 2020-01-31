import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmpShow from './emp-show';
import EditEmp from './edit-emp'

class EmpList extends Component {
  render() {
    return (
    <div>
      <h2>Employee Lists Page</h2>
      {this.props.emps.map((emp) => 
        <div key={emp.id}> 
          {emp.editing ? <EditEmp newUser={emp} key={emp.empId} /> : <EmpShow key={emp.empId} newUser={emp} />} 
        </div>
      )}
      
    </div>
    );
   }
}
const mapStateToProps = (state) => {
  return {
      emps: state
  }
}
export default connect(mapStateToProps)(EmpList);