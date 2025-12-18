import React, { useState } from "react";
import axiosInstance from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event, refreshEvents }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const isJoined = event.attendees.includes(userId);
  const isCreator =
    event.createdBy && event.createdBy._id.toString() === userId;

  const handleRSVP = async () => {
    setLoading(true);
    setError("");
    try {
      await axiosInstance.post(`/events/${event._id}/rsvp`);
      refreshEvents();
    } catch (err) {
      setError(err.response?.data?.message || "RSVP failed");
    } finally {
      setLoading(false);
    }
  };

  const handleUnRSVP = async () => {
    setLoading(true);
    setError("");
    try {
      await axiosInstance.post(`/events/${event._id}/unrsvp`);
      refreshEvents();
    } catch (err) {
      setError(err.response?.data?.message || "Cancel RSVP failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-event/${event._id}`, { state: { event } });
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    setLoading(true);
    setError("");
    try {
      await axiosInstance.delete(`/events/${event._id}`);
      refreshEvents();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition">
      {/* Title */}
      <div className="px-4 pt-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {event.title}
        </h2>
      </div>

      {/* Content */}
      <div className="px-4 py-3 text-sm text-gray-600 space-y-2">
        <p className="line-clamp-3">{event.description}</p>

        <div className="flex flex-col gap-1 text-gray-500">
          <span>📅 {new Date(event.date).toLocaleString()}</span>
          <span>📍 {event.location}</span>
          <span>
            👥 {event.attendeeCount}/{event.capacity} attending
          </span>
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex flex-wrap gap-2">
        {!isCreator && (
          isJoined ? (
            <button
              onClick={handleUnRSVP}
              disabled={loading}
              className="flex-1 border border-red-300 text-red-600 py-2 rounded-lg hover:bg-red-50 transition"
            >
              Cancel Join
            </button>
          ) : (
            <button
              onClick={handleRSVP}
              disabled={loading || event.attendeeCount >= event.capacity}
              className="flex-1 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition"
            >
              Join Event
            </button>
          )
        )}

        {isCreator && (
          <>
            <button
              onClick={handleEdit}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 border border-red-300 text-red-600 py-2 rounded-lg hover:bg-red-50 transition"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;
