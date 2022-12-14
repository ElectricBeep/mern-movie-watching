import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";

export default function ProductList() {
    const { movies, dispatch } = useContext(MovieContext);

    const handleDelete = (id) => {
        deleteMovie(id, dispatch);
    };

    //Fetch movies from mongo
    useEffect(() => {
        getMovies(dispatch);
    }, [dispatch]);

    const columns = [
        { field: "_id", headerName: "ID", width: 90 },
        {
            field: "movie",
            headerName: "Movie",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.img} alt="" />
                        {params.row.title}
                    </div>
                );
            },
        },
        { field: "genre", headerName: "Genre", width: 123 },
        { field: "year", headerName: "Year", width: 123 },
        { field: "limit", headerName: "Age Limit", width: 133 },
        { field: "isSeries", headerName: "Series", width: 123 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={{ pathname: "/movie/" + params.row._id, movie: params.row }}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="productList">
            <DataGrid
                rows={movies}
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
