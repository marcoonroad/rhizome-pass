import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  padding-left: auto;
  padding-right: auto;
  padding-top: auto;
  padding-bottom: auto;
`;

const LoadingFailed: React.FC = () => {
  return (
    <Div>
      <span>Failed to load content, please reload.</span>
    </Div>
  );
};

const LoadingProgress: React.FC = () => {
  return (
    <Div>
      <span>Loading...</span>
    </Div>
  );
};

class ErrorBoundary extends React.Component {
  state = {failed: false};

  getDerivedStateFromError(error: Error | string) {
    console.error(error);
    return {failed: true};
  }

  render() {
    if (this.state.failed) {
      return <LoadingFailed />;
    }

    return this.props.children;
  }
}

class ComponentLoader extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <React.Suspense fallback={<LoadingProgress />}>
          {this.props.children}
        </React.Suspense>
      </ErrorBoundary>
    );
  }
}

export default ComponentLoader;
