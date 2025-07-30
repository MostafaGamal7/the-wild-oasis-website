"use client";

import {
  differenceInDays,
  isDate,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, bookedDates, cabin }) {
  const defaultClassNames = getDefaultClassNames();
  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * (regularPrice - discount);
  // SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        min={minBookingLength + 1}
        max={maxBookingLength}
        startMonth={new Date(currentYear, currentMonth)}
        endMonth={new Date(currentYear + 5, 11)}
        onSelect={setRange}
        selected={displayRange}
        captionLayout="dropdown"
        numberOfMonths={2}
        classNames={{
          day: "w-[30px] h-[30px]",
          day_button: "w-[30px] h-[30px]",
          today: "text-accent-500",
          selected: `bg-accent-600 border-amber-500 text-white`, // Highlight the selected day
          range_start: "bg-accent-500",
          range_middle: "bg-accent-500",
          range_end: "bg-accent-500",
          root: `${defaultClassNames.root} shadow-lg`, // Add a shadow to the root element
          chevron: `cursor-pointer fill-accent-600`, // Change the color of the chevron
          button_next: "fill-red-200",
          dropdowns: "flex gap-3 text-sm",
          months_dropdown: "bg-primary-200 text-primary-800",
          years_dropdown: "bg-primary-200 text-primary-800",
        }}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={() => resetRange()}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
