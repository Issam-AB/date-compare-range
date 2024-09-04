import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  return (
    <DayPicker
      fromDate={new Date(currentYear - 10, currentMonth)}
      toDate={new Date(currentYear, currentMonth)}
      captionLayout="dropdown-buttons"
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-3",
        vhidden: "vhidden hidden",
        caption_start: "is-start",
        caption_between: "is-between",
        caption_end: "is-end",
        caption: "flex justify-center pt-1 relative items-center gap-2",
        caption_label:
          "flex h-7 text-sm font-medium justify-center items-center grow [.is-multiple_&]:flex",
        caption_dropdowns: "flex justify-between gap-2 grow dropdowns",
        multiple_months: "is-multiple",
        hidden:
          "hidden [.is-between_&]:flex [.is-end_&]:flex [.is-start.is-end_&]:hidden",
        nav: "relative flex items-center [&:has([name='previous-month'])]:order-first [&:has([name='next-month'])]:order-last",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "relativee h-6 w-6 bg-transparent p-0 text-muted-foreground"
        ),
        nav_button_previous: "rounded-md",
        nav_button_next: "rounded-md",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-md"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground rounded-md",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,

        Dropdown: ({ value, onChange, children, ...props }) => {
          const options = React.Children.toArray(children);
          const selected = options.find((child) => child.props.value === value);

          const handleChange = (value) => {
            const changeEvent = {
              target: { value },
            };
            onChange?.(changeEvent);
          };

          return (
            <Select
              value={value?.toString()}
              onValueChange={(value) => {
                handleChange(value);
              }}
            >
              <SelectTrigger className="focus:ring-0 p-2 h-8 text-sm justify-around border-0 font-semibold ring-0">
                <SelectValue>{selected?.props?.children}</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper">
                {options.map((option, id) => (
                  <SelectItem
                    key={`${option.props.value}-${id}`}
                    value={option.props.value?.toString() ?? ""}
                  >
                    {option.props.children}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        },
      }}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
