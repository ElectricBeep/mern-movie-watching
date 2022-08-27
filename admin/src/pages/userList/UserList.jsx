import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext/UserContext";
import { deleteUser, getUsers } from "../../context/userContext/apiCalls";
import moment from "moment";

export default function UserList() {
    const { users, dispatch } = useContext(UserContext);

    const handleDelete = (id) => {
        deleteUser(id, dispatch);
    };

    //Fetch users
    useEffect(() => {
        getUsers(dispatch);
    }, [dispatch]);

    const columns = [
        { field: "_id", headerName: "ID", width: 230 },
        {
            field: "user",
            headerName: "User",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="userListUser">
                        <img className="userListImg" src={params.row.profilePic || "https://www.kindpng.com/picc/m/22-223863_no-avatar-png-circle-transparent-png.png"} alt="" />
                        {params.row.username}
                    </div>
                );
            },
        },
        { field: "email", headerName: "Email", width: 200 },
        {
            field: "createdAt",
            headerName: "Created",
            width: 160,
            renderCell: (params) => {
                return (
                    <div className="userListItem">
                        {moment(params.row.createdAt).fromNow()}
                    </div>
                );
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row._id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="userList">
            <DataGrid
                rows={users}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
                getRowId={r => r._id}
                rowsPerPageOptions={[8]}
            />
        </div>
    );
}
