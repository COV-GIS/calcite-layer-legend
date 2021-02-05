import esriConfig from '@arcgis/core/config';

import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

import Basemap from '@arcgis/core/Basemap';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

import FullMap from 'cov/layouts/FullView';
import MadeWith from 'cov/widgets/MadeWith';

import CalciteLayerLegend from './widgets/CalciteLayerLegend';

esriConfig.portalUrl = 'https://gisportal.vernonia-or.gov/portal';

const view = new MapView({
  map: new Map({
    basemap: new Basemap({
      portalItem: {
        id: 'f36cd213cc934d2391f58f389fc9eaec',
      },
    }),
    layers: [
      new FeatureLayer({
        portalItem: {
          id: 'c862260266124d6d8f6db2428e931889',
        },
        title: 'Vernonia Streets',
      }),
    ],
  }),
  zoom: 15,
  center: [-123.185, 45.859],
  constraints: {
    rotationEnabled: false,
  },
});

view.when((): void => {
  view.ui.add(
    new MadeWith({
      color: '#323232',
      size: '14px',
    }),
    'bottom-left',
  );
  view.ui.add(
    new CalciteLayerLegend({
      view,
      panel: true,
    }),
    'top-right',
  );
});

const app = new FullMap({
  view,
  title: 'Functional Classification',
  container: document.createElement('div'),
});

document.body.append(app.container);
