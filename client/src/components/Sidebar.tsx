import React, { useContext, useEffect } from 'react';
import $ from 'jquery';

import 'metismenu/dist/metisMenu.min.css';
import 'metismenu';
import './Sidebar.css';
import { PlaygroundContext } from './PlaygroundContext';
import { Link } from 'react-router-dom';

function Sidebar() {
  const { routes } = useContext(PlaygroundContext);

  useEffect(() => {
    $('.metismenu').metisMenu();
  }, []);

  return (
    <div className="app-sidebar sidebar-shadow">
      <div className="app-sidebar__inner">
        <h5 className="app-sidebar__heading">Routes</h5>
        <div className="metismenu vertical-nav-menu">
          {routes.map((route) => (
            <ul className="metismenu-container" key={route.name}>
              <li className="metismenu-item">
                <a href={`#${route.name}`} className="metismenu-link has-arrow">
                  {route.name}
                </a>
                <ul className="metismenu-container">
                  {route.actions.map((action) => (
                    <li className="metismenu-item" key={action}>
                      <Link
                        to={`/route/${route.name}-${action}`}
                        className="metismenu-link"
                      >
                        {action}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
