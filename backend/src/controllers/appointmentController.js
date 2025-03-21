// updateAppointment
import {
  fetchWorkSchedule,
  fetchAppointment,
  createAppointmentTransaction,
  fetchAppointmentById,
  deleteAppointmentById,
  fetchAppointmentByDate,
  fetchUserAppointments,
} from "../Repositories/appointmentRepository.js";
import { fetchDoctor, fetchDoctorDegree } from "../Repositories/doctorRepository.js";
import { fetchUser, findUserById } from "../Repositories/userRepository.js";

export const fetchAvailableAppointments = async (req, res) => {
  try {
    const { id: doctorId } = req.params;
    let { date } = req.body;
    const doctorSchedule = await fetchWorkSchedule(doctorId);

    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    date = new Date(date);
    const now = new Date();

    if (date <= now) {
      return res.status(400).json({ message: "Wizyta nie moze byc umowiona na przeszla date lub godzine!" });
    }

    const day = date.getDay();
    const dayOfMonth = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const searchHour = date.getHours();
    const searchMinutes = date.getMinutes();

    const selectedDaySchedule = doctorSchedule.find((schedule) => schedule.work_day === daysOfWeek[day]);
    if (selectedDaySchedule === undefined) return res.status(404).json({ message: "Wybrany specjalista nie pracuje w wybranym dniu" });

    const { start_time, end_time, appointment_interval } = selectedDaySchedule;
    const schedule = await generateWorkSchedule(
      doctorId,
      searchMinutes,
      searchHour,
      dayOfMonth,
      month,
      year,
      start_time,
      end_time,
      appointment_interval
    );
    // console.log(selectedDaySchedule);
    if (schedule.length === 0) {
      return res.status(200).json({ message: "W wybrany dzien o wybranej godzinie badz pozniej nie ma wolnych wizyt!" });
    }
    return res.status(200).json({ availableAppointments: schedule });
  } catch (error) {
    console.log("Error fetching doctor's schedule", error.message);
    return res.status(500).json({ message: "Blad podczas pobierania grafiku doktora" });
  }
};

export const fetchBookedAppointments = async (req, res) => {
  try {
    const { id: doctorId } = req.params;
    const { startDate, endDate } = req.body;

    const doctor = await fetchDoctor(doctorId);
    if (Object.keys(doctor).length === 0 && doctor.constructor === Object)
      return res.status(404).json({ message: "Nie znaleziono wybranego specjalisty!" });
    // console.log(startDate, endDate);
    // let date = new Date("Wed Oct 09 2024 08:16:54");
    // let date1 = "2024-10-09 08:00:00";
    // let date2 = "2024-10-09 15:29:53";
    // let date3 = "2024-12-09 14:30:00";

    const appointments = await Promise.all(
      (
        await fetchAppointment(doctorId, startDate, endDate)
      ).map(async (appointment) => {
        const doctor = await fetchDoctor(doctorId);
        const user = await fetchUser(appointment.user_id);
        const allDegrees = await fetchDoctorDegree();
        const { day, month, year, hour, minutes } = getFormattedDate(appointment.appointment_time);

        return {
          id: appointment.id,
          doctor: {
            value: doctor.id,
            label: allDegrees.find((degree) => degree.id === doctor.degree_id).value + " " + doctor.name + " " + doctor.surname,
          },
          user: { value: user.id, label: user.name + " " + user.surname },
          appointmentTime: `${year}-${month}-${day} ${hour}:${minutes}`,
        };
      })
    );
    // console.log(appointments);
    if (appointments.length === 0) {
      return res.status(200).json({ message: "W wybrany dzien nie ma umowionych wizyt" });
    }
    return res.status(200).json({ appointments: appointments });
  } catch (error) {
    console.log("Error fetching booked appointments", error.message);
    return res.status(500).json({ message: "Blad podczas pobierania umowionych wizyt" });
  }
};

