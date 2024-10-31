const dayLabels = {
  monday: "Poniedziałek",
  tuesday: "Wtorek",
  wednesday: "Środa",
  thursday: "Czwartek",
  friday: "Piątek",
  saturday: "Sobota",
  sunday: "Niedziela",
};

export const transformWorkHours = (workDaysHours) => {
  const response = {
    monday: { start: "", end: "" },
    tuesday: { start: "", end: "" },
    wednesday: { start: "", end: "" },
    thursday: { start: "", end: "" },
    friday: { start: "", end: "" },
    saturday: { start: "", end: "" },
    sunday: { start: "", end: "" },
  };
  for (const key of workDaysHours) {
    response[key.work_day] = { start: key.start_time, end: key.end_time };
  }
  return response;
};

export const transformWorkDays = (days) => {
  return days.map((day) => ({
    value: day.work_day,
    label: dayLabels[day.work_day],
  }));
};
