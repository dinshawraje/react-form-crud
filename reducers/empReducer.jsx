const empReducer = (state = [], action) => {
  switch (action.type) {

    case 'ADD_EMP':
      return state.concat([action.data]);
    case 'DELETE_EMP':
      return state.filter((emp) => emp.empId !== action.id);
    case 'EDIT_EMP':
      return state.map((emp) => emp.empId === action.id ? { ...emp, editing: !emp.editing } : emp)
    case 'UPDATE':
      return state.map((emp) => {
        console.log(' updated data' + emp)
        console.log('action details' + JSON.stringify(action))
        let newData = action.data
        if (emp.empId === action.id) {
          return {...emp,...newData}
          
        } else return emp;
      })
    default:
      return state;
  }
}
export default empReducer;
