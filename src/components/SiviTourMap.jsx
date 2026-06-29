import { MapPin } from 'lucide-react'
import { Map, MapMarker, MarkerContent, MarkerLabel, MarkerTooltip } from '@/components/ui/mapcn-marker-label'

// Frankfurt tour stops with real coordinates
const tourMarkers = [
  {
    id: 1,
    name: 'Alter Oper',
    label: '01 · Alter Oper',
    lng: 8.671937457742056,
    lat: 50.11618325350693,
    color: '#71a1e6',
  },
  {
    id: 2,
    name: 'Dom-Römer-Quartier',
    label: '02 · Dom-Römer-Quartier',
    lng: 8.683766697881591,
    lat: 50.11146330962498,
    color: '#cab1fd',
  },
  {
    id: 3,
    name: 'Eisener Steg',
    label: '03 · Eisener Steg',
    lng: 8.682228259572982,
    lat: 50.10839549863814,
    color: '#eeb2ff',
  },
  {
    id: 4,
    name: 'Bethmann Park',
    label: '04 · Bethmann Park',
    lng: 8.691012477086138,
    lat: 50.11903834105573,
    color: '#4ade80',
  },
]

export function SiviTourMap() {
  return (
    <Map
      center={[8.6980, 50.1065]}
      zoom={13}
      theme="dark"
    >
      {tourMarkers.map((place) => (
        <MapMarker key={place.id} longitude={place.lng} latitude={place.lat}>
          <MarkerContent>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: `2px solid ${place.color}`,
                background: `${place.color}1a`,
                boxShadow: `0 0 16px ${place.color}55, 0 2px 8px rgba(0,0,0,0.4)`,
                cursor: 'pointer',
                transition: 'transform 0.18s ease, box-shadow 0.18s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.3)'
                e.currentTarget.style.boxShadow = `0 0 28px ${place.color}99, 0 4px 12px rgba(0,0,0,0.5)`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = `0 0 16px ${place.color}55, 0 2px 8px rgba(0,0,0,0.4)`
              }}
            >
              <MapPin size={14} color={place.color} strokeWidth={2.5} />
            </div>
            <MarkerLabel position="bottom">{place.label}</MarkerLabel>
          </MarkerContent>
          <MarkerTooltip>{place.name}</MarkerTooltip>
        </MapMarker>
      ))}
    </Map>
  )
}