import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as groupActions  from '../../store/groups';
import * as eventActions  from '../../store/events';
import './index.css'

export default function GroupEventsToggle() {
  const dispatch = useDispatch();

  const groups = useSelector((state) => state.group.groups);

  const events = useSelector((state) => state.event.events);

  const handleGroups = () => {
    dispatch(groupActions.loadGroups());
  };
useSelector(state => console.log(state.groupEvents))
  const handleEvents = () => {
    dispatch(eventActions.loadEvents());

  };

  useEffect(() => {
    if (window.location.pathname === '/groups')  {
      console.log("DISPATCHING GROUPS")
      dispatch(groupActions.loadGroups())
    }
    if (window.location.pathname === '/events')   {
      console.log("DISPATCHING EVENTS")
      dispatch(eventActions.loadEvents())
    }
  },[dispatch])


  return (
    <>
      <div>
        <NavLink to="/events" onClick={handleEvents}>
          Events
        </NavLink>
        <NavLink to="/groups" onClick={handleGroups}>
          Groups
        </NavLink>
      </div>

      {events && window.location.pathname === '/events' && Object.values(events).map((event) => (
        <NavLink key={event.id} to={`/events/${event.id}`}>
          <div>
            <h1>{event.name}</h1>
            {event.Venue && <p>{event.Venue.city + ',' + event.Venue.state}</p>}
            <p>{event.about}</p>
            <p>{event.previewImage}</p>
          </div>
        </NavLink>
      ))}

      {groups && window.location.pathname === '/groups' && Object.values(groups).map((group) => (
        <NavLink key={group.id} to={`/groups/${group.id}`}>
          <div>
            <img src={group.previewImage} alt='group-rview-image'></img>
            <h1>{group.name}</h1>
            <p>{group.city + ',' + group.state}</p>
            <p>{group.about}</p>
          </div>
        </NavLink>
      ))}

    </>
  );
}
