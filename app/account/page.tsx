'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { brands as availableBrands } from '@/lib/data/all-products'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  ShoppingBag, 
  Settings, 
  LogOut,
  ChevronRight,
  Edit2,
  Plus,
  Trash2
} from 'lucide-react'

interface Address {
  _id?: string
  label: string
  firstName: string
  lastName: string
  address1: string
  address2?: string
  city: string
  state: string
  zipCode: string
  country: string
  phone?: string
  isDefault: boolean
}

export default function AccountPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'notifications'>('profile')
  const [userData, setUserData] = useState<any>(null)
  
  // Form states
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  })
  
  // Notification form
  const [subEmail, setSubEmail] = useState('')
  const [brand, setBrand] = useState(availableBrands?.[0] || '')
  const [productSlug, setProductSlug] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/account')
    } else if (status === 'authenticated') {
      fetchUserData()
    }
  }, [status, router])

  const fetchUserData = async () => {
    try {
      const res = await fetch('/api/auth/profile')
      const data = await res.json()
      if (data.success) {
        setUserData(data.user)
        setEditForm({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          phone: data.user.phone || '',
        })
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      })

      const data = await res.json()

      if (data.success) {
        setUserData({ ...userData, ...editForm })
        setIsEditing(false)
        toast.success('Profile updated successfully')
      } else {
        toast.error(data.error || 'Failed to update profile')
      }
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
    toast.success('Signed out successfully')
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    const notifyEmail = subEmail || userData?.email
    if (!notifyEmail) return toast.error('Please provide an email to receive notifications')

    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: notifyEmail, brand, productSlug: productSlug || null }),
      })

      const data = await res.json()

      if (data.success || !res.ok) {
        toast.success('Subscribed for stock notifications')
        setSubEmail('')
        setProductSlug('')
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast.error('Failed to subscribe')
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm sticky top-24">
                {/* User Info */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-accent to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <User size={32} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-black">
                    {session.user?.firstName} {session.user?.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{session.user?.email}</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                      activeTab === 'profile' 
                        ? 'bg-accent/10 text-accent' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <User size={18} />
                    <span className="text-sm font-medium">Profile</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('addresses')}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                      activeTab === 'addresses' 
                        ? 'bg-accent/10 text-accent' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <MapPin size={18} />
                    <span className="text-sm font-medium">Addresses</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('notifications')}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                      activeTab === 'notifications' 
                        ? 'bg-accent/10 text-accent' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <BellIcon size={18} />
                    <span className="text-sm font-medium">Notifications</span>
                  </button>
                </nav>

                <hr className="my-4" />

                {/* Quick Links */}
                <div className="space-y-1">
                  <Link href="/cart" className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <ShoppingBag size={18} />
                    <span className="text-sm font-medium">My Cart</span>
                  </Link>
                  <Link href="/wishlist" className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                    <Heart size={18} />
                    <span className="text-sm font-medium">Wishlist</span>
                  </Link>
                </div>

                <hr className="my-4" />

                {/* Sign Out */}
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-black">Profile Information</h2>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 text-sm text-accent hover:underline"
                      >
                        <Edit2 size={16} /> Edit
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={editForm.firstName}
                            onChange={(e) => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                            className="input-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={editForm.lastName}
                            onChange={(e) => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                            className="input-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="input-primary"
                          placeholder="+254 700 000 000"
                        />
                      </div>
                      <div className="flex gap-3">
                        <button type="submit" disabled={isLoading} className="btn-primary">
                          {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false)
                            setEditForm({
                              firstName: userData?.firstName || '',
                              lastName: userData?.lastName || '',
                              phone: userData?.phone || '',
                            })
                          }}
                          className="btn-outline"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-gray-500">First Name</p>
                          <p className="font-medium text-black">{userData?.firstName || session.user?.firstName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Last Name</p>
                          <p className="font-medium text-black">{userData?.lastName || session.user?.lastName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-black flex items-center gap-2">
                            <Mail size={14} className="text-gray-400" />
                            {session.user?.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium text-black flex items-center gap-2">
                            <Phone size={14} className="text-gray-400" />
                            {userData?.phone || 'Not provided'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-black">My Addresses</h2>
                    <button className="flex items-center gap-2 btn-primary text-sm">
                      <Plus size={16} /> Add Address
                    </button>
                  </div>

                  {userData?.addresses && userData.addresses.length > 0 ? (
                    <div className="space-y-4">
                      {userData.addresses.map((address: any, index: number) => (
                        <div key={address._id || index} className="border border-gray-200 rounded-lg p-4 hover:border-accent transition-colors">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-black">{address.label}</span>
                                {address.isDefault && (
                                  <span className="text-xs bg-accent text-white px-2 py-0.5 rounded">Default</span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                {address.firstName} {address.lastName}
                              </p>
                              <p className="text-sm text-gray-600">
                                {address.address1}
                              </p>
                              {address.address2 && (
                                <p className="text-sm text-gray-600">{address.address2}</p>
                              )}
                              <p className="text-sm text-gray-600">
                                {address.city}, {address.state} {address.zipCode}
                              </p>
                              <p className="text-sm text-gray-600">{address.country}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-gray-400 hover:text-accent transition-colors">
                                <Edit2 size={16} />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">No addresses saved yet</p>
                      <button className="mt-4 btn-primary">
                        <Plus size={16} className="mr-2" /> Add Your First Address
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-black mb-6">Stock Notifications</h2>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-2">Subscribe for New Stock</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Enter your email and choose a brand to be notified when new stock arrives.
                    </p>
                    <form onSubmit={handleSubscribe} className="space-y-4 max-w-md">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email to notify
                        </label>
                        <input
                          type="email"
                          value={subEmail}
                          onChange={(e) => setSubEmail(e.target.value)}
                          placeholder={session.user?.email || 'your@email.com'}
                          className="input-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Brand
                        </label>
                        <select
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                          className="input-primary"
                        >
                          {availableBrands.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Specific product slug (optional)
                        </label>
                        <input
                          type="text"
                          value={productSlug}
                          onChange={(e) => setProductSlug(e.target.value)}
                          placeholder="e.g. air-force-1-low-aztec"
                          className="input-primary"
                        />
                      </div>

                      <button type="submit" className="btn-primary">
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BellIcon({ size }: { size: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

