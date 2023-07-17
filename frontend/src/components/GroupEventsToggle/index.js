import { NavLink, useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as groupActions from '../../store/groups';
import * as eventActions from '../../store/events';
import './index.css'

export default function GroupEventsToggle() {
  const params = useParams()
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(params.page)

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
      console.log("DISPATCHING GROUPS")
      dispatch(groupActions.loadGroups())
    }
    if (window.location.pathname === '/events') {
      console.log("DISPATCHING EVENTS")
      dispatch(eventActions.loadEvents())
    }
  }, [dispatch])

  const sliceAbout = (about) => {
    if (!about) {
      return
    }
    const slice = about.split('').slice(0, 150).join('')
    console.log(slice.length)
    return slice + '...'
  }

  let currentGroups = []

  const paginate = (res, page, size) => {
    console.log('length', res.length)
    let arr =[]
    for (let i = 0; i < res.length - 1; i += size) {
      const slice = res.slice(i, i + size)
      console.log('THIS:', i)
      arr.push(slice)
    }
    currentGroups = arr[page - 1]
    return (
      <div id='pages'>
        {page > 1 && <Link className='notActive' to={`/groups/${page - 1}/10`}>&lt;</Link>}

        {
          arr.map((data) => {
            return (
              <Link className={page == arr.indexOf(data) + 1 ? 'activePage' : 'notActive'} to={`/groups/${arr.indexOf(data) + 1}/10`}>{arr.indexOf(data) + 1}</Link>
            )
          })
        }
        {page < arr.length && <Link className='notActive' to={`/groups/${page + 1}/10`}>&gt;</Link>}

      </div>
    )

  }

  // if (groups) {
  //   console.log(paginate(groups, params.page, params.size))
  // }







  return (
    <div id='module'>
      <div id='toggle'>
        <NavLink className={path === '/events' ? 'toggle-active' : 'toggle'} to="/events" onClick={handleEvents}>
          Events
        </NavLink>
        <NavLink className={path.startsWith('/groups') ? 'toggle-active' : 'toggle'} to="/groups/1/10" onClick={handleGroups}>
          Groups
        </NavLink>

      </div>
      <div className='toggle-subhead'>
        {path.startsWith('/groups') && <p >Groups in Run Up</p>}
        {path === '/events' && <p className='toggle-subhead'>Events in Run Up</p>}
      </div>
      <div id='list'>
        {events && window.location.pathname === '/events' && Object.values(events).map((event) => {
          event.startDate = event.startDate.split('T').join(' · ')
          event.endDate = event.endDate.split('T').join(' · ')

          return (
            <NavLink className='navlink' key={event.id} to={`/events/${event.id}`}>
              <div className='card-container'>
                <div className='card'>
                  <img src={event.previewImage} alt='event-preview'></img>
                  <div className='info-card'>
                    <p className='group-about-text'>{event.startDate}</p>
                    <h1 className='name group-about-text'>{event.name}</h1>
                    {event.Venue && <p className='gray-text group-about-text'>{event.Venue.city + ',' + event.Venue.state}</p>}

                  </div>

                </div>
                <p>{sliceAbout(event.description)}</p>
              </div>
            </NavLink>
          )
        }

        )}
        {groups && paginate(Object.values(groups), Number(params.page), Number(params.size))}

        {groups && path.startsWith('/groups') && currentGroups.map((group) => (

          <NavLink className='navlink' key={group.id} to={`/groups/${group.id}`}>
            <div className='card-container'>
              <div className='card'>
                <img src={group.previewImage} alt='group-preview-image' ></img>
                <div className='info-card'>
                  <h1 className='name'>{group.name}</h1>
                  <p className='gray-text group-about-text'>{group.city + ',' + group.state}</p>
                  <p className='group-about-text'>{sliceAbout(group.about)}</p>
                  {
                    group.private ? <p className='gray-text group-about-text'># events, Private</p> : <p className='gray-text group-about-text'># events, Public</p>
                  }
                </div>
              </div>
            </div>
          </NavLink>
        ))}
        {groups && paginate(Object.values(groups), Number(params.page), Number(params.size))}
      </div>



    </div>
  );
}
