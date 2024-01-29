import { useEffect, useState } from "react";
import { CATEGORIES, CATEGORY } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import TableShow from "../../../Components/Dashboard/TableShow";

export default function Categories() {
  const [data, setData] = useState([]);
  const [isGet, setIsGet] = useState(false);
  const [isDelete, setIsDelete] = useState(0);
  const [query, setQuery] = useState(''); 
  const Header = [
    {
      key: "title",
      name: "title",
    },
    {
      key: "image",
      name: "image",
    },
  ];
  // get categories using filter 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use the current value of the query state in the API request
        const mainData = await Axios.get(`/dashboard${CATEGORIES}?filter[item]=${query}`);
        setData(mainData.data);
        setIsGet(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [isDelete, query]); // Include query in the dependencies array

  // handle delete categories
  async function HandleDelete(id) {
    try {
      await Axios.delete('/dashboard'+CATEGORY + "/" + id).then(() => {
        setIsDelete((prev) => prev + 1);
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-100 mt-5 container">
      {/* Add an input search for filtering categories */}
      <input
            type="text"
            className="form-control w-50"
            placeholder="Search categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
      <TableShow
        title="Categories"
        header={Header}
        CurrentUser=""
        isGet={isGet}
        HandleDelete={HandleDelete}
        data={data}
        addNew="/dashboard/category/add"
        query={query}
      />
    </div>
  );
}
