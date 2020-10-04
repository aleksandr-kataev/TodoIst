import React from 'react';
import { Content } from './components/layout/Content';
import { Header } from './components/layout/Header';
import {
  ProjectsProvider,
  SelectedProjectsProvider,
} from './context';

export const App = () => {
  return (
    <SelectedProjectsProvider>
      <ProjectsProvider>
        <div className='app'>
          <Header />
          <Content />
        </div>
      </ProjectsProvider>
    </SelectedProjectsProvider>
  );
};
