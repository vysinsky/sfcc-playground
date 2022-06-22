import React, { useCallback, useEffect, useMemo } from 'react';
import $ from 'jquery';

import 'metismenu/dist/metisMenu.min.css';
import 'metismenu';
import './Sidebar.css';
import { usePlaygroundContext } from './PlaygroundContext';
import { SelectedRoutes } from '../types';
import { Button, Form } from 'react-bootstrap';

function Sidebar() {
  const { routes, selectedRoutes, setSelectedRoutes } = usePlaygroundContext();

  useEffect(() => {
    $('.metismenu').metisMenu();
  }, []);

  const addRouteToSelection = useCallback(
    (route: string, action: string) => {
      setSelectedRoutes({
        ...selectedRoutes,
        [`${route}-${action}`]: { route, action },
      });
    },
    [selectedRoutes, setSelectedRoutes]
  );

  const removeRouteFromSelection = useCallback(
    (route: string, action: string) => {
      const key = `${route}-${action}`;
      const newRoutes: SelectedRoutes = {};

      Object.entries(selectedRoutes).forEach(([k, v]) => {
        if (k !== key) {
          newRoutes[k] = v;
        }
      });

      setSelectedRoutes(newRoutes);
    },
    [selectedRoutes, setSelectedRoutes]
  );

  const selectAllRoutes = useCallback(() => {
    const newRoutes: SelectedRoutes = {};

    routes.forEach((route) => {
      route.actions.forEach((action) => {
        newRoutes[`${route.name}-${action}`] = { route: route.name, action };
      });
    });

    setSelectedRoutes(newRoutes);
  }, [routes, setSelectedRoutes]);

  const deselectAllRoutes = useCallback(() => {
    setSelectedRoutes({});
  }, [setSelectedRoutes]);

  const allRoutesSelected = useMemo<boolean>(() => {
    let allAvailableRoutesCount = 0;

    Object.values(routes).forEach((route) => {
      allAvailableRoutesCount += route.actions.length;
    });

    return allAvailableRoutesCount === Object.keys(selectedRoutes).length;
  }, [routes, selectedRoutes]);

  return (
    <Form>
      <div className="app-sidebar sidebar-shadow">
        <div className="app-sidebar__inner">
          <h5 className="app-sidebar__heading">
            <div>Routes</div>
            <Button
              size="sm"
              variant="outline-secondary"
              onClick={allRoutesSelected ? deselectAllRoutes : selectAllRoutes}
            >
              {allRoutesSelected ? 'Deselect' : 'Select'} all
            </Button>
          </h5>
          <div className="metismenu vertical-nav-menu">
            {routes.map((route) => (
              <ul className="metismenu-container" key={route.name}>
                <li className="metismenu-item">
                  <a
                    href={`#${route.name}`}
                    className="metismenu-link has-arrow"
                    onClick={(e) => e.preventDefault()}
                  >
                    <div className="d-flex justify-content-between">
                      {route.name}
                    </div>
                  </a>
                  <ul className="metismenu-container">
                    {route.actions.map((action) => (
                      <li className="metismenu-item" key={action}>
                        <Form.Check
                          inline
                          name={action}
                          type="checkbox"
                          id={`${route.name}-action-${action}`}
                          label={action}
                          className="metismenu-link"
                          checked={
                            typeof selectedRoutes[`${route.name}-${action}`] !==
                            'undefined'
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              addRouteToSelection(route.name, action);
                            } else {
                              removeRouteFromSelection(route.name, action);
                            }
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </Form>
  );
}

export default Sidebar;
