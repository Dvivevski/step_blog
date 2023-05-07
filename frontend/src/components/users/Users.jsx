import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { request } from "../../api/request";

const Users = (props) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const resp = await request.get("/users");
      setUsers(resp?.data?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderLoader = useMemo(
    () => (
      <div>
        <span>loader...</span>
      </div>
    ),
    []
  );

  useEffect(() => {
    fetchInitialData();
  }, []);

  return loading ? (
    renderLoader
  ) : (
    <div>
      <h1>All users</h1>

      {users.map((e) => (
        <ul key={e?._id} >
          <li>{e.userName}</li>
          <li>{e.email}</li>
          <li>{e.createdAt}</li>
        </ul>
      ))}
    </div>
  );
};

Users.propTypes = {};

export default Users;
