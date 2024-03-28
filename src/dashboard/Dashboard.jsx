import Header from "../common/Header";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
// import { Loading } from "@/components/Loading";
import { DashboardSections } from "@/components/DashboardSections";

export const Dashboard = () => {
  const [data, setData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2023);

  useEffect(() => {
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const fetchData = async () => {
        const {data, error} = await supabase
          .from("races")
          .select()
          .eq("year", selectedYear)
          .order("date", { ascending: true });

        if (error) {
          console.error("Error fetching data:", error.message);
        } else {
          setData(data);
          console.log("Data fetched:", data);
          console.log(data[0].date);
        }
      };

      fetchData();
    }
  }, [selectedYear]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <>
      <Header onYearChange={handleYearChange} />

      <DashboardSections data={data} />
    </>
  );
}