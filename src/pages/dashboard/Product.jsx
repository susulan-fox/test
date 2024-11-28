import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import { axiosInstance } from "../../lib/axios";
import { Table, Button, Modal } from "react-bootstrap";
import { toast } from "sonner";
import { confirmAlert } from "react-confirm-alert";
import { useSelector, useDispatch } from "react-redux";
// import { IsAuth } from "../../hoc/checkAuth";
import { destroyProduct, setProducts } from "../../store/actions/productActions";
import CreateProductModal from "../../components/modals/CreateProductModal";
import EditProductModal from "../../components/modals/EditProductModal";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const token = useSelector((state) => state.auth.authData.token);
  const role = useSelector((state) => state.auth.authData.role);

  const getProducts = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axiosInstance.get("/products", { headers });
      dispatch(setProducts(response.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const result = await axiosInstance.delete(`/products/${id}`, { headers });
      dispatch(destroyProduct(id));
      if (result.status === 204) {
        toast.success("Delete Success");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Delete Failed");
    }
  };

  const handleDeleteClick = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Apakah kamu yakin untuk menghapus?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteProduct(id),
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    });
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-auto">
          <Sidebar />
        </div>
        <div className="col mx-5 px-5 mx-md-0 px-md-0">
          <h1 className="text-center">Product List</h1>
          <Button onClick={handleCreateClick} variant="primary" className={role === "admin" ? "" : "d-none"}>
            Add Product
          </Button>
          <Table striped bordered hover responsive>
            <thead className="text-center">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{formatRupiah(product.price)}</td>
                  <td>{product.type}</td>
                  <td>
                    <Button
                      onClick={() => handleEditClick(product)}
                      variant="success" className="mx-2">
                      Edit
                    </Button>
                    <span className="disabled-cursor">
                      <Button
                        onClick={() => handleDeleteClick(product.id)}
                        variant="danger"
                        className="mx-2"
                        disabled={index === 0 || index === 1}
                      >
                        Delete
                      </Button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Create Product Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <CreateProductModal handleClose={() => setShowCreateModal(false)} />
      </Modal>

      {/* Edit Product Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <EditProductModal
          handleClose={() => setShowEditModal(false)}
          product={selectedProduct}
        />
      </Modal>
    </div>
  );
};

// export default IsAuth (Product);
export default Product
