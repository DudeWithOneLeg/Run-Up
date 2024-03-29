import { NavLink, useParams, Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as groupActions from '../../store/groups';
import * as eventActions from '../../store/events';
import './index.css'

export default function GroupEventsToggle() {
  const params = useParams()
  const dispatch = useDispatch();
  const history = useHistory()
  const [search, setSearch] = useState('')

  let groups = useSelector((state) => state.group.groups);

  const path = window.location.pathname

  const handleGroups = () => {
    dispatch(groupActions.loadGroups());
  };
  const handleEvents = () => {
    dispatch(eventActions.loadEvents());

  };
  const events = useSelector((state) => state.event.events);
  useEffect(() => {
    if (path.startsWith('/groups')) {
      dispatch(groupActions.loadGroups())
    }
    if (path.startsWith('/events')) {
      dispatch(eventActions.loadEvents())
    }
  }, [dispatch])

  const sliceAbout = (about) => {
    if (!about) {
      return
    }
    const slice = about.split('').slice(0, 150).join('')
    return slice + '...'
  }

  let currentGroups = []

  const paginateGroups = (res, page, size) => {
    let arr = []
    for (let i = 0; i < res.length - 1; i += size) {
      const slice = res.slice(i, i + size)
      arr.push(slice)
    }
    currentGroups = arr[page - 1]
    return (
      <div id='pages'>
        {page > 1 && <Link className='notActive' to={`/groups/${page - 1}/${size}`}>&lt;</Link>}

        {
          arr.map((data) => {
            return (
              <Link className={page == arr.indexOf(data) + 1 ? 'activePage' : 'notActive'} to={`/groups/${arr.indexOf(data) + 1}/${size}`}>{arr.indexOf(data) + 1}</Link>
            )
          })
        }
        {page < arr.length && <Link className='notActive' to={`/groups/${page + 1}/${size}`}>&gt;</Link>}

        <p className='results'>Results:</p>

        <select
          id='size-select'
          onChange={(e) => {
            history.push(`/groups/1/${e.target.value}`)
          }}
        >
          <option
            selected={10 == params.size}
          >10</option>
          <option
            selected={15 == params.size}
          >15</option>
          <option
            selected={20 == params.size}
          >20</option>
          <option
            selected={25 == params.size}
          >25</option>
          <option
            selected={30 == params.size}
          >30</option>
          <option
            selected={35 == params.size}
          >35</option>
          <option
            selected={40 == params.size}
          >40</option>
          <option
            selected={45 == params.size}
          >45</option>
          <option
            selected={50 == params.size}
          >50</option>
        </select>

      </div>
    )

  }

  let currentEvents = []

  const paginateEvents = (res, page, size) => {
    let arr = []
    for (let i = 0; i < res.length - 1; i += size) {
      const slice = res.slice(i, i + size)
      arr.push(slice)
    }
    currentEvents = arr[page - 1]
    return (
      <div id='pages'>
        {page > 1 && <Link className='notActive' to={`/events/${page - 1}/${size}`}>&lt;</Link>}

        {
          arr.map((data) => {
            return (
              <Link className={page == arr.indexOf(data) + 1 ? 'activePage' : 'notActive'} to={`/events/${arr.indexOf(data) + 1}/${size}`}>{arr.indexOf(data) + 1}</Link>
            )
          })
        }
        {page < arr.length && <Link className='notActive' to={`/events/${page + 1}/${size}`}>&gt;</Link>}

        <p className='results'>Results:</p>

        <select
          id='size-select'
          onChange={(e) => {
            history.push(`/events/1/${e.target.value}`)
          }}
        >
          <option
            selected={10 == params.size}
          >10</option>
          <option
            selected={15 == params.size}
          >15</option>
          <option
            selected={20 == params.size}
          >20</option>
          <option
            selected={25 == params.size}
          >25</option>
          <option
            selected={30 == params.size}
          >30</option>
          <option
            selected={35 == params.size}
          >35</option>
          <option
            selected={40 == params.size}
          >40</option>
          <option
            selected={45 == params.size}
          >45</option>
          <option
            selected={50 == params.size}
          >50</option>
        </select>

      </div>
    )

  }

  // const search = (data) => {

  // }


  return (
    <div id='module'>
      <div id='toggle'>
        <NavLink className={path.startsWith('/events') ? 'toggle-active' : 'toggle'} to="/events/1/10" onClick={handleEvents}>
          Events
        </NavLink>
        <NavLink className={path.startsWith('/groups') ? 'toggle-active' : 'toggle'} to="/groups/1/10" onClick={handleGroups}>
          Groups
        </NavLink>

      </div>
      <div className='toggle-subhead'>
        {path.startsWith('/groups') && <p >Groups in Run Up</p>}
        {path.startsWith('/events') && <p >Events in Run Up</p>}
      </div>
      <div id='list'>
        {/* <input
        defaultValue='Search name, location, description'
        onChange={(e) => {
          setSearch(e.target.value)
          const data = events ? events : groups
          const results = Object.values(data).filter((result) => {
            console.log(result)
            const text = result.name.split(' ').concat(result.location.split(' ')).concat(events ? result.description.split(' ') : result.about.split(' '))
            text.contains(search)
          })
          events ? currentEvents = results : currentGroups = results
        }}
        /> */}
        {events && path.startsWith('/events') && paginateEvents(Object.values(events), Number(params.page), Number(params.size))}

        {events && path.startsWith('/events') && currentEvents.map((event) => {

          event.startDate = event.startDate.split('T').join(' · ').split(':00.000Z').join('')

          let hour = event.startDate.split(' · ')[1].split(':')[0]

          if (hour > 12 && !event.startDate.includes('PM') && !event.startDate.includes('AM')) {

            const oldHour = hour
            hour -= 12
            event.startDate = event.startDate.replace(oldHour, hour)
            event.startDate += ' PM'
          }
          else if (hour < 12 && !event.startDate.includes('AM') && !event.startDate.includes('PM')) {

            event.startDate += ' AM'
          }



          return (
            <NavLink className='navlink' key={event.id} to={`/events/${event.id}`}>
              <div className='card-container'>
                <div className='card'>
                  <img src={event.previewImage} alt='event-preview'></img>
                  <div className='info-card'>
                    <p id='info-about' className='group-about-text'>{event.startDate}</p>
                    <h1 id='info-name' className='name group-about-text'>{event.name}</h1>
                    {event.Venue && <p id='info-location' className='gray-text group-about-text'>{event.Venue.city + ',' + event.Venue.state}</p>}

                  </div>

                </div>
                <p>{sliceAbout(event.description)}</p>
              </div>
            </NavLink>
          )
        }

        )}
        {events && path.startsWith('/events') && paginateEvents(Object.values(events), Number(params.page), Number(params.size))}
        {groups && path.startsWith('/groups') && paginateGroups(Object.values(groups), Number(params.page), Number(params.size))}

        {groups && path.startsWith('/groups') && currentGroups.map((group) => (

          <NavLink className='navlink' key={group.id} to={`/groups/${group.id}`}>
            <div className='card-container'>
              <div className='card'>
                <img src={group.previewImage} alt='group-preview-image' ></img>
                <div className='info-card'>
                  <div>
                    <h1 className='name'>{group.name}</h1>
                  </div>
                  <div>
                    <p className='gray-text group-about-text'>{group.city + ',' + group.state}</p>
                  </div>
                  <div>
                    <p className='group-about-text'>{sliceAbout(group.about)}</p>
                  </div>



                  {

                    group.private ? <div><p className='gray-text group-about-text'>{group.numEvents} Events · Private</p></div> : <div><p className='gray-text group-about-text'>{group.numEvents} Events · Public</p></div>
                  }
                </div>
              </div>
            </div>
          </NavLink>
        ))}
        {groups && path.startsWith('/groups') && paginateGroups(Object.values(groups), Number(params.page), Number(params.size))}
      </div>



    </div>
  );
}
