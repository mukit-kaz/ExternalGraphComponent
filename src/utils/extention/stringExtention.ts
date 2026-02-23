export function ResizeString(text: string, max_length: number = 20) {
  if (text.length > max_length) {
    return text.slice(0, max_length - 3) + "...";
  } else {
    return text;
  }
}

// Define an array of month names
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function FormattedDate(date?: string) {
  // Create a Date object from the input date string
  const inputDate = new Date(date);

  // Extract components of the date
  const day = inputDate.getDate();
  const month = monthNames[inputDate.getMonth()];
  const year = inputDate.getFullYear();

  // Format the date as "saved on Month Day, Year"
  return `${month} ${day}, ${year}`;
}

export function IsSameDate(date1: Date, date2: Date) {
  date1 = new Date(date1);
  date2 = new Date(date2);

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function ValidPercentage(number: string) {
  const regex = /^(?:\d{1,2}(?:\.\d{1,2})?|100(?:\.00?)?)$/;
  return regex.test(number);
}

export function GetContrastColor(hexColor) {
  if (!hexColor) return;

  const threshold = 130; // Adjust this threshold based on your preference

  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return contrasting color based on brightness
  return brightness > threshold ? "black" : "white";
}

export const getYearlist = (
  startYear: number,
  endYear: number = new Date().getFullYear()
): { label: string; value: number }[] => {
  const years: { label: string; value: number }[] = [];

  for (let year = endYear; year >= startYear; year--) {
    years.push({ label: year.toString(), value: year });
  }

  return years;
};

export const generateUniqueString = () => {
  const timestamp = Date.now().toString(36);
  const randomNum = Math.random().toString(36).substr(2, 5);
  return timestamp + randomNum;
};

export function stringToBool(str) {
  return str?.toLowerCase() === "true";
}

export function GetFormatedDateTime(date: string) {
  if (date.length <= 0) return ["", ""];

  const new_date = new Date(date);

  const day = new Date(new_date).getDate();
  const month = monthNames[new_date.getMonth()];
  const year = new_date.getFullYear();

  // Formatting time components
  let hours = new_date.getHours();
  const minutes = new_date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Convert minutes to string and pad with leading zero if needed
  const minutesStr = minutes < 10 ? "0" + minutes : minutes.toString();

  // Constructing the final formatted date and time string
  // const formattedDate = `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
  const formattedDate = `${day} ${month} ${year}`;
  const formattedTime = `${hours}:${minutesStr} ${ampm}`;

  return [formattedDate, formattedTime];
}


export const RandomText = () => {
  return Math.random().toString(36).substring(7);
};

export const ReplaceSpaceWith = (text: string) => {
  return text?.replace(/\s/g, "_");
};


// export const GetCustomeSectionKey = (text: string) => {
//   const section = ReplaceSpaceWith(text);
//   return `custom_section_${section}`
// };

export const GenerateYearDropdownList = (
  startYear: number,
  endYear: number
): { label: string; value: number }[] => {
  const dropdownList = [];
  for (let year = startYear; year <= endYear; year++) {
    dropdownList.push({
      label: year.toString(),
      value: year,
    });
  }
  return dropdownList.sort((a, b) => a.value - b.value);
};

export const formatDateToISO = (date: Date | null, iso?: boolean) => {
  if (!date) return null;

  // Create a new Date object set to midnight in the local timezone
  const localDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  // Convert the local date to ISO string
  if (iso) return localDate.toISOString();
  else return localDate.toDateString();
};

export const sanitizeInput = (value: string): string => {
  return value.replace(/'/g, '');
};

export const formatNumbersWithCommas = (value) => {
    if (!value) return '';
    const parts = String(value).split('.');
    parts[0] = Number(parts[0]).toLocaleString('en-US');
    return parts.join('.');
};

export const replaceHtmlFirstTable = (html: string, newTableHtml: string): string => {
    if (!html || html.trim() === '') return html;

    // Regex without 's' flag
    const pattern = /<table[\s\S]*?>[\s\S]*?<\/table>/i;

    return html.replace(pattern, newTableHtml);
}

export const GetMoney = (value: any): number => {
  const n = Number(value);
  return Number.isFinite(n) ? Number(n) : 0;
}
