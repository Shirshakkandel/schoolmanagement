import { useState, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import IconManager from '../common/icon-manager'
import companyLogo from '../../assets/images/logo.jpg'

export default function NavigationBar({
  width,
  handleToggleIconClick,
  toggled,
}) {
  const history = useHistory()
  const profileDropdownItems = [
    {
      icon: 'Profile',
      title: 'Profile',
      link: '/profile',
    },
    {
      icon: 'Settings',
      title: 'Settings',
      link: '/settings',
    },
    {
      icon: 'Help',
      title: 'Help',
      link: '/help',
    },
    {
      icon: 'Logout',
      title: 'Logout',
      link: '/logout',
    },
  ]

  const profileDropdown = useRef()
  const [showProfile, setShowProfile] = useState(false)

  return (
    <div className="h-16 shadow-lg flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 w-full bg-white">
      <div className="flex items-center space-x-12">
        <div className="flex items-center space-x-2">
          <Link to="/" className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={companyLogo}
              alt=""
              className="w-full h-full object-cover object-center"
            />
          </Link>
          <Link to="/" className="text-lg font-semibold text-primary">
            Company Name
          </Link>
        </div>
        {width > 1023 && (
          <div>
            <MenuIcon onClick={handleToggleIconClick} />
          </div>
        )}
      </div>
      {toggled && width < 1024 && (
        <div
          className="fixed w-full h-screen left-0 top-0 bg-black opacity-50 z-10"
          onClick={handleToggleIconClick}
        ></div>
      )}
      <div className="flex items-center space-x-5">
        <div>
          <IconManager icon="Notification" />
        </div>
        <button
          className="relative cursor-default flex"
          onBlur={() => setShowProfile(false)}
        >
          <IconManager
            icon="Profile"
            onClick={() => setShowProfile(!showProfile)}
          />
          {showProfile && (
            <div
              className="absolute bg-white right-0 top-11 py-2 w-40 rounded"
              style={{ boxShadow: '0px 0px 10px gray' }}
              ref={profileDropdown}
            >
              {profileDropdownItems.map((item, index) => {
                const { icon, title, link } = item
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setShowProfile(false)
                      history.push(link)
                    }}
                    className="flex items-center space-x-2 px-6 py-1 hover:bg-gray-200 cursor-pointer"
                  >
                    <div>
                      <IconManager icon={icon} style={{ fontSize: '20px' }} />
                    </div>
                    <div>{title}</div>
                  </div>
                )
              })}
            </div>
          )}
        </button>
        {width < 1024 && (
          <div>
            <MenuIcon onClick={handleToggleIconClick} />
          </div>
        )}
      </div>
    </div>
  )
}
