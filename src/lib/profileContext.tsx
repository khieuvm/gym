import { createContext, useContext, type ReactNode } from 'react'
import { useStoredState } from './storage'
import { DEFAULT_PROFILE, type Profile } from './nutrition'

type Ctx = {
  profile: Profile
  setProfile: (updater: Profile | ((p: Profile) => Profile)) => void
  resetProfile: () => void
}

const ProfileContext = createContext<Ctx | null>(null)

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile, resetProfile] = useStoredState<Profile>('profile', DEFAULT_PROFILE)
  return (
    <ProfileContext.Provider value={{ profile, setProfile, resetProfile }}>{children}</ProfileContext.Provider>
  )
}

export function useProfile() {
  const ctx = useContext(ProfileContext)
  if (!ctx) throw new Error('useProfile phải nằm trong ProfileProvider')
  return ctx
}
