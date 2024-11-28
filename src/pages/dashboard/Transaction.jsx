import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import { Button, Table, Modal, Badge} from "react-bootstrap";
import { axiosInstance } from "../../lib/axios";
// import { IsAuth } from "../../hoc/checkAuth";
import { useDispatch, useSelector } from "react-redux";
import { setTransactions } from "../../store/actions/transactionActions.js";
import CreateTransactionModal from "../../components/modals/CreateTransactionModal";
import DetailTransactionModal from "../../components/modals/DetailTransactionModal";

const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transaction.transactions);
  const role = useSelector((state) => state.auth.authData.role);

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);

  const token = useSelector((state) => state.auth.authData.token);

  const getTransactions = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.get("/bills", { headers });
      const transactions = response.data.data;

      const newCustomerDataTransaction = {};

      transactions.forEach((transaction) => {
        const customerId = transaction.customer.id;

        // jika customerId belum ada di objek newCustomerDataTransaction, tambahkan property baru
        if (!newCustomerDataTransaction[customerId]) {
          newCustomerDataTransaction[customerId] = {
            ...transaction.customer, // copy semua properti customer
            transactions: [], // tambahkan properti transactions yang menampung daftar transaksi dari response.data.data
            transactionCount: 0, // tambahkan properti transactionCount untuk menghitung jumlah transaksi
          };
        }
        // Tambahkan transaksi ke daftar transaksi pelanggan
        newCustomerDataTransaction[customerId].transactions.push(transaction);
        // Tingkatkan jumlah transaksi pelanggan
        newCustomerDataTransaction[customerId].transactionCount += 1;
      });

      dispatch(setTransactions(newCustomerDataTransaction));
    } catch (error) {
      console.log(error.message);
    }
  };

  const check = () => {
    console.log(transactions);
  };

  // ambil detail by customer id
  const handleClick = (customerDataTransaction) => {
    setShowModalDetail(true);
    setSelectedCustomer(customerDataTransaction);
    console.log(customerDataTransaction);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-auto ">
          <Sidebar />
        </div>
        <div className="col mx-5 px-5 mx-md-0 px-md-0">
          <h1 className="text-center">Customer Transactions List</h1>
          {/* <Button onClick={check} variant="primary">
            Cek Transaksi
          </Button> */}
          <Button onClick={() => setShowModalCreate(true)} className={role === "admin" ? "" : "d-none"} variant="primary">
            Tambah Transaksi
          </Button>
          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>#</th>
                <th>Kode Pelanggan</th>
                <th>Nama Pelanggan</th>
                <th>Label Transaksi</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(transactions).map((customer, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td><Badge bg="secondary">{customer.id.slice(0, 8)}</Badge></td>
                  <td>
                    <span className="fw-bold">{customer.name}</span>
                    <br />
                    {customer.transactionCount} Transaksi
                  </td>
                  <td>
                    <Button
                      onClick={() => handleClick(customer)}
                      variant="primary"
                    >
                      Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Modal Detail Transaksi */}
      <Modal
        show={showModalDetail}
        onHide={() => setShowModalDetail(false)}
        size="lg"
      >
        <DetailTransactionModal
          selectedCustomer={selectedCustomer}
          handleClose={() => setShowModalDetail(false)}
        />
      </Modal>

      {/* Modal Create Transaction */}
      <Modal show={showModalCreate} onHide={() => setShowModalCreate(false)}>
        <CreateTransactionModal
          handleClose={() => setShowModalCreate(false)}
        />
      </Modal>
    </div>
  );
};

// export default isAuth (Transactions);
export default Transactions
