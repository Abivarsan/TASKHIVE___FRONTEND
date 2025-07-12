import axios from "axios";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function PMprojectListCom() {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  const ProjectManagerId = 10;

  const navigate = useNavigate();

  const url = `https://localhost:44339/api/PmProjectList?id=${ProjectManagerId}`; //new

  useEffect(() => {
    axios
      .get(url)
      .then((result) => setData(result.data))
      .catch((e) => console.log(e));
    console.log(data);
    setLoad(false);
  }, []);

  var selectedId;

  const HandleProjectSelection = (id) => {
    selectedId = id;
    //  alert(selectedId);
    navigate("/PMprojectDetailsPage", { state: { selectedId: selectedId } });
  };

  if (load) {
    return (
      <>
        <Spinner
          size="lg"
          animation="border"
          style={{
            marginLeft: "75px",
            marginTop: "35px",
            marginBottom: "35px",
          }}
        />
      </>
    );
  }

  return (
    <div>
      <table className="ProjectList">
        <thead>
          <th>Project Id</th>
          <th>Project Name</th>
          <th>Project Status</th>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <Spinner
              size="lg"
              animation="border"
              style={{
                marginLeft: "75px",
                marginTop: "35px",
                marginBottom: "35px",
              }}
            />
          ) : (
            <></>
          )}

          {data.map((project, index) => (
            <tr
              key={project.proId}
              onClick={() => HandleProjectSelection(project.proId)}
            >
              <td>{project.proId}</td>
              <td>{project.projectName}</td>
              <td>{project.projectStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
