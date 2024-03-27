import Header from "../common/Header";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Loading } from "@/components/Loading";

export const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const fetchData = async () => {
        const {data, error} = await supabase.from("seasons").select();
        if (error) {
          console.error("Error fetching data:", error.message);
        } else {
          setData(data);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <>
      <Header />
      <h3 className="px-3 py-2 text-lg font-medium">
        Dashboard
      </h3>
      <div>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}