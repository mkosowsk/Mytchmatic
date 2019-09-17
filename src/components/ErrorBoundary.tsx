import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

interface IProps { }

interface IState {
    hasError: boolean
}

class ErrorBoundary extends Component<IProps, IState> {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error: any) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        return <Header as='h1' className='white'>Something went wrong.</Header>
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary;