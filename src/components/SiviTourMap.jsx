import { MapPin } from 'lucide-react'
import { Map, MapMarker, MarkerContent, MarkerLabel, MarkerTooltip } from '@/components/ui/mapcn-marker-label'

// Frankfurt tour stops with real coordinates
const tourMarkers = [
  {
    id: 1,
    name: 'Römerberg',
    label: '01 · Old Town',
    lng: 8.6826,
    lat: 50.1109,
    color: '#71a1e6',
  },
  {
    id: 2,
    name: 'Main Riverbank',
    label: '02 · Sachsenhausen',
    lng: 8.6840,
    lat: 50.1044,
    color: '#cab1fd',
  },
  {
    id: 3,
    name: 'Skyline Plaza',
    label: '03 · City Centre',
    lng: 8.6597,
    lat: 50.1042,
    color: '#eeb2ff',
  },
  {
    id: 4,
    name: 'ECB District',
    label: '04 · EU Quarter',
    lng: 8.7133,
    lat: 50.1107,
    color: '#4ade80',
  },
]

export function SiviTourMap() {
  return (
    <Map
      center={[8.6860, 50.1080]}
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