export const getAppointment = async (req, res) => {
  const { id: appointmentId } = req.params;
  const allDegrees = await fetchDoctorDegree();
  try {
    const appointment = await Promise.all(
      (
        await fetchAppointmentById(appointmentId)
      ).map(async (appointment) => {
        const doctor = await fetchDoctor(appointment.doctor_id);
        const user = await fetchUser(appointment.user_id);
        const { day, month, year, hour, minutes } = getFormattedDate(appointment.appointment_time);

        return {
          id: appointment.id,
          doctor: {
            value: doctor.id,
            label: allDegrees.find((degree) => degree.id === doctor.degree_id).value + " " + doctor.name + " " + doctor.surname,
          },
          user: { value: user.id, label: user.name + " " + user.surname },
          appointmentTime: `${year}-${month}-${day} ${hour}:${minutes}`,
        };
      })
    );
    // console.log(appointment);
    if (appointment.length === 0) return res.status(404).json({ message: "Wizyta z podanym id nie istnieje" });
    return res.status(200).json({ appointment: appointment });
  } catch (error) {
    console.log("Error fetching appointment by id");
    return res.status(500).json({ message: "Blad podczas pobierania wizyty po id" });
  }
};

export const getUserAppointments = async (req, res) => {
  const { id: userId } = req.params;
  try {
    const user = await findUserById(userId);
    if (!user || user.role === "doctor" || user.role === "admin") {
      return res.status(404).json({ message: "Nie wprowadzono poprawnego uzytkownika" });
    }

    const currentDate = new Date();

    const pastAppointments = await fetchUserAppointments(currentDate, userId, "past");
    const upcomingAppointments = await fetchUserAppointments(currentDate, userId, "future");

    const formatAppointments = (appointments) => {
      return appointments.map((appointment) => {
        const { day, month, year, hour, minutes } = getFormattedDate(appointment.appointment_time);
        return {
          id: appointment.appointment_id,
          doctor: {
            id: appointment.doctor_user_id,
            degree: appointment.doctor_degree,
            name: appointment.doctor_name,
            surname: appointment.doctor_surname,
            pwz: appointment.doctor_pwz,
          },
          user: {
            id: appointment.user_id,
            name: appointment.user_name,
            surname: appointment.user_surname,
          },
          appointment_time: `${year}-${month}-${day} ${hour}:${minutes}`,
        };
      });
    };
    return res.status(200).json({
      upcomingAppointments: formatAppointments(upcomingAppointments),
      pastAppointments: formatAppointments(pastAppointments),
    });
  } catch (error) {
    console.error("Error selecting user appointments", error.message);
    return res.status(500).json({ message: "Blad podczas pobierania wizyt uzytkownika" });
  }
};

export const createNewAppointment = async (req, res) => {
  const { doctorId, userId, appointmentTime } = req.body;
  // const {doctorId, userId, appointmentTime} = req.body
  // const doctorId = 2,
  //   userId = 1,
  //   appointmentTime = "2024-10-09 10:00:00";
  try {
    const appointment = await fetchAppointmentByDate(appointmentTime, doctorId);
    if (appointment.length !== 0) return res.status(400).json({ message: "Wybrany termin jest juz zajety" });
    const appointmentId = await createAppointmentTransaction(doctorId, userId, appointmentTime);
    // console.log(response); //appointment id
    return res.status(200).json({ message: "Wizyta została pomyslnie umowiona", appointmentId });
  } catch (error) {
    console.log("Error creating new appointment");
    return res.status(500).json({ message: "Blad podczas tworzenia wizyty" });
  }
};

export const deleteAppointment = async (req, res) => {
  const { id: appointmentId } = req.params;
  try {
    const response = await deleteAppointmentById(appointmentId);
    if (response !== 1) return res.status(404).json({ message: "Wizyta z podanym id nie istnieje" });
    return res.status(200).json({ message: "Wizyta została pomyślnie usunięta" });
  } catch (error) {
    console.log("Error deleting appointment");
    return res.status(500).json({ message: "Blad podczas usuwania wizyty" });
  }
};

