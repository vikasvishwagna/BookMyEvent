import Event from "../models/Event.js";



export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, capacity, image } = req.body;

    // 1. Validate input
    if (!title || !description || !date || !location || !capacity) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // 2. Create event
    const event = await Event.create({
      title,
      description,
      date,
      location,
      capacity,
      image,
      createdBy: req.user._id,
      attendees: []
    });

    // 3. Send response
    res.status(201).json({
      message: "Event created successfully",
      event
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const { search, location, date } = req.query;

    const query = {};

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Filter by date (upcoming events)
    if (date) {
      query.date = { $gte: new Date(date) };
    }

    const events = await Event.find(query)
      .populate("createdBy", "name email")
      .sort({ date: 1 });

    const formattedEvents = events.map(event => ({
      ...event._doc,
      attendeeCount: event.attendees.length
    }));

    res.status(200).json(formattedEvents);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Ownership check
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to update this event" });
    }

    // Update fields
    const { title, description, date, location, capacity, image } = req.body;

    if (title) event.title = title;
    if (description) event.description = description;
    if (date) event.date = date;
    if (location) event.location = location;
    if (capacity) event.capacity = capacity;
    if (image) event.image = image;

    const updatedEvent = await event.save();

    res.status(200).json({
      message: "Event updated successfully",
      event: updatedEvent
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Ownership check
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this event" });
    }

    await event.deleteOne();

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const rsvpEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    const event = await Event.findOneAndUpdate(
      {
        _id: eventId,
        attendees: { $ne: userId },          // prevent duplicate RSVP
        $expr: { $lt: [{ $size: "$attendees" }, "$capacity"] } // capacity check
      },
      {
        $addToSet: { attendees: userId }     // atomic add
      },
      { new: true }
    );

    if (!event) {
      return res.status(400).json({
        message: "Event is full or you have already joined"
      });
    }

    res.status(200).json({
      message: "Successfully joined the event",
      attendeeCount: event.attendees.length
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const unrsvpEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    const event = await Event.findByIdAndUpdate(
      eventId,
      { $pull: { attendees: userId } },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "You have left the event",
      attendeeCount: event.attendees.length
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const userId = req.user._id;

    const events = await Event.find({ createdBy: userId })
      .sort({ date: 1 });

    const formattedEvents = events.map(event => ({
      ...event._doc,
      attendeeCount: event.attendees.length
    }));

    res.status(200).json(formattedEvents);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getJoinedEvents = async (req, res) => {
  try {
    const userId = req.user._id;

    const events = await Event.find({ attendees: userId })
      .populate("createdBy", "name email")
      .sort({ date: 1 });

    const formattedEvents = events.map(event => ({
      ...event._doc,
      attendeeCount: event.attendees.length
    }));

    res.status(200).json(formattedEvents);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
