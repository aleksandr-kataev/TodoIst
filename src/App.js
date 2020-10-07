import React from 'react';
import { Content } from './components/layout/Content';
import { Header } from './components/layout/Header';
import {
  ProjectsProvider,
  SelectedProjectProvider,
} from './contextAPI';

export const App = () => {
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <div className='app'>
          <Header />
          <Content />
        </div>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};