const generateWorkSchedule = async (id, searchMinutes, searchHour, day, month, year, startWorkTime, endWorkTime, appointmentInterval) => {
  const [startWorkHour, startWorkMinute] = startWorkTime.split(":").map(Number);
  const [endWorkHour, endWorkMinute] = endWorkTime.split(":").map(Number);

  //================
  // let date1 = "2024-10-09 08:29:53";
  // let date2 = "2024-10-09 15:29:53";
  // let date3 = "2024-12-09 14:30:00";
  const startReservedAppointmentsDate = `${year}-${month + 1}-${day.toString().padStart(2, "0")} 
  ${searchHour.toString().padStart(2, "0")}:${searchMinutes.toString().padStart(2, "0")}`;

  const endReservedAppointmentsDate = `${year}-${month + 1}-${day.toString().padStart(2, "0")} 
  ${endWorkHour.toString().padStart(2, "0")}:${endWorkMinute.toString().padStart(2, "0")}`;
  // console.log("DATA: ", date);
  const reservedAppointments = reservedAppointmentsSchedule(
    await fetchAppointment(id, startReservedAppointmentsDate, endReservedAppointmentsDate)
  ).map((date) => date.getTime());
  // console.log(reservedAppointments);
  // console.log("glowna funkcja", reservedAppointments);
  // const testWybranychWIzyt = reservedAppointmentsSchedule(await fetchAppointment(date1, date3));
  // console.log("wybrane wizyty ", testWybranychWIzyt);

  //===========
  let startDate;
  const endDate = new Date(year, month, day, endWorkHour, Number(endWorkMinute) - appointmentInterval);

  if (searchHour > endWorkHour || (searchHour === endWorkHour && searchMinutes > endWorkMinute)) {
    return [];
  }

  if (searchHour === startWorkHour && searchMinutes >= startWorkMinute) {
    startDate = new Date(year, month, day, searchHour, getMinutes(searchMinutes));
  } else if (searchHour === startWorkHour && searchMinutes < startWorkMinute) {
    startDate = new Date(year, month, day, startWorkHour, startWorkMinute);
  } else if (searchHour < startWorkHour) {
    startDate = new Date(year, month, day, startWorkHour, startWorkMinute);
  } else if (searchHour > startWorkHour && searchHour < endWorkHour) {
    startDate = new Date(year, month, day, searchHour, getMinutes(searchMinutes));
  }

  // console.log("Data startowa: ", startDate);
  // const zonedStartDate = convertUTCDateToLocalDate(startDate);
  // const zonedEndDate = convertUTCDateToLocalDate(endDate);
  const workSchedule = [];

  let currentTime = new Date(startDate);
  // let currentTime = new Date(zonedStartDate);
  while (currentTime <= endDate) {
    // while (currentTime <= zonedEndDate) {
    const currentZonedTimeInMs = convertUTCDateToLocalDate(currentTime).getTime();
    if (!reservedAppointments.includes(currentZonedTimeInMs)) {
      const { day, month, year, hour, minutes } = getFormattedDate(currentTime);
      workSchedule.push(`${year}-${month}-${day} ${hour}:${minutes}`);
    }
    currentTime = addAppointmentTime(currentTime, appointmentInterval);
  }
  return workSchedule;
};

export const reservedAppointmentsSchedule = (appointments) => {
  if (appointments.length === 0) return [];
  const schedule = appointments.map((appointment) => convertUTCDateToLocalDate(appointment.appointment_time));
  return schedule;
};

export const convertUTCDateToLocalDate = (date) => {
  const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  const offset = date.getTimezoneOffset() / 60;
  const hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
};

export const getFormattedDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return { day, month, year, hour, minutes };
};

export const addAppointmentTime = (date, minutes) => {
  const minutesToAdd = minutes * 60 * 1000;
  return new Date(date.getTime() + minutesToAdd);
};

export const getMinutes = (minutes) => {
  const adjustMinutes = Math.ceil(minutes / 15) * 15;
  return adjustMinutes;
};
