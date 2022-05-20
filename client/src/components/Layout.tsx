import React, { PropsWithChildren } from 'react';

import './Layout.css';
import Sidebar from './Sidebar';
import { Header } from './Header';

function Layout({ children }: PropsWithChildren<any>) {
  return (
    <div className="app-container fixed-header fixed-sidebar">
      <Header />
      <div className="app-main">
        <aside>
          <Sidebar />
        </aside>
        <div className="app-main__outer">
          <main className="app-main__inner">
            <div>{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
