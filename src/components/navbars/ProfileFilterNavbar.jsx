import { profileFilterNav } from "../../constants"

export default function ProfileFilterNavbar({active, setActive}) {

  const handleClick = (key)=> {
    setActive(key)
  }

  return (
    <nav className="sm:flex-between flex-evenly sm:max-w-[500px] w-full py-2">
      {profileFilterNav.map(navItem=>(
        <button
          key={navItem.label}
          className={`
            px-4 py-2 transition border-b-4
            hover:opacity-80 text-medium
            ${navItem.label === active ? 'border-black dark:border-white':'border-transparent'}
          `}
          onClick={()=>handleClick(navItem.label)}
        >
          {navItem.label}
        </button>
      ))}
    </nav>
  )
}
