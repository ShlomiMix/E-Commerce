import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  Controller,
  Path,
  PathValue,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
export interface DatePickerProps<T> {
  name: Path<T>;
  registerOptions: RegisterOptions;
}

export function DatePickerSelect<T>({
  name,
  registerOptions,
}: DatePickerProps<T>): JSX.Element {
  const { control, setValue } = useFormContext<T>();

  const handleExpirationDateChange = (date: Date | null) => {
    if (date) {
      const formattedDate = `${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
      setValue(name as Path<T>, formattedDate as PathValue<T, Path<T>>);
    } else {
      setValue(name as Path<T>, null);
    }
  };

  return (
    <div className="DatePickerSelect mt-2 flex justify-center">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Controller
          name={name}
          control={control}
          rules={registerOptions}
          render={({ field }) => (
            <DatePicker
              value={field.value || null}
              label="Expiration date"
              onChange={(date: Date | null) => {
                handleExpirationDateChange(date);
                field.onChange(date);
              }}
              className="w-74"
              inputFormat="MM/yyyy"
              views={["month", "year"]}
              minDate={new Date()}
              renderInput={(params) => <TextField {...params} />}
              disablePast
            />
          )}
        />
      </LocalizationProvider>
    </div>
  );
}
