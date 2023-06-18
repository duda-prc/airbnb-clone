import React from 'react';

import DeckGL from '@deck.gl/react';
import {MapView} from '@deck.gl/core';
import {TileLayer} from '@deck.gl/geo-layers';
import {BitmapLayer} from '@deck.gl/layers';

const INITIAL_VIEW_STATE = {
  latitude: 48.856614,
  longitude: 2.352222,
  zoom: 12,
  maxZoom: 20,
  maxPitch: 89,
  bearing: 0
};

const COPYRIGHT_LICENSE_STYLE = {
  position: 'absolute',
  right: 0,
  bottom: 0,
  backgroundColor: 'hsla(0,0%,100%,.5)',
  padding: '0 5px',
  font: '12px/20px Helvetica Neue,Arial,Helvetica,sans-serif'
};

const LINK_STYLE = {
  textDecoration: 'none',
  color: 'rgba(0,0,0,.75)',
  cursor: 'grab'
};

class Map extends React.Component {
  render() {
    const tileLayer = new TileLayer({
      // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
      data: [
        'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
        'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
      ],

      // Since these OSM tiles support HTTP/2, we can make many concurrent requests
      // and we aren't limited by the browser to a certain number per domain.
      maxRequests: 20,

      pickable: true,
      onViewportLoad: null,
      autoHighlight: false,
      highlightColor: [60, 60, 60, 40],
      // https://wiki.openstreetmap.org/wiki/Zoom_levels
      minZoom: 0,
      maxZoom: 19,
      tileSize: 256,
      zoomOffset: devicePixelRatio === 1 ? -1 : 0,
      renderSubLayers: props => {
        const {
          bbox: {west, south, east, north}
        } = props.tile;

        return [
          new BitmapLayer(props, {
            data: null,
            image: props.data,
            bounds: [west, south, east, north]
          })
        ];
      }
    });


    return (
      <DeckGL
        layers={[tileLayer]}
        views={new MapView({repeat: true})}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
      >
        <div style={COPYRIGHT_LICENSE_STYLE}>
          {'© '}
          <a style={LINK_STYLE} href="http://www.openstreetmap.org/copyright" target="blank">
            OpenStreetMap contributors
          </a>
        </div>
      </DeckGL>
    );
  }
}

export default Map;
