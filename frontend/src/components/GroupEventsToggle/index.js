import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as groupEventsActions  from '../../store/groupEvents';

export default function GroupEventsToggle() {
  const dispatch = useDispatch();

  const groups = useSelector((state) => state.groupEvents.groups);

  const events = useSelector((state) => state.groupEvents.events);

  const handleGroups = () => {
    dispatch(groupEventsActions.loadGroups());
  };
useSelector(state => console.log(state.groupEvents))
  const handleEvents = () => {
    dispatch(groupEventsActions.loadEvents());

  };

  useEffect(() => {
    if (window.location.pathname === '/groups')  {
      console.log("DISPATCHING GROUPS")
      dispatch(groupEventsActions.loadGroups())
    }
    if (window.location.pathname === '/events')   {
      console.log("DISPATCHING EVENTS")
      dispatch(groupEventsActions.loadEvents())
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
      {events && window.location.pathname === '/events' && events.map((event) => (
        <NavLink key={event.id} to={`/events/${event.id}`}>
          <div>
            <h1>{event.name}</h1>
            <p>{event.city + ',' + event.state}</p>
            <p>{event.about}</p>
            <p>{event.previewImage}</p>
          </div>
        </NavLink>
      ))}
      {groups && window.location.pathname === '/groups' && groups.map((group) => (
        <NavLink key={group.id} to={`/groups/${group.id}`}>
          <div>
            <h1>{group.name}</h1>
            <p>{group.city + ',' + group.state}</p>
            <p>{group.about}</p>
            <p>{group.previewImage}</p>
          </div>
        </NavLink>
      ))}
    </>
  );
}
