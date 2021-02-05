import { property, subclass } from '@arcgis/core/core/accessorSupport/decorators';
import { whenOnce } from '@arcgis/core/core/watchUtils';

import { tsx } from '@arcgis/core/widgets/support/widget';
import Widget from '@arcgis/core/widgets/Widget';
import '@esri/calcite-components';

import LayerList from '@arcgis/core/widgets/LayerList';
import Legend from '@arcgis/core/widgets/Legend';

export interface CalciteLayerLegendProperties extends esri.WidgetProperties {
  /**
   * Map or scene view instance.
   */
  view: esri.MapView | esri.SceneView;
  /**
   * Add `esri-widget--panel` class to widget.
   * @default false
   */
  panel?: boolean;
  /**
   * Layer list properties.
   */
  layerListProperties?: esri.LayerListProperties;
  /**
   * Legend properties.
   */
  legendProperties?: esri.LegendProperties;
  /**
   * Tab layout.
   * @default 'center'
   * @warning `.tab-nav` needs manual `padding-left` set with 'inline'.
   */
  layout?: 'inline' | 'center';
  /**
   * Calcite theme.
   * @default 'light'
   * @warning The background must be manually set with 'dark'.
   */
  theme?: 'light' | 'dark';
}

const CSS = {
  base: 'esri-widget cov-calcite-layer-list-legend',
  panel: 'esri-widget--panel',
  tabs: 'tabs',
  tabNav: 'tab-nav',
  tab: 'tab',
};

@subclass('cov.widgets.CalciteLayerLegend')
export default class CalciteLayerLegend extends Widget {
  @property()
  view!: esri.MapView | esri.SceneView;

  @property()
  panel = false;

  @property()
  layerListProperties: esri.LayerListProperties = {};

  @property()
  legendProperties: esri.LegendProperties = {};

  @property()
  layout = 'center';

  @property()
  theme = 'light';

  constructor(properties: CalciteLayerLegendProperties) {
    super(properties);
    whenOnce(this, 'view', () => {
      setTimeout(this._init.bind(this, this.view));
    });
  }

  private _init(view: esri.MapView | esri.SceneView): void {
    const { id, layerListProperties, legendProperties } = this;
    new LayerList({
      view,
      container: document.querySelector(`div[data-layer-list="${id}"]`) as HTMLDivElement,
      ...layerListProperties,
    });
    new Legend({
      view,
      container: document.querySelector(`div[data-legend="${id}"]`) as HTMLDivElement,
      ...legendProperties,
    });
  }

  render(): tsx.JSX.Element {
    const { panel, layout, theme, id } = this;
    return (
      <div class={this.classes(CSS.base, panel ? CSS.panel : '')}>
        <calcite-tabs class={CSS.tabs} layout={layout} theme={theme}>
          <calcite-tab-nav class={CSS.tabNav} slot="tab-nav">
            <calcite-tab-title active>Layers</calcite-tab-title>
            <calcite-tab-title>Legend</calcite-tab-title>
          </calcite-tab-nav>
          <calcite-tab class={CSS.tab} active>
            <div data-layer-list={id}></div>
          </calcite-tab>
          <calcite-tab class={CSS.tab}>
            <div class={CSS.tab} data-legend={id}></div>
          </calcite-tab>
        </calcite-tabs>
      </div>
    );
  }
}
