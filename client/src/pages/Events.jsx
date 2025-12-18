import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const navigate = useNavigate();

  const fetchEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axiosInstance.get("/events");
      setEvents(res.data);
      setFilteredEvents(res.data);
    } catch (err) {
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    let updatedEvents = [...events];

    if (searchTerm) {
      updatedEvents = updatedEvents.filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterDate) {
      updatedEvents = updatedEvents.filter(
        (event) =>
          new Date(event.date).toDateString() ===
          new Date(filterDate).toDateString()
      );
    }

    setFilteredEvents(updatedEvents);
  }, [searchTerm, filterDate, events]);

  if (loading) return <p className="text-center mt-10">Loading events...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Search & Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-8 flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search events..."
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          type="date"
          className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />

        <button
          onClick={() => {
            setSearchTerm("");
            setFilterDate("");
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Reset
        </button>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-center">No events match your criteria</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              refreshEvents={fetchEvents}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
