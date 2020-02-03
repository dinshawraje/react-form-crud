import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../components/input';
// import Select from '../components/Select';
import Button from '../components/button';
import Select from 'react-select';

class EditEmp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newUser: {}
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state.newUser = this.props.location ? this.props.location.state.newUser : this.props.newUser;
    this.handleInput = this.handleInput.bind(this);
    this.handleAddSkill = this.handleAddSkill.bind(this);
    this.handleRemoveSkill = this.handleRemoveSkill.bind(this);
    this.handleSkillInput = this.handleSkillInput.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }
  handleInput(e) {
    const { name, value } = e.target
    this.setState(prevState => ({
      newUser:
      {
        ...prevState.newUser, [name]: value
      }
    }), () => console.log(this.state.newUser))
  }
  handleFormSubmit(e) {
    e.preventDefault();
    let data = this.state.newUser;
    data.editing =false
    console.log('Data fetch submitted' + JSON.stringify(data))
    this.props.dispatch({
      type: 'UPDATE',
      id: data.empId, 
      data: data 
    })
    // if (this.props.location) {
    //   this.props.history.push({
    //     pathname: '/emp/'+[data.empId],
    //     state: { detail: data }
    //   })
    // }
    
  }

  
  handleAddSkill = (event) => {
    event.preventDefault();
    this.setState(prevState => ({
      newUser:
      {
        ...prevState.newUser, skills: this.state.newUser.skills.concat([{
          techSkill: [],
          rating: []
        }])
      }
    }), () => console.log(this.state.newUser))
  };

  handleRemoveSkill = idx => () => {
    this.setState({
      newUser: {
        skills: this.state.newUser.skills.filter((s, sidx) => idx !== sidx)
      }
    });
  }

  handleSkillInput = idx => (selectedOption, nameOfComponent) => {
    console.log(this.state.newUser)
    // const { name, value } = evt.target
    const newSkills = this.state.newUser.skills.map((skill, sidx) => {
      if (idx !== sidx) return skill;
      return { ...skill, [nameOfComponent.name]: selectedOption };
    });
    this.setState(prevState => ({
      newUser:
      {
        ...prevState.newUser, skills: newSkills
      }
    }), () => console.log(this.state.newUser))

  };
  handleSelectChange = (selectedOption, nameOfComponent) => {
    console.log('nameofComponent' + JSON.stringify(nameOfComponent));
    console.log('selectedOption' + JSON.stringify(selectedOption))
    this.setState(prevState => ({
      newUser:
      {
        ...prevState.newUser, [nameOfComponent.name]: selectedOption
      }
    }), () => console.log(this.state.newUser))
  };
  render() {
    const duOptions = require('../data/duOptions.json');
    const projectOptions = require('../data/projectOptions.json');
    const domainOptions = require('../data/domainOptions.json');
    const categoryOptions = require('../data/categoryOptions.json');
    const techSkillOption = require('../data/techSkillOptions.json');
    const ratingOption = require('../data/ratingOptions.json');
    const filterprojectOptions = projectOptions.filter((o) => o.link === this.state.newUser.du.value)
    const filterdomainOptions = domainOptions.filter((o) => o.link === this.state.newUser.project.value)
    return (
      <div>
        Hello
        <form className="container-fluid mt-5" onSubmit={this.handleFormSubmit}>
          <div className="form-row">
            <Input inputType={'text'}
              title={'Emp ID'}
              name={'empId'}
              value={this.state.newUser.empId}
              placeholder={'Enter your employee id'}
              handleChange={this.handleInput}
            />
            <Input inputType={'text'}
              title={'UserName'}
              name={'name'}
              value={this.state.newUser.name}
              placeholder={'Enter your name'}
              handleChange={this.handleInput}
            /> {/* Name of the user */}
            <Input inputType={'email'}
              name={'email'}
              title={'Email'}
              value={this.state.newUser.email}
              placeholder={'Enter your email'}
              handleChange={this.handleInput} /> {/* Email */}
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label className="form-label col-form-label "> Delivery Unit  </label>
              <Select
                name={'du'}
                options={duOptions}
                value={this.state.newUser.du}
                onChange={this.handleSelectChange}
              />
            </div>
            <div className="form-group col-md-4">
              <label className="form-label col-form-label "> Projects  </label>
              <Select title={'Project'}
                name={'project'}
                options={filterprojectOptions}
                value={this.state.newUser.project}
                onChange={this.handleSelectChange}
              /> {/* Project Selection */}
            </div>
            <div className="form-group col-md-4">
              <label className="form-label col-form-label "> Domain  </label>
              <Select title={'Domain'}
                name={'domain'}
                options={filterdomainOptions}
                value={this.state.newUser.domain}
                onChange={this.handleSelectChange}
              />{/* Domain Selection */}
            </div>
          </div>
         
          {
            this.state.newUser.skills.map((skill, idx) => (
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label className="form-label col-form-label"> Category  </label>
                    <Select
                      name={'category'}
                      options={categoryOptions}
                      value={skill.category}
                      onChange={this.handleSkillInput(idx)}
                    />{/* Domain Selection */}
                </div>
                <div className="form-group col-md-4">
                  <label className="form-label col-form-label "> Skill  </label>
                    <Select
                      name={'techSkill'}
                      options={(skill.category) ? (techSkillOption.filter((o) => o.link === skill.category.value)) : techSkillOption}
                      value={skill.techSkill}
                      onChange={this.handleSkillInput(idx)}
                    />
                </div>
                <div className="form-group col-md-2">
                  <label className="form-label col-form-label"> Rating  </label>
                    <Select
                      name={'rating'}
                      options={ratingOption}
                      value={skill.rating}
                      onChange={this.handleSkillInput(idx)}
                    />
                </div>
                <div className="form-group col-md-2">
                  <Button
                    action={this.handleRemoveSkill(idx)}
                    type={'btn btn-danger form-control'}
                    title={'remove'}
                    style={buttonStyle}
                  />
                </div>                
              </div>
            ))
          }
          
          <Button
            action={this.handleAddSkill}
            type={'btn btn-primary'}
            title={'Update Skills'}
          /> { /*Submit */}
          <br />
          <div className='text-center'>
            <Button
              type={'btn btn-primary'}
              title={'Save'}
            /> { /*Submit */}

            <Button
              action={this.handleClearForm}
              type={'btn btn-secondary'}
              title={'Clear'}
            /> {/* Clear the form */}
          </div>


        </form>
      </div>
    );
  }
}
const buttonStyle = {
  marginTop: '35px'
}
export default connect()(EditEmp);