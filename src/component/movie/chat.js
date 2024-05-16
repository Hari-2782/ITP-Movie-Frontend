import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: '',
      age: '',
      reviewed: false, // Add a flag to track if the review has been shown
    };
  }

  componentDidUpdate(prevProps) {
    if (!this.state.reviewed && this.props.steps !== prevProps.steps) {
      const { steps } = this.props;
      const { name, gender, age } = steps;

      this.setState({ name, gender, age, reviewed: true }, () => {
        // Once the state is updated, trigger the next step
        this.props.triggerNextStep();
      });
    }
  }

  render() {
    const { name, gender, age } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td>Gender</td>
              <td>{gender.value}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td>{age.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}


class SimpleForm extends Component {
  
  
    render() {
     
  
      return (
        <div>
         
            <ChatBot   headerTitle="BalaCinemaBot"
            floating={true} 
              steps={[
                {
                    id: '1',
                    message: 'What is your name?',
                    trigger: 'name',
                  },
                  {
                    id: 'name',
                    user: true,
                    trigger: '2',
                  },
                  {
                    id: '2',
                    message: 'Hi {previousValue}! What is your gender?',
                    trigger: 'gender',
                  },
                  {
                    id: 'gender',
                    options: [
                      { value: 'male', label: 'Male', trigger: '3' },
                      { value: 'female', label: 'Female', trigger: '3' },
                    ],
                  },
                  {
                    id: '3',
                    message: 'How old are you?',
                    trigger: 'age',
                  },
                {
                  id: 'age',
                  user: true,
                  trigger: '7',
                  validator: (value) => {
                    if (isNaN(value)) {
                      return 'value must be a number';
                    } else if (value < 0) {
                      return 'value must be positive';
                    } else if (value > 120) {
                      return `${value}? Come on!`;
                    }
  
                    return true;
                  },
                },
                {
                  id: '7',
                  message: 'Great! Check out your summary',
                  trigger: 'review',
                },
                {
                  id: 'review',
                  component: <Review />,
                  asMessage: true,
                  trigger: 'update',
                },
                {
                  id: 'update',
                  message: 'Would you like to update some field?',
                  trigger: 'update-question',
                },
                {
                  id: 'update-question',
                  options: [
                    { value: 'yes', label: 'Yes', trigger: 'update-yes' },
                    { value: 'no', label: 'No', trigger: 'end-message' },
                  ],
                },
                {
                  id: 'update-yes',
                  message: 'What field would you like to update?',
                  trigger: 'update-fields',
                },
                {
                  id: 'update-fields',
                  options: [
                    { value: 'name', label: 'Name', trigger: 'update-name' },
                    { value: 'gender', label: 'Gender', trigger: 'update-gender' },
                    { value: 'age', label: 'Age', trigger: 'update-age' },
                  ],
                },
                {
                  id: 'update-name',
                  update: 'name',
                  trigger: '7',
                },
                {
                  id: 'update-gender',
                  update: 'gender',
                  trigger: '7',
                },
                {
                  id: 'update-age',
                  update: 'age',
                  trigger: '7',
                },
                {
                  id: 'end-message',
                  message: 'Thanks! Your data was submitted successfully!',
                  end: true,
                },
              
              ]}
            />
        
        </div>
      );
    }
  }
  

export default SimpleForm;
