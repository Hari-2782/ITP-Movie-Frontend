import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';

class MovieChatbot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: null,
      age: null,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:8000/movie/get/${this.props.movieid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          const movie = data.data;
          this.setState({ movie }); // Set movie state for any genre
        }
      })
      .catch((err) => {
        console.error('Error fetching movie details:', err); // Add error handling
      });
  }

  render() {
    const { movie, age } = this.state;

    if (!movie) {
      return <div>Loading...</div>;
    }

    const isThrillerHorror = movie.genre.includes("Thriller") || movie.genre.includes("Horror");

    const steps = [
      {
        id: '1',
        message: `Welcome to Bala Cinema! We're showing ${movie.title} today. Are you excited to watch it?`,
        trigger: 'excitement',
      },
      {
        id: 'excitement',
        options: [
          { value: 1, label: 'Absolutely!', trigger: 'synopsis' },
          { value: 2, label: 'Hmm, tell me more...', trigger: 'synopsis' },
        ],
      },
      {
        id: 'synopsis',
        message: `${movie.title} is a ${movie.genre} movie. Here's a quick synopsis: ${movie.description}`,
        trigger: isThrillerHorror ? 'check-age' : 'enjoy-movie',
      },
      {
        id: 'check-age',
        message: 'How old are you?',
        trigger: 'age',
      },
      {
        id: 'age',
        user: true,
        trigger: 'check-age-confirmation',
        validator: (value) => {
          const ageValue = parseInt(value);
          if (isNaN(ageValue)) {
            return 'Age must be a number.';
          } else if (ageValue < 0) {
            return 'Age must be a positive number.';
          } else {
            this.setState({ age: ageValue });
            return true;
          }
        },
      },
      {
        id: 'check-age-confirmation',
        message: () => {
          const { age } = this.state;
          if (age >= 18) {
            return `Great! You are old enough to watch ${movie.title}. Enjoy the movie!`;
          } else {
            return `Sorry, you are not old enough to watch ${movie.title}.`;
          }
        },
        end: true,
      },
      {
        id: 'enjoy-movie',
        message: `Great choice! Enjoy watching ${movie.title}!`,
        end: true,
      },
      {
        id: 'screen-id',
        message: 'What is the screen ID for your booking?',
        trigger: 'screen-id-response',
      },
      {
        id: 'screen-id-response',
        user: true,
        trigger: 'screen-id-confirmation',
        validator: (value) => {
          if (!value || value.trim() === '') {
            return 'Please enter a valid screen ID.';
          } else {
            return true;
          }
        },
      },
      {
        id: 'screen-id-confirmation',
        message: 'Screen ID confirmed! We will reserve your seats accordingly.',
        end: true,
      },
    ];
    

    return (
      <ChatBot
        headerTitle="Movie Chatbot"
        steps={steps}
        floating={true}
      />
    );
  }
}

export default MovieChatbot;
