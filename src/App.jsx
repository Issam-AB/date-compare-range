import DateRangePicker from "./components/date-range-picker";
import "./index.css";

function App() {
  return (
    <div className="flex flex-col justify-center items-center">
      <DateRangePicker
        onUpdate={(values) => console.log(values)}
        //$$ initialDateFrom="2023-01-01"
        // initialDateTo="2023-12-31"

        align="start"
        locale="en-GB"
        showCompare={true}
      />
    </div>
  );
}

export default App;
