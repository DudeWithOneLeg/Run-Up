import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as groupActions from '../../store/groups';
import * as eventActions from '../../store/events';
import './index.css'

export default function GroupEventsToggle() {
  const dispatch = useDispatch();

  const groups = useSelector((state) => state.group.groups);



  const handleGroups = () => {
    dispatch(groupActions.loadGroups());
  };
  useSelector(state => console.log(state.groupEvents))
  const handleEvents = () => {
    dispatch(eventActions.loadEvents());

  };
  const events = useSelector((state) => state.event.events);
  useEffect(() => {
    if (window.location.pathname === '/groups') {
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



  const path = window.location.pathname



  return (
    <div id='module'>
      <div id='toggle'>
        <NavLink className={path === '/events' ? 'toggle-active' : 'toggle'} to="/events" onClick={handleEvents}>
          Events
        </NavLink>
        <NavLink className={path === '/groups' ? 'toggle-active' : 'toggle'} to="/groups" onClick={handleGroups}>
          Groups
        </NavLink>
      </div>
      <div id='list'>
        {events && window.location.pathname === '/events' && Object.values(events).map((event) => (
          <NavLink key={event.id} to={`/events/${event.id}`}>
            <div className='card-container'>
              <div className='card'>
                <img src={event.previewImage} alt='event-preview'></img>
                <div className='info-card'>
                  <p>YYYY-MM-DD · time</p>
                  <h1 className='name'>{event.name}</h1>
                  {event.Venue && <p className='gray-text'>{event.Venue.city + ',' + event.Venue.state}</p>}
                  <p>{sliceAbout(event.description)}</p>
                </div>

              </div>
            </div>
          </NavLink>
        ))}

        {groups && window.location.pathname === '/groups' && Object.values(groups).map((group) => (
          <NavLink key={group.id} to={`/groups/${group.id}`}>
            <div className='card-container'>
              <div className='card'>
                <img src={group.previewImage} alt='group-preview-image' ></img>
                <div className='info-card'>
                  <h1 className='name'>{group.name}</h1>
                  <p className='gray-text'>{group.city + ',' + group.state}</p>
                  <p>{sliceAbout(group.about)}</p>
                  <p className='gray-text'># events, public or private</p>
                </div>
              </div>
            </div>
          </NavLink>
        ))}
      </div>



    </div>
  );
}
