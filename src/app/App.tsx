import { useState } from 'react'
import { ProfileProvider } from '../lib/ProfileContext'
import { CommunitiesProvider } from '../lib/CommunitiesContext'

import { SocialHub } from './components/SocialHub'
import { EventsPage } from './components/EventsPage'
import { EventDetailPage } from './components/EventDetailPage'

import type { EventWithMeta } from '../lib/useEvents'

type Page =
  | 'home'
  | 'social-hub'
  | 'events'
  | 'event-detail'

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null)

  // ============================
  // NAVEGAÇÃO
  // ============================

  const navigateToEvents = () => {
    setCurrentPage('events')
  }

  const navigateToEventDetail = (event: EventWithMeta) => {
    setSelectedEventId(event.id)
    setCurrentPage('event-detail')
  }

  const navigateHome = () => {
    setCurrentPage('home')
  }

  const navigateToSocialHub = () => {
    setCurrentPage('social-hub')
  }

  return (
    <ProfileProvider>
      <CommunitiesProvider>

        {/* HOME */}
        {currentPage === 'home' && (
          <div className="min-h-screen flex items-center justify-center bg-white">
            <button
              onClick={navigateToSocialHub}
              className="px-6 py-3 bg-black text-white rounded-lg"
            >
              Entrar
            </button>
          </div>
        )}

        {/* SOCIAL HUB */}
        {currentPage === 'social-hub' && (
          <SocialHub
            onNavigateToProfile={() => {}}
            onNavigateToCommunities={() => {}}
            onNavigateToFeed={() => setCurrentPage('social-hub')}
            onNavigateToUserProfile={(userId) => {
              console.log('Perfil usuário:', userId)
            }}
          />
        )}

        {/* EVENTS */}
        {currentPage === 'events' && (
          <EventsPage
            onBack={() => setCurrentPage('social-hub')}
            onSelectEvent={navigateToEventDetail}
          />
        )}

        {/* EVENT DETAIL */}
        {currentPage === 'event-detail' && selectedEventId && (
          <EventDetailPage
            eventId={selectedEventId}
            onBack={navigateToEvents}
            onNavigateToProfile={(userId) => {
              console.log('Perfil usuário:', userId)
            }}
          />
        )}

      </CommunitiesProvider>
    </ProfileProvider>
  )
}