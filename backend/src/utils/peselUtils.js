export const getBirthDateFromPESEL = (pesel) =>{
    if (typeof pesel !== "string" || pesel.length !== 11) {
        throw new Error("PESEL musi miec dlugosc 11 znakow!");
    }

    const yearPart = parseInt(pesel.slice(0, 2), 10);
    const monthPart = parseInt(pesel.slice(2, 4), 10);
    const dayPart = parseInt(pesel.slice(4, 6), 10);

    let year, month;

    if (monthPart >= 1 && monthPart <= 12) {
        year = 1900 + yearPart;
        month = monthPart;
    } else if (monthPart >= 21 && monthPart <= 32) {
        year = 2000 + yearPart;
        month = monthPart - 20;
    } else if (monthPart >= 41 && monthPart <= 52) {
        year = 2100 + yearPart;
        month = monthPart - 40;
    } else if (monthPart >= 61 && monthPart <= 72) {
        year = 2200 + yearPart;
        month = monthPart - 60;
    } else if (monthPart >= 81 && monthPart <= 92) {
        year = 1800 + yearPart;
        month = monthPart - 80;
    } else {
        throw new Error("Nieprawidlowy numer PESEL");
    }

    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(dayPart).padStart(2, '0');

    return `${year}-${formattedMonth}-${formattedDay}`;
}

export const getGenderFromPESEL = (pesel) => {
    if (typeof pesel !== "string" || pesel.length !== 11) {
        throw new Error("PESEL musi miec dlugosc 11 znakow!");
    }

    const genderDigit = parseInt(pesel[9], 10);

    return genderDigit % 2 === 0 ? "woman" : "man";
}
