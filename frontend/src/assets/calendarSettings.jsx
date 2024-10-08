export const calendarViews={

    timeGridSevenDay: {
      type: "timeGrid",
      duration: { days: 7 }, // Ustawia widok na 7 dni
      slotMinTime: "08:00:00", // Minimalny czas widoczny w siatce godzin
      slotMaxTime: "20:00:00", // Ostatnia godzina widoczna w siatce
      aspectRatio: "1.2",
      slotLabelFormat:{
        hour: "2-digit",
        minute: "2-digit",
        omitZeroMinute: false,
        hour12: false, // To kluczowe ustawienie, które przełącza na format 24-godzinny
      },
      slotDuration: "00:15:00",
      slotLabelInterval:"01:00:00"
    },
    timeGridDay:{
      type: "timeGrid",
      duration: { days: 1 }, // Ustawia widok na 7 dni
      slotMinTime: "08:00:00", // Minimalny czas widoczny w siatce godzin
      slotMaxTime: "20:00:00", // Ostatnia godzina widoczna w siatce
      aspectRatio: "1.2",
      slotLabelFormat:{
        hour: "2-digit",
        minute: "2-digit",
        omitZeroMinute: false,
        hour12: false, // To kluczowe ustawienie, które przełącza na format 24-godzinny
      },
      slotDuration: "00:15:00"
    }
}