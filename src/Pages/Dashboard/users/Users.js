import { useEffect, useState } from "react";
import { USER, USERS } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import TableShow from "../../../Components/Dashboard/TableShow";
export default function Users() {
    const [query, setQuery] = useState('');

  // useState for set data of users in it
  const [users, setUsers] = useState([]);
  // get user auth
  const [CurrentUser, setCurrentUser] = useState(0);
  // no user exist
  const [noUser, setNoUser] = useState(false);
  //   var of delete
  const [isDelete, setIsDelete] = useState(0);
  //function  handle of delete
  async function HandleDelete(id) {
    try {
      await Axios.delete("/dashboard"+USER + "/" + id).then(() => {
        setIsDelete((prev) => prev + 1);
      });
    } catch (err) {
      console.log(err);
    }
  }
  // get current user  with data of users
  useEffect(() => {
    const fetchData = async () => {
      try {
        // current user
        const userData = await Axios.get(`/dashboard${USER}`);
        setCurrentUser(userData.data);
        // get  data of users
        const usersData = await Axios.get('/dashboard'+USERS+`?filter[item]=${query}`);
        setUsers(usersData.data);
        setNoUser(true);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [isDelete,query]);

  // headers of table
  const Header = [
    {
      key: "name",
      name: "name",
    },
    {
      key: "email",
      name: "email",
    },
    {
      key: "role",
      name: "role",
    },
  ];
  return (
    <div className="w-100 mt-5 container">
    {/* Add an input search for filtering categories */}
    <input
          type="text"
          className="form-control w-50"
          placeholder="Search orders..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
    <TableShow
      title="users"
      header={Header}
      CurrentUser={CurrentUser}
      isGet={noUser}
      HandleDelete={HandleDelete}
      data={users}
      addNew='/dashboard/user/add'

    />
    </div>
  );
}
